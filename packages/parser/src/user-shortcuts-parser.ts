import { distractDisplayNameBySplitters, extractUniqueFlowsNamesFromGraph } from 'utils'
import { ParsedFlow, ParsedUserFlow, Splitters, UserFlow, UserFlowObject } from 'types'

function getGraph(flow: UserFlowObject) {
  return Array.isArray(flow.graph) ? flow.graph : [flow.graph]
}

function getFlowNameObject(splitters: Splitters, parsedFlowsUntilNow: ParsedFlow[], flow: UserFlowObject) {
  if (flow.hasOwnProperty('name')) {
    return { name: flow.name }
  }
  const graph = getGraph(flow)
  const flowsInGraph = extractUniqueFlowsNamesFromGraph(splitters)(graph)
  if (flowsInGraph.length === 1) {
    // I need to be sure that the same flow does not appear multiple times in the graph with multiple identifiers.
    // 2 cases: 1. "...flow0...flow0/identifier1..." 2. "...flow0/identifier1...flow0/identifier2...".
    if (splitters.identifier && graph.some(subGraph => subGraph.indexOf(splitters.identifier as string) > -1)) {
      return {}
    } else {
      const possibleName = distractDisplayNameBySplitters(splitters, flowsInGraph[0]).partialPath[0]
      if (parsedFlowsUntilNow.some(flow => flow.name === possibleName)) {
        return {}
      } else {
        return { name: possibleName }
      }
    }
  } else {
    return {}
  }
}

export const flattenUserFlowShortcuts = (splitters: Splitters) => (parsedFlowsUntilNow: ParsedFlow[]) =>
  function flatten(flow: UserFlow): ParsedUserFlow[] {
    if (typeof flow === 'string') {
      return flatten({
        graph: [flow],
      })
    }
    if (Array.isArray(flow)) {
      return flatten({
        graph: flow as string[],
      })
    }

    const flowObject = flow as UserFlowObject
    const graph = getGraph(flowObject)
    const nameObject = getFlowNameObject(splitters, parsedFlowsUntilNow, flowObject)
    const defaultFlowNameObject = flowObject.default_flow_name && {
      defaultFlowName: flowObject.default_flow_name,
    }
    const flowToParse = {
      graph,
      ...nameObject,
      extendsFlows: flowObject.extends_flows || [],
      ...defaultFlowNameObject,
      ...(flowObject.hasOwnProperty('side_effects') && { side_effects: flowObject.side_effects }),
    }
    return [flowToParse]
  }
