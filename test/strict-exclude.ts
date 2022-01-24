import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { StrictExclude } from "../lib";

function testStrictExclude() {
  type Animal = "dog" | "cat" | "mouse";

  type cases = [
    // @ts-expect-error
    StrictExclude<Animal, undefined>,
    Assert<IsExact<StrictExclude<Animal, never>, Animal>>,
    Assert<IsExact<StrictExclude<Animal, "dog">, "cat" | "mouse">>,
    Assert<IsExact<StrictExclude<Animal, "cat">, "dog" | "mouse">>,
    Assert<IsExact<StrictExclude<Animal, "mouse">, "dog" | "cat">>,
    Assert<IsExact<StrictExclude<Animal, "cat" | "dog">, "mouse">>,
    Assert<IsExact<StrictExclude<Animal, "cat" | "dog" | "mouse">, never>>,
  ];
}
