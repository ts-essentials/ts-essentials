import {
  Dictionary,
  DictionaryValues,
  DeepPartial,
  DeepReadonly,
  Opaque,
  DeepRequired,
  AsyncOrSync,
} from "../lib/types";

const stringDict: Dictionary<string> = {
  a: "A",
  b: "B",
};

// Specify second type argument to change dictionary keys type
const dictOfNumbers: Dictionary<string, number> = {
  420: "four twenty",
  1337: "HAX",
};

// You may specify union types as key to cover all possible cases. It's acts the same as Record from TS's standard library
export type DummyOptions = "open" | "closed" | "unknown";
const dictFromUnionType: Dictionary<number, DummyOptions> = {
  closed: 1,
  open: 2,
  unknown: 3,
};

// and get dictionary values
type stringDictValues = DictionaryValues<typeof stringDict>;

type ComplexObject = {
  simple: number;
  nested: {
    a: string;
    array: [{ bar: number }];
  };
};

// recursive deep partial
type ComplexObjectPartial = DeepPartial<ComplexObject>;
const samplePartial: ComplexObjectPartial = {
  nested: {
    array: [],
  },
};

// recursive deep required
type ComplexObjectAgain = DeepRequired<ComplexObjectPartial>;
const sampleRequired: ComplexObjectAgain = {
  simple: 5,
  nested: {
    a: "test",
    array: [{ bar: 1 }],
  },
};

// recursive deep readonly
type ComplexObjectReadonly = DeepReadonly<ComplexObject>;

// omit keys in object
type SimplifiedComplexObject = Omit<ComplexObject, "nested">;

// opaque types
type PositiveNumber = Opaque<number, "PositiveNumber">;
function makePositiveNumber(n: number): PositiveNumber {
  if (n <= 0) {
    throw new Error(`Value ${n} is not positive !`);
  }
  return n as any as PositiveNumber; // this ugly cast is required but only when "producing" opaque types
}

type NegativeNumber = Opaque<number, "NegativeNumber">;
function makeNegativeNumber(n: number): NegativeNumber {
  if (n >= 0) {
    throw new Error(`Value ${n} is not negative !`);
  }
  return n as any as NegativeNumber; // this ugly cast is required but only when "producing" opaque types
}

let a = makePositiveNumber(5); // runtime check
let b = makeNegativeNumber(-10); // runtime check

interface CiProvider {
  getSHA(): AsyncOrSync<string>;
}

class Circle implements CiProvider {
  // implementation can use sync version
  getSHA() {
    return "abc";
  }
}

class Travis implements CiProvider {
  // implementation can use async version when needed
  async getSHA() {
    // do async call
    return "def";
  }
}
