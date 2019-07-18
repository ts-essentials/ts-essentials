import { Primitive } from "./types";

export class UnreachableCaseError extends Error {
  constructor(value: never) {
    super(`Unreachable case: ${value}`);
  }
}

/**
 * @deprecated since ts-essentials 3.x -- use `as const` assertions available from TS 3.4
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
 */
export function literal<T extends Primitive>(value: T): T {
  return value;
}
