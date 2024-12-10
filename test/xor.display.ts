import { XOR } from "../lib";

function testDisplay() {
  type T1 = XOR<{ a: 1 }, { readonly b: 2 }, { c?: 3 }, { readonly d?: 4 }>;
  //   ^? type T1 = {
  //          b?: undefined;
  //          c?: undefined;
  //          d?: undefined;
  //          a: 1;
  //      } | {
  //          c?: undefined;
  //          d?: undefined;
  //          a?: undefined;
  //          readonly b: 2;
  //      } | {
  //          b?: undefined;
  //          d?: undefined;
  //          a?: undefined;
  //          c?: 3 | undefined;
  //      } | {
  //          b?: undefined;
  //          c?: undefined;
  //          a?: undefined;
  //          readonly d?: 4 | undefined;
  //      }
}
