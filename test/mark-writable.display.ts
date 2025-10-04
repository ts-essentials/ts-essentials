import { MarkWritable } from "../lib";

function testDisplay() {
  type T1 = MarkWritable<{ readonly a: 1; b: 2; readonly c?: 3 }, "a">;
  //   ^? type T1 = {
  //          a: 1;
  //          b: 2;
  //          readonly c?: 3 | undefined;
  //      }

  type T2 = MarkWritable<{ readonly a: 1; b: 2 } | { readonly a?: 3; readonly d: 4 }, "a">;
  //   ^? type T2 = {
  //          a: 1;
  //          b: 2;
  //      } | {
  //          a?: 3 | undefined;
  //          readonly d: 4;
  //      }
}
