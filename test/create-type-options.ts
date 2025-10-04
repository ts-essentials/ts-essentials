import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { CreateTypeOptions } from "../lib/create-type-options";

type RequiredPrimitiveObject = {
  a: number;
  b: string;
  c: boolean;
};

type PartialPrimitiveObject = Partial<RequiredPrimitiveObject>;

type DefaultPrimitiveObject = {
  a: 1;
  b: "2";
  c: false;
};

function testResolvedValues() {
  type cases = [
    Assert<IsExact<CreateTypeOptions<RequiredPrimitiveObject, {}, DefaultPrimitiveObject>, DefaultPrimitiveObject>>,
    Assert<
      IsExact<CreateTypeOptions<RequiredPrimitiveObject, { a: 2 }, DefaultPrimitiveObject>, { a: 2; b: "2"; c: false }>
    >,
    Assert<
      IsExact<
        CreateTypeOptions<RequiredPrimitiveObject, { b: "1" }, DefaultPrimitiveObject>,
        { a: 1; b: "1"; c: false }
      >
    >,
    Assert<
      IsExact<
        CreateTypeOptions<RequiredPrimitiveObject, { c: true }, DefaultPrimitiveObject>,
        { a: 1; b: "2"; c: true }
      >
    >,
  ];
}

function testGenericConstraints() {
  type cases = [
    // @ts-expect-error: Type '{}' is missing the following properties from type
    // 'Required<RequiredPrimitiveObject>': a, b, c
    CreateTypeOptions<RequiredPrimitiveObject, {}, {}>,
    // @ts-expect-error: Type 'Partial<RequiredPrimitiveObject>' does not
    // satisfy the constraint 'Required<Partial<RequiredPrimitiveObject>>'
    CreateTypeOptions<PartialPrimitiveObject, {}, DefaultPrimitiveObject>,
    // @ts-expect-error: Type '{ d: 1; }' has no properties in common with type
    // 'Partial<RequiredPrimitiveObject>'
    CreateTypeOptions<RequiredPrimitiveObject, { d: 1 }, DefaultPrimitiveObject>,
  ];
}
