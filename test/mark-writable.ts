import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkWritable, Writable, ReadonlyKeys, WritableKeys } from "../lib";
import { Debug } from "./types";

type Example = {
  readonly readonly1: Date;
  readonly readonly2: RegExp;
  required1: number;
  required2: string;
  optional1?: null;
  optional2?: boolean;
};

function testMarkWritable() {
  type ExampleWithWritableReadonly1 = Debug<MarkWritable<Example, "readonly1">>;

  type cases = [
    Assert<IsExact<MarkWritable<Example, never>, Example>>,
    Assert<IsExact<MarkWritable<Example, WritableKeys<Example>>, Example>>,
    Assert<IsExact<MarkWritable<Example, ReadonlyKeys<Example>>, Writable<Example>>>,
    Assert<IsExact<ReadonlyKeys<ExampleWithWritableReadonly1>, "readonly2">>,
    // @ts-expect-error do NOT support union types
    MarkWritable<Example | { a: 1 }, "readonly1">,
  ];
}

function testUnionTypes() {
  type UnionExample = Debug<
    MarkWritable<Pick<Example, "readonly1" | "optional1"> | Pick<Example, "readonly1" | "optional2">, "readonly1">
  >;

  let unionElementFields: UnionExample = {
    readonly1: new Date(),
    optional1: null,
  };

  unionElementFields = {
    readonly1: new Date(),
    optional2: true,
  };
}

declare let example: Example;
declare let writableExample: Writable<Example>;
declare let markedWritableExample: Debug<MarkWritable<Example, "readonly1">>;

function testAssignability() {
  example = writableExample;
  example = markedWritableExample;
  writableExample = example;
  markedWritableExample = example;

  // it verifies that type `Writable<Type>` is assignable to type `Type`

  let assignabilityCheck1: <Type>(object: Type) => object is Writable<Type>;

  // it verifies that type `MarkWritable<Type, PropertyName>`
  // is assignable to type `Type`

  let assignabilityCheck2: <Type, PropertyName extends keyof Type>(
    object: Type,
    propertyNames: PropertyName[],
  ) => object is MarkWritable<Type, PropertyName>;
}
