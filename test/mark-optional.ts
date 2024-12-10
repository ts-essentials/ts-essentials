import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkOptional, OptionalKeys, RequiredKeys } from "../lib";

type Example = {
  required1: number;
  required2: string;
  optional1?: null;
  optional2?: boolean;
};

function testMarkOptional() {
  type cases = [
    Assert<IsExact<MarkOptional<Example, never>, Example>>,
    Assert<IsExact<MarkOptional<Example, any>, Partial<Example>>>,
    Assert<IsExact<MarkOptional<Example, OptionalKeys<Example>>, Example>>,
    Assert<IsExact<MarkOptional<Example, RequiredKeys<Example>>, Partial<Example>>>,
    Assert<
      IsExact<
        MarkOptional<Example, "required1">,
        {
          required1?: number;
          required2: string;
          optional1?: null;
          optional2?: boolean;
        }
      >
    >,
    // @ts-expect-error do NOT support union types
    MarkOptional<Example | { a: 1 }, "required1">,
  ];
}

function testUnionTypes() {
  type UnionExample = MarkOptional<
    Pick<Example, "required1" | "optional1"> | Pick<Example, "required2" | "optional1">,
    "optional1"
  >;

  let unionElementFields: UnionExample = {
    required1: 1,
    optional1: null,
  };

  unionElementFields = {
    required2: "2",
    optional1: null,
  };
}

declare let example: Example;
declare let optionalExample: Partial<Example>;
declare let markedOptionalExample: MarkOptional<Example, "required1">;

function testAssignability() {
  // @ts-expect-error: Type 'Partial<Example>' is not assignable to type 'Example'
  example = optionalExample;
  // @ts-expect-error: Type 'Omit<Example, "required1"> & Partial<Pick<Example, "required1">>' is not assignable to type 'Example'
  example = markedOptionalExample;
  optionalExample = example;
  optionalExample = markedOptionalExample;
  markedOptionalExample = example;

  // it verifies that type `Partial<Type>` is NOT assignable to type `Type`

  // @ts-expect-error: Type 'Partial<Type>' is not assignable to type 'Type'
  let assignabilityCheck1: <Type>(object: Type) => object is Partial<Type>;

  // it verifies that type `MarkOptional<Type, PropertyName>`
  // is NOT assignable to type `Type`

  let assignabilityCheck2: <Type, PropertyName extends keyof Type>(
    object: Type,
    propertyNames: PropertyName[],
    // @ts-expect-error: Type 'MarkOptional<Type, PropertyName>' is not assignable to type 'Type'
  ) => object is MarkOptional<Type, PropertyName>;

  // it verifies that type `MarkOptional<Type, PropertyName>` is assignable to type `Partial<Type>`

  let assignabilityCheck3: <Type, PropertyName extends keyof Type>(
    object: Partial<Type>,
    propertyNames: PropertyName[],
  ) => object is MarkOptional<Type, PropertyName>;
}
