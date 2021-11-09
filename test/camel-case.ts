import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { CamelCase, DeepCamelCaseProperties } from "../lib";

declare const symbol: unique symbol;

type SnakeCaseExample = {
  oneword: 1;
  two_words: "123";
  here_three_words: false;
  1: undefined;
  [symbol]: null;
  nested: {
    oneword: {};
    two_words: [1, 2, 3];
    here_three_words: Set<number>;
  };
};

type CamelCaseExample = {
  oneword: 1;
  twoWords: "123";
  hereThreeWords: false;
  1: undefined;
  [symbol]: null;
  nested: {
    oneword: {};
    twoWords: [1, 2, 3];
    hereThreeWords: Set<number>;
  };
};

function testSnakeCase() {
  type cases = [
    Assert<IsExact<CamelCase<symbol>, symbol>>,
    Assert<IsExact<CamelCase<number>, number>>,
    Assert<IsExact<CamelCase<string>, string>>,
    Assert<IsExact<CamelCase<"">, "">>,
    Assert<IsExact<CamelCase<"oneword">, "oneword">>,
    Assert<IsExact<CamelCase<"two_words">, "twoWords">>,
    Assert<IsExact<CamelCase<"here_three_words">, "hereThreeWords">>,
  ];
}

function testSnakeToCamelCase() {
  type cases = [
    Assert<IsExact<DeepCamelCaseProperties<SnakeCaseExample>, CamelCaseExample>>,
    // doesn't hurt calling it twice
    Assert<IsExact<DeepCamelCaseProperties<CamelCaseExample>, CamelCaseExample>>,
  ];
}
