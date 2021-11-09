import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { CamelCase } from "../lib";

function testSnakeCase() {
  type cases = [
    Assert<IsExact<CamelCase<string>, "">>,
    Assert<IsExact<CamelCase<"">, "">>,
    Assert<IsExact<CamelCase<"oneword">, "oneword">>,
    Assert<IsExact<CamelCase<"two_words">, "twoWords">>,
    Assert<IsExact<CamelCase<"here_three_words">, "hereThreeWords">>,
  ];
}
