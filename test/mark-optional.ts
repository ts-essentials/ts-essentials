import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkOptional, OptionalKeys, RequiredKeys, WritableKeys } from "../lib";

function testMarkOptional() {
  type Example = {
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };

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

  type cases = [
    Assert<IsExact<MarkOptional<Example, never>, Example>>,
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
