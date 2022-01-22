import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MarkRequired } from "../lib/types";

function testMarkRequired() {
  type TestType = {
    required1: number;
    required2: string;
    optional1?: null;
    optional2?: boolean;
  };
  type ExpectedType = {
    required1: number;
    required2: string;
    optional1: null;
    optional2?: boolean;
  };

  type cases = [Assert<IsExact<MarkRequired<TestType, "required2" | "optional1">, ExpectedType>>];
}
