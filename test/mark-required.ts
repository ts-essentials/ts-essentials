import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkRequired, RequiredKeys, OptionalKeys } from "../lib/types";

function testMarkRequired() {
  type Example = {
    readonly readonly1: Date;
    readonly readonly2: RegExp;
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };

  type UnionExample = MarkRequired<
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
