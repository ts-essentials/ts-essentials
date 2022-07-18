import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkReadonly, WritableKeys, ReadonlyKeys } from "../lib/types";

function testMarkReadonly() {
  type Example = {
    readonly readonly1: Date;
    readonly readonly2: RegExp;
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };

  type UnionExample = MarkReadonly<
    Pick<Example, "readonly1" | "optional1"> | Pick<Example, "readonly2" | "optional1">,
    "optional1"
  >;

  let unionElementFields: UnionExample = {
    readonly2: /\w+/g,
    optional1: null,
  };

  unionElementFields = {
    readonly1: new Date(),
    optional1: null,
  };

  type cases = [
    Assert<IsExact<MarkReadonly<Example, never>, Example>>,
    Assert<IsExact<MarkReadonly<Example, ReadonlyKeys<Example>>, Example>>,
    Assert<IsExact<MarkReadonly<Example, WritableKeys<Example>>, Readonly<Example>>>,
    Assert<
      IsExact<
        MarkReadonly<Example, "required1">,
        {
          readonly readonly1: Date;
          readonly readonly2: RegExp;
          readonly required1: number;
          required2: string;
          optional1?: null;
          optional2?: boolean;
        }
      >
    >,
    // @ts-expect-error do NOT support union types
    MarkReadonly<Example | { a: 1 }, "required1">,
  ];
}
