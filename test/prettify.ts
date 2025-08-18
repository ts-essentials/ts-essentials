import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Prettify } from "../lib";

function testPrettify() {
  type cases = [
    Assert<IsExact<Prettify<number>, number>>,
    Assert<IsExact<Prettify<string>, string>>,
    Assert<IsExact<Prettify<boolean>, boolean>>,
    Assert<IsExact<Prettify<symbol>, symbol>>,
    Assert<IsExact<Prettify<null>, null>>,
    Assert<IsExact<Prettify<undefined>, undefined>>,
    Assert<IsExact<Prettify<{ a: 1; b?: 1 }>, { a: 1; b?: 1 }>>,
    Assert<IsExact<Prettify<{ readonly a?: 1 }>, { readonly a?: 1 }>>,
    Assert<IsExact<Prettify<{ a: 1 } | { b?: 2 }>, { a: 1 } | { b?: 2 }>>,
    Assert<IsExact<Prettify<[1, 2?]>, [1, 2?]>>,
    Assert<IsExact<Prettify<string[]>, string[]>>,
    Assert<IsExact<Prettify<() => void>, () => void>>,
  ];
}

function testAssignability() {
  let assignabilityCheck1: <Type>(arg: Type) => arg is Prettify<Type>;
  // let assignabilityCheck2: <Type>(arg: Prettify<Type>) => arg is Type; // This fails currently, but shouldn't ideally
}

function testClass() {
  class TestClass {
    private _a: number = Date.now();
    protected _b: Date = new Date();
    c?: string;
    d: boolean = true;
  }

  type cases = [Assert<IsExact<Prettify<TestClass>, { c?: string; d: boolean }>>];
}
