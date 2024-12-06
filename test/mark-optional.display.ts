import { MarkOptional } from "../lib";

function testDisplay() {
  type T1 = MarkOptional<{ a: 1; b?: 2; readonly c: 3 }, "a">;
  //   ^? type T1 = {
  //          a?: 1 | undefined;
  //          b?: 2 | undefined;
  //          readonly c: 3;
  //      }

  type T2 = MarkOptional<{ a: 1; b?: 2 } | { readonly a: 3; d: 4 }, "a">;
  //   ^? type T2 = {
  //          a?: 1 | undefined;
  //          b?: 2 | undefined;
  //      } | {
  //          readonly a?: 3 | undefined;
  //          d: 4;
  //      }
}
