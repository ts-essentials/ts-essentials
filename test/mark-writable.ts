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
  type cases = [
    Assert<IsExact<MarkWritable<Example, never>, Example>>,
    Assert<IsExact<MarkWritable<Example, WritableKeys<Example>>, Example>>,
    Assert<IsExact<MarkWritable<Example, ReadonlyKeys<Example>>, Writable<Example>>>,
    Assert<
      IsExact<
        MarkWritable<Example, "readonly1">,
        {
          readonly1: Date;
          readonly readonly2: RegExp;
          required1: number;
          required2: string;
          optional1?: null;
          optional2?: boolean;
        }
      >
    >,
    // @ts-expect-error do NOT support union types
    MarkWritable<Example | { a: 1 }, "readonly1">,
  ];
}

function testUnionTypes() {
  type UnionExample = Debug<
    MarkWritable<Pick<Example, "readonly1" | "optional1"> | Pick<Example, "readonly2" | "optional1">, "optional1">
  >;

  let unionElementFields: UnionExample = {
    readonly2: /\w+/g,
    optional1: null,
  };

  unionElementFields = {
    readonly1: new Date(),
    optional1: null,
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
