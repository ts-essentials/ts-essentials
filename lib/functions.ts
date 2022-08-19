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

export const isExact =
  <ExpectedShape>() =>
  <ActualShape>(x: Exact<ActualShape, ExpectedShape>): ExpectedShape => {
    return x;
  };

export const createFactoryWithConstraint =
  <Constraint>() =>
  <Value extends Constraint>(value: Value): Value =>
    value;
