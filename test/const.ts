import { ComplexNestedRequired } from "./types";

export const complexNestedRequired: ComplexNestedRequired = {
  simple: 1,
  nested: {
    date: new Date(),
    func: () => "123",
    array: [{ bar: 123 }],
    tuple: ["123", 123, { good: true }],
    set: new Set<{ name: string }>(),
    map: new Map<
      string,
      {
        name: string;
      }
    >(),
    promise: new Promise<{ foo: string; bar: number }>(() => {}),
  },
};

export const complexNestedUndefined = {
  simple: undefined,
  nested: {
    date: undefined,
    func: undefined,
    array: undefined,
    tuple: undefined,
    set: undefined,
    map: undefined,
    promise: undefined,
  },
};
