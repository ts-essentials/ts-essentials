import { Prettify } from "../lib";

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
