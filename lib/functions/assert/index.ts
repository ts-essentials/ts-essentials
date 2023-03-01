export function assert(condition: any, message: string = "no additional info provided"): asserts condition {
  if (!condition) {
    throw new Error("Assertion Error: " + message);
  }
}
