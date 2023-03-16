import { AssertTrue as Assert, IsExact } from "conditional-type-checks";

import { Opaque } from "../lib";

// T = U
type Assignable<T, U> = U extends T ? true : false;

function testOpaque() {
  type t1 = Assert<IsExact<Assignable<number, Opaque<number, "a">>, true>>;
  type t2 = Assert<IsExact<Assignable<Opaque<number, "a">, number>, false>>;
  type t3 = Assert<IsExact<Assignable<Opaque<number, "a">, Opaque<number, "b">>, false>>;
  type t4 = Assert<IsExact<Assignable<Opaque<number, "a">, Opaque<number, "a">>, true>>;
  type t5 = Assert<IsExact<Opaque<"a", string>, never>>; // should blow on mismatched order
}

export type AED = Opaque<number, "AED">;

export const fiveAED = 5 as AED;
