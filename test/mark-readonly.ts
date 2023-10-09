import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkReadonly, WritableKeys, ReadonlyKeys } from "../lib";
import { Debug } from "./types";

type Example = {
  readonly readonly1: Date;
  readonly readonly2: RegExp;
  required1: number;
  required2: string;
  optional1?: null;
  optional2?: boolean;
};

function testMarkReadonly() {
  type ExampleWithReadonlyRequired1 = Debug<MarkReadonly<Example, "required1">>;

  type cases = [
    Assert<IsExact<MarkReadonly<Example, never>, Example>>,
    Assert<IsExact<MarkReadonly<Example, ReadonlyKeys<Example>>, Example>>,
    Assert<IsExact<MarkReadonly<Example, WritableKeys<Example>>, Readonly<Example>>>,
    Assert<IsExact<ReadonlyKeys<ExampleWithReadonlyRequired1>, "readonly1" | "readonly2" | "required1">>,
    // @ts-expect-error do NOT support union types
    MarkReadonly<Example | { a: 1 }, "required1">,
  ];
}

function testUnionTypes() {
  type UnionExample = Debug<
    MarkReadonly<Pick<Example, "readonly1" | "optional1"> | Pick<Example, "readonly2" | "optional1">, "optional1">
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
declare let readonlyExample: Readonly<Example>;
declare let markedReadonlyExample: MarkReadonly<Example, "optional1">;

function testAssignability() {
  example = readonlyExample;
  example = markedReadonlyExample;
  readonlyExample = example;
  markedReadonlyExample = example;

  // it verifies that type `Readonly<Type>` is assignable to type `Type`

  let assignabilityCheck1: <Type>(object: Type) => object is Readonly<Type>;

  // it verifies that type `MarkReadonly<Type, PropertyName>`
  // is assignable to type `Type`

  let assignabilityCheck2: <Type, PropertyName extends keyof Type>(
    object: Type,
    propertyNames: PropertyName[],
  ) => object is MarkReadonly<Type, PropertyName>;
}
