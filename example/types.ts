import { Dictionary, DictionaryValues, DeepPartial, DeepReadonly, Omit, Opaque } from "../lib/types";

const stringDict: Dictionary<string> = {
  a: "A",
  b: "B",
};

// Use Dictionary type with union string type to make sure to cover all possible values
export type DummyOptions = "open" | "closed" | "unknown";
const dictFromUnionType: Dictionary<number, DummyOptions> = {
  closed: 1,
  open: 2,
  unknown: 3,
};
// and get dictionary values
type stringDictValues = DictionaryValues<typeof stringDict>;

// recursive deep partials
type ComplexObject = {
  simple: number;
  nested: {
    a: string;
    array: [{ bar: number }];
  };
};
type ComplexObjectPartial = DeepPartial<ComplexObject>;
const sample: ComplexObjectPartial = {
  nested: {
    array: [{}],
  },
};

// recursive deep readonly
type ComplexObjectReadonly = DeepReadonly<ComplexObject>;

// omit keys in object
type SimplifiedComplexObject = Omit<ComplexObject, "nested">;

// opaque types
type PositiveNumber = Opaque<number, "positive-number">;

function makePositiveNumber(n: number): PositiveNumber {
  if (n <= 0) {
    throw new Error("Value not positive !!!");
  }
  return n as any as PositiveNumber; // this ugly cast is required but only when "producing" opaque types
}
