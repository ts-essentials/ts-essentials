import { MarkReadonly } from "../lib";

function testDisplay() {
  type T1 = MarkReadonly<{ a: 1; readonly b: 2; c?: 3 }, "a">;
  //   ^? type T1 = {
  //          readonly a: 1;
  //          readonly b: 2;
  //          c?: 3 | undefined;
  //      }

  type T2 = MarkReadonly<{ a: 1; readonly b: 2 } | { a?: 3; d: 4 }, "a">;
  //   ^? type T2 = {
  //          readonly a: 1;
  //          readonly b: 2;
  //      } | {
  //          readonly a?: 3 | undefined;
  //          d: 4;
  //      }
}
