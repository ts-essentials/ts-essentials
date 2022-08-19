import { isExact } from "../lib";

function testIsExact() {
  type ABC = { a: number; b: number; c: number };
  type BC = { b: number; c: number };
  type BC2 = { b: number; c: string };
  type C = { c: number };

  let abc: ABC = { a: 1, b: 2, c: 3 };
  let abc2 = { a: 1, b: 2, c: 3 } as const;
  let bc: BC = { b: 2, c: 3 };
  let bc2: BC2 = { b: 2, c: "3" };
  let bc3 = { b: 2, c: 3 } as const;
  let bc4 = { b: 2, c: "3" } as const;
  let c: C = { c: 3 };
  let c2 = { c: 3 } as const;

  const isBC = isExact<BC>();

  // @ts-expect-error has different structure from BC (excessive property a)
  isBC(abc);
  // @ts-expect-error has different structure from BC (excessive property a)
  isBC(abc2);

  // has the same structure as BC
  isBC(bc);
  // @ts-expect-error has different structure from BC (c has different type)
  isBC(bc2);
  // has the same structure as BC
  isBC(bc3);
  // @ts-expect-error has different structure from BC (c has different type)
  isBC(bc4);

  // @ts-expect-error has different structure from BC (missing property b)
  isBC(c);
  // @ts-expect-error has different structure from BC (missing property b)
  isBC(c2);
}
