import { awesomeFn } from "@quramy/x-core";

export function cli() {
  awesomeFn(1);
  return Promise.resolve(true);
}