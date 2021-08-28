import { Exact } from "./types";

export class UnreachableCaseError extends Error {
  constructor(value: never) {
    super(`Unreachable case: ${value}`);
  }
}

export function assert(condition: any, msg: string = "no additional info provided"): asserts condition {
  if (!condition) {
    throw new Error("Assertion Error: " + msg);
  }
}

export function noop(..._args: unknown[]): void {}

export function isExact<T, EXACT_SHAPE>(x: Exact<T, EXACT_SHAPE>): EXACT_SHAPE {
  return x;
}
