import { Primitive } from "./types";

export class UnreachableCaseError extends Error {  
  constructor(value: never) { 
      super(`Unreachable case: ${value}`);
  }
}

export function literal<T extends Primitive>(value: T):T {
  return value;
}