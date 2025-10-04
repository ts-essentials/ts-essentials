import { Merge } from "../lib";

function testDisplay() {
  type T1 = Merge<{ a?: 1; b: 2 }, { b: 3; readonly d: 4 }>;
  //   ^? type T1 = {
  //          a?: 1 | undefined;
  //          b: 3;
  //          readonly d: 4;
  //      }
}
