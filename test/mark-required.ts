import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkRequired } from "../lib/types";

function testMarkRequired() {
  type Example = {
    required: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };

  type cases = [
    Assert<
      IsExact<
        MarkRequired<Example, "required2" | "optional1">,
        {
          required: number;
          required2: string;
          optional1: null;
          optional2?: boolean;
        }
      >
    >,
  ];
}
