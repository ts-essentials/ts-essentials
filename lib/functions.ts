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
