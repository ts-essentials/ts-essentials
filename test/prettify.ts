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

function testDisplay() {
  type A = { a: 1; b?: 2 };
  type B = { readonly c: 1 };

  type T1 = Prettify<A & B>;
  //   ^? type T1 = {
  //          a: 1;
  //          b?: 2 | undefined;
  //          readonly c: 1;
  //      }

  // Arrays are currently not prettified, would need recursive prettification
  type T2 = Prettify<(A & B)[]>;
  //   ^? type T2 = (A & B)[]

  // Functions are returned unchanged
  type T3 = Prettify<() => A & B>;
  //   ^? type T3 = () => A & B

  type T4 = Prettify<{ a: 1 } | (A & B)>;
  //   ^? type T4 = {
  //          a: 1;
  //          b?: 2 | undefined;
  //          readonly c: 1;
  //      } | {
  //          a: 1;
  //      }

  type T5 = Prettify<{ a: 1 } & (A | B)>;
  //   ^? type T5 = {
  //          a: 1;
  //          b?: 2 | undefined;
  //      } | {
  //          a: 1;
  //          readonly c: 1;
  //      }
}
