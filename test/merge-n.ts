import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { MergeN } from "../lib";

function testIndexSignatures() {
  type StringNames = {
    [names: string]: string;
    name: string;
  };

  type NumericNames = {
    [names: number]: number;
    name: number;
  };

  type StringAndNumericMergedNames = MergeN<[StringNames, NumericNames]>;

  type cases = [
    Assert<IsExact<StringAndNumericMergedNames[string], string>>,
    Assert<IsExact<StringAndNumericMergedNames[number], number>>,
    Assert<IsExact<StringAndNumericMergedNames["name"], number>>,
    Assert<IsExact<StringAndNumericMergedNames["anotherField"], string>>,
    // @ts-expect-error: Type 'symbol' cannot be used as an index type
    StringAndNumericMergedNames[symbol],
    // @ts-expect-error: Type 'unique symbol' cannot be used as an index type
    StringAndNumericMergedNames[typeof Symbol.iterator],
  ];
}

function testPropertyModifiers() {
  type cases = [
    // required property override
    Assert<IsExact<MergeN<[{ property: number }, { property: string }]>, { property: string }>>,
    Assert<IsExact<MergeN<[{ property: number }, { property?: string }]>, { property?: string }>>,
    Assert<IsExact<MergeN<[{ property: number }, { readonly property: string }]>, { readonly property: string }>>,
    // optional modifier override
    Assert<IsExact<MergeN<[{ property?: string }, { property?: boolean }]>, { property?: boolean }>>,
    Assert<IsExact<MergeN<[{ property?: string }, { property: boolean }]>, { property: boolean }>>,
    Assert<IsExact<MergeN<[{ property?: string }, { readonly property: boolean }]>, { readonly property: boolean }>>,
    // readonly modifier override
    Assert<
      IsExact<MergeN<[{ readonly property: boolean }, { readonly property: number }]>, { readonly property: number }>
    >,
    Assert<IsExact<MergeN<[{ readonly property: boolean }, { property?: number }]>, { property?: number }>>,
    Assert<IsExact<MergeN<[{ readonly property: boolean }, { property: number }]>, { property: number }>>,
  ];
}

function testMerge() {
  type cases = [
    Assert<IsExact<MergeN<[{}]>, {}>>,
    Assert<IsExact<MergeN<[{ property: string }]>, { property: string }>>,
    Assert<IsExact<MergeN<[{}, { property: string }]>, { property: string }>>,
    Assert<IsExact<MergeN<[{ property: string }, {}]>, { property: string }>>,
    Assert<
      IsExact<
        MergeN<[{ property1: number; property2: string }, { property1: string }]>,
        { property1: string; property2: string }
      >
    >,
    Assert<IsExact<MergeN<[{ property: number }, { property: string }, { property: boolean }]>, { property: boolean }>>,
  ];
}
