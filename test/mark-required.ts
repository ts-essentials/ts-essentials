import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkRequired, RequiredKeys, OptionalKeys, Prettify } from "../lib";

type Example = {
  readonly readonly1: Date;
  readonly readonly2: RegExp;
  required1: number;
  required2: string;
  optional1?: null;
  optional2?: boolean;
};

function testMarkRequired() {
  type cases = [
    Assert<IsExact<MarkRequired<Example, never>, Example>>,
    Assert<IsExact<MarkRequired<Example, RequiredKeys<Example>>, Example>>,
    Assert<IsExact<MarkRequired<Example, OptionalKeys<Example>>, Required<Example>>>,
    Assert<
      IsExact<
        MarkRequired<Example, "optional1">,
        {
          readonly readonly1: Date;
          readonly readonly2: RegExp;
          required1: number;
          required2: string;
          optional1: null;
          optional2?: boolean;
        }
      >
    >,
    // @ts-expect-error: throws type error when one of union elements doesn't have property
    MarkRequired<Example | { a: 1 }, "readonly1">,
  ];
}

function testUnionTypes() {
  type UnionExample = Prettify<
    MarkRequired<Pick<Example, "readonly1" | "optional1"> | Pick<Example, "readonly2" | "optional1">, "optional1">
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
declare let requiredExample: Required<Example>;
declare let markedRequiredExample: Prettify<MarkRequired<Example, "optional1">>;

function testAssignability() {
  example = requiredExample;
  example = markedRequiredExample;
  // @ts-expect-error: Type 'Example' is not assignable to type 'Required<Example>'
  requiredExample = example;
  // @ts-expect-error: Type 'MarkRequired<Example, "optional1">' is not assignable to type 'Required<Example>'
  requiredExample = markedRequiredExample;
  // @ts-expect-error: Type 'Example' is not assignable to type 'Required<Pick<Example, "optional1">>'
  markedRequiredExample = example;

  // it verifies that type `Required<Type>` is assignable to type `Type`

  let assignabilityCheck1: <Type>(object: Type) => object is Required<Type>;

  // it verifies that type `MarkRequired<Type, PropertyName>`
  // is assignable to type `Type`

  let assignabilityCheck2: <Type, PropertyName extends keyof Type>(
    object: Type,
    propertyNames: PropertyName[],
  ) => object is MarkRequired<Type, PropertyName>;

  // it verifies that type `MarkRequired<Type, PropertyName>` is assignable to type `Partial<Type>`

  let assignabilityCheck3: <Type, PropertyName extends keyof Type>(
    object: Partial<Type>,
    propertyNames: PropertyName[],
  ) => object is MarkRequired<Type, PropertyName>;

  // it verifies that type `MarkRequired<Type, PropertyName>` is NOT assignable to type `Required<Type>`

  let assignabilityCheck4: <Type, PropertyName extends keyof Type>(
    object: Required<Type>,
    propertyNames: PropertyName[],
    // @ts-expect-error: Type 'MarkRequired<Type, PropertyName>' is NOT assignable to type 'Required<Type>'
  ) => object is MarkRequired<Type, PropertyName>;
}
