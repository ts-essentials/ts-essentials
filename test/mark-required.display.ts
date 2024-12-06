import { MarkRequired } from "../lib";

function testDisplay() {
  type T1 = MarkRequired<{ a?: 1; b: 2; readonly c?: 3 }, "a">;
  //   ^? type T1 = {
  //          a: 1;
  //          b: 2;
  //          readonly c?: 3 | undefined;
  //      }

  type T2 = MarkRequired<{ a?: 1; b: 2 } | { readonly a?: 3; d?: 4 }, "a">;
  //   ^? type T2 = {
  //          a: 1;
  //          b: 2;
  //      } | {
  //          readonly a: 3;
  //          d?: 4 | undefined;
  //      }
}
