import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Merge } from "../lib";

function testIndexSignatures() {
  type SymbolNames = {
    [names: symbol]: symbol;
    name: symbol;
  };

  type StringNames = {
    [names: string]: string;
    name: string;
  };

  type NumericNames = {
    [names: number]: number;
    name: number;
  };

  type SymbolAndStringMergedNames = Merge<SymbolNames, StringNames>;
  type StringAndNumericMergedNames = Merge<StringNames, NumericNames>;

  type cases = [
    Assert<IsExact<SymbolAndStringMergedNames[symbol], symbol>>,
    Assert<IsExact<SymbolAndStringMergedNames[typeof Symbol.iterator], symbol>>,
    Assert<IsExact<SymbolAndStringMergedNames[string], string>>,
    Assert<IsExact<SymbolAndStringMergedNames["name"], string>>,
    Assert<IsExact<SymbolAndStringMergedNames["anotherField"], string>>,
    // number can still be used as a key for { [names: symbol]: symbol; [names: string]: string }
    Assert<IsExact<SymbolAndStringMergedNames[number], string>>,

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
    Assert<IsExact<Merge<{ property: number }, { property: string }>, { property: string }>>,
    Assert<IsExact<Merge<{ property: number }, { property?: string }>, { property?: string }>>,
    Assert<IsExact<Merge<{ property: number }, { readonly property: string }>, { readonly property: string }>>,
    // optional modifier override
    Assert<IsExact<Merge<{ property?: string }, { property?: boolean }>, { property?: boolean }>>,
    Assert<IsExact<Merge<{ property?: string }, { property: boolean }>, { property: boolean }>>,
    Assert<IsExact<Merge<{ property?: string }, { readonly property: boolean }>, { readonly property: boolean }>>,
    // readonly modifier override
    Assert<
      IsExact<Merge<{ readonly property: boolean }, { readonly property: number }>, { readonly property: number }>
    >,
    Assert<IsExact<Merge<{ readonly property: boolean }, { property?: number }>, { property?: number }>>,
    Assert<IsExact<Merge<{ readonly property: boolean }, { property: number }>, { property: number }>>,
  ];
}

function testMerge() {
  type cases = [
    Assert<IsExact<Merge<{}, { property: string }>, { property: string }>>,
    Assert<IsExact<Merge<{ property: string }, {}>, { property: string }>>,
    Assert<
      IsExact<
        Merge<{ property1: number; property2: string }, { property1: string }>,
        { property1: string; property2: string }
      >
    >,
  ];
}
