import { literal, UnreachableCaseError } from "../lib/functions";
import { DummyOptions } from "./types";

// prevent type widening https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening
const t = {
  letter: literal("a"), // type stays "a" not string
  digit: literal(5), // type stays 5 not number
};


// exhaustive switch cases in typescript!
function actOnDummyOptions(options: DummyOptions): string {
  switch (options) {
    case "open":
      return "it's open!";
    case "closed":
      return "it's closed";
    case "unknown":
      return "i have no idea";
    default:
      // if you would add another option to DummyOptions, you'll get error here!
      throw new UnreachableCaseError(options);
  }
}
