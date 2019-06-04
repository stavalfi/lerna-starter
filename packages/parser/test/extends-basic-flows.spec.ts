import { assertEqualFlows, createFlows, createExpected, ExpectedFlow, declareFlows } from 'utils/utils'
import { UserFlow } from 'types'

describe('extends-basic-flows', () => {
  const flowsConfig = (graph: UserFlow) => ({
    splitters: {
      extends: '_',
    },
    flows: [
      {
        graph: ['a'],
        extends_flows: [graph],
      },
    ],
  })

  it('0', () => {
    const flowsConfig = (graph: UserFlow) => ({
      splitters: {
        extends: '_',
      },
      flows: [graph],
    })
    const actual: UserFlow = 'a'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('1', () => {
    const actual = 'flow0'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('2', () => {
    const actual = 'flow0_a'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('3', () => {
    const actual = '[flow0_a]'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('4', () => {
    const actual = '[[[flow0_a]]]'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('5', () => {
    const actual = '[flow0]'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('6', () => {
    const actual = '[[flow0]]'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('7', () => {
    const actual = '[[[flow0]]]'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('8', () => {
    const actual = {
      name: 'composed-flow',
      graph: 'flow0',
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'composed-flow',
        graph: [{ 'composed-flow_flow0_a': [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('9', () => {
    const actual = {
      name: 'composed-flow',
      graph: '[flow0_a]',
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'composed-flow',
        graph: [{ 'composed-flow_flow0_a': [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('10', () => {
    const actual = 'flow0:flow1'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(2, ['flow', 'a'], '_'),
      {
        graph: [{ flow0_a: [[], [1]] }, { flow1_a: [[0], []] }],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('11', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['flow0:flow1'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(2, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [{ 'composed-flow_flow0_a': [[], [1]] }, { 'composed-flow_flow1_a': [[0], []] }],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('12', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['[flow0]:flow1'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(2, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [{ 'composed-flow_flow0_a': [[], [1]] }, { 'composed-flow_flow1_a': [[0], []] }],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('13', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['[[[flow0]]:[[[flow1]]]]'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(2, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [{ 'composed-flow_flow0_a': [[], [1]] }, { 'composed-flow_flow1_a': [[0], []] }],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('14', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['flow0:flow1,flow2:flow3'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(4, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [
          { 'composed-flow_flow0_a': [[], [1, 2]] }, // 0
          { 'composed-flow_flow1_a': [[0], [3]] }, // 1
          { 'composed-flow_flow2_a': [[0], [3]] }, // 2
          { 'composed-flow_flow3_a': [[1, 2], []] }, // 3
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('15', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['flow0:flow1:flow2:flow3:flow4'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(5, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [
          { 'composed-flow_flow0_a': [[], [1]] }, // 0
          { 'composed-flow_flow1_a': [[0], [2]] }, // 1
          { 'composed-flow_flow2_a': [[1], [3]] }, // 2
          { 'composed-flow_flow3_a': [[2], [4]] }, // 3
          { 'composed-flow_flow4_a': [[3], []] }, // 4
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('16', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['[[[[[[flow0]]]:[[[flow1]]]:[[[flow2]]]]]]'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(3, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [
          { 'composed-flow_flow0_a': [[], [1]] }, // 0
          { 'composed-flow_flow1_a': [[0], [2]] }, // 1
          { 'composed-flow_flow2_a': [[1], []] }, // 2
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('17', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['[[flow0]:[flow1],[flow2]:[flow3]]'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(4, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [
          { 'composed-flow_flow0_a': [[], [1, 2]] }, // 0
          { 'composed-flow_flow1_a': [[0], [3]] }, // 1
          { 'composed-flow_flow2_a': [[0], [3]] }, // 2
          { 'composed-flow_flow3_a': [[1, 2], []] }, // 3
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('18', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['[[flow0_a]:[flow1_a],[flow2]:[flow3_a]]'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(4, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [
          { 'composed-flow_flow0_a': [[], [1, 2]] }, // 0
          { 'composed-flow_flow1_a': [[0], [3]] }, // 1
          { 'composed-flow_flow2_a': [[0], [3]] }, // 2
          { 'composed-flow_flow3_a': [[1, 2], []] }, // 3
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('19', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['flow0_a:flow1'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(2, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [
          { 'composed-flow_flow0_a': [[], [1]] }, // 0
          { 'composed-flow_flow1_a': [[0], []] }, // 1
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('20', () => {
    const actual = {
      name: 'composed-flow',
      graph: ['flow0:flow1_a'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(2, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [
          { 'composed-flow_flow0_a': [[], [1]] }, // 0
          { 'composed-flow_flow1_a': [[0], []] }, // 1
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('21', () => {
    const actual = {
      graph: ['flow0_a:flow1_a:[flow2_a:flow3_a],[flow4_a:flow5_a]', 'flow3_a,flow5_a:flow6_a,flow7_a'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(8, ['flow', 'a'], '_'),
      {
        graph: [
          { flow0_a: [[], [1]] }, // 0
          { flow1_a: [[0], [2, 4]] }, // 1
          { flow2_a: [[1], [3]] }, // 2
          { flow3_a: [[2], [6, 7]] }, // 3
          { flow4_a: [[1], [5]] }, // 4
          { flow5_a: [[4], [6, 7]] }, // 5
          { flow6_a: [[3, 5], []] }, // 6
          { flow7_a: [[3, 5], []] }, // 7
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('22', () => {
    const actual = {
      name: 'flow0',
      graph: 'flow0',
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]
    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('23', () => {
    const actual = {
      graph: ['flow0:flow1', 'flow0:flow2'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(3, ['flow', 'a'], '_'),
      {
        graph: [
          { flow0_a: [[], [1, 2]] }, // 0
          { flow1_a: [[0], []] }, // 1
          { flow2_a: [[0], []] }, // 2
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('24', () => {
    const actual = {
      graph: ['[[flow0:flow1]]', '[[flow0]]:[[flow2]]', 'flow0:[[flow3]]'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(4, ['flow', 'a'], '_'),
      {
        graph: [
          { flow0_a: [[], [1, 2, 3]] }, // 0
          { flow1_a: [[0], []] }, // 1
          { flow2_a: [[0], []] }, // 2
          { flow3_a: [[0], []] }, // 3
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('25', () => {
    const actual = {
      graph: ['flow0:flow1_a:[flow2_a:flow3_a],[flow4_a:flow5_a]'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(6, ['flow', 'a'], '_'),
      {
        graph: [
          { flow0_a: [[], [1]] }, // 0
          { flow1_a: [[0], [2, 4]] }, // 1
          { flow2_a: [[1], [3]] }, // 2
          { flow3_a: [[2], []] }, // 3
          { flow4_a: [[1], [5]] }, // 4
          { flow5_a: [[4], []] }, // 5
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('26', () => {
    const actual = {
      graph: ['flow0:flow1:[flow2:flow3],[flow4:flow5]'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(6, ['flow', 'a'], '_'),
      {
        graph: [
          { flow0_a: [[], [1]] }, // 0
          { flow1_a: [[0], [2, 4]] }, // 1
          { flow2_a: [[1], [3]] }, // 2
          { flow3_a: [[2], []] }, // 3
          { flow4_a: [[1], [5]] }, // 4
          { flow5_a: [[4], []] }, // 5
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('27', () => {
    const actual = {
      graph: ['[flow0_a:flow1_a]:flow2_a'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(3, ['flow', 'a'], '_'),
      {
        graph: [
          { flow0_a: [[], [1, 2]] }, // 0
          { flow1_a: [[0], []] }, // 1
          { flow2_a: [[0], []] }, // 2
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('28', () => {
    const actual = {
      graph: ['[flow0_a:flow1_a]:[flow2_a:flow3]'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(4, ['flow', 'a'], '_'),
      {
        graph: [
          { flow0_a: [[], [1, 2]] }, // 0
          { flow1_a: [[0], []] }, // 1
          { flow2_a: [[0], [3]] }, // 2
          { flow3_a: [[2], []] }, // 3
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('29', () => {
    const actual = {
      graph: ['[flow0_a:flow1_a]:[flow2_a:flow3]:flow4'],
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(5, ['flow', 'a'], '_'),
      {
        graph: [
          { flow0_a: [[], [1, 2]] }, // 0
          { flow1_a: [[0], []] }, // 1
          { flow2_a: [[0], [3, 4]] }, // 2
          { flow3_a: [[2], []] }, // 3
          { flow4_a: [[2], []] }, // 4
        ],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('30', () => {
    const actual = {
      graph: 'flow0:flow0',
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(1, ['flow', 'a'], '_'),
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('31', () => {
    const actual = {
      name: 'composed-flow',
      graph: 'flow0_a:flow0',
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(1, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [{ 'composed-flow_flow0_a': [[], []] }],
        defaultNodeIndex: 0,
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('32', () => {
    const actual = {
      name: 'composed-flow',
      graph: 'flow0:flow0_a',
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(1, ['flow', 'a'], '_'),
      {
        name: 'composed-flow',
        graph: [{ 'composed-flow_flow0_a': [[], []] }],
        defaultNodeIndex: 0,
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('33', () => {
    const actual = 'flow0_a:flow0'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(1, ['flow', 'a'], '_'),
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('34', () => {
    const actual = 'flow0:flow0_a'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      ...declareFlows(1, ['flow', 'a'], '_'),
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('35', () => {
    const flowsConfig = (graph: UserFlow) => ({
      splitters: {
        extends: '_',
      },
      flows: ['a', graph],
    })

    const actual = {
      name: 'flow1',
      graph: 'flow1',
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow1',
        graph: [{ flow1: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('36', () => {
    const flowsConfig = (graph: UserFlow) => ({
      splitters: {
        extends: '_',
      },
      flows: [graph],
    })

    const actual = 'a:b'
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'b',
        graph: [{ b: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        graph: [{ a: [[], [1]] }, { b: [[0], []] }],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('37', () => {
    const actual = {
      name: 'flow0',
      graph: 'a',
    }
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow0',
        graph: [{ flow0_a: [[], []] }],
        defaultNodeIndex: 0,
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })

  it('38', () => {
    const flowsConfig = (graph: UserFlow[]) => ({
      splitters: {
        extends: '_',
      },
      flows: graph,
    })

    const actual = ['a:b', 'flow0:flow1']
    const expected: ExpectedFlow[] = [
      {
        name: 'a',
        graph: [{ a: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'b',
        graph: [{ b: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        graph: [{ a: [[], [1]] }, { b: [[0], []] }],
      },
      {
        name: 'flow0',
        graph: [{ flow0: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        name: 'flow1',
        graph: [{ flow1: [[], []] }],
        defaultNodeIndex: 0,
      },
      {
        graph: [{ flow0: [[], [1]] }, { flow1: [[0], []] }],
      },
    ]

    const actualFlows = createFlows(actual, flowsConfig)
    const expectedFlows = createExpected(expected, flowsConfig(actual))

    assertEqualFlows(expectedFlows, actualFlows)
  })
})
