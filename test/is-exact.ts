import { isExact } from "../lib";

function testObjects() {
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

function testObjectUnionType() {
  type ABC = { a: number; b: number; c: number };
  type BC = { b: number; c: number };

  let abcOrBc: ABC | BC = { a: 1, b: 2, c: 3 };
  let bc3 = { b: 2, c: 3 } as const;
  let bcOrBc3: BC | typeof bc3 = bc3;

  const isBC = isExact<BC>();

  // @ts-expect-error has different structure from BC (excessive `ABC` union element)
  isBC(abcOrBc);

  // has the same structure as BC
  isBC(bcOrBc3);
}

function testObjectUndefinedUnionProperties() {
  type RequiredA = { a: number };
  type OptionalA = { a: number | undefined };

  const requiredA: RequiredA = { a: 1 };
  const optionalA: OptionalA = { a: 1 };

  const isRequiredA = isExact<RequiredA>();
  const isOptionalA = isExact<OptionalA>();

  // as the same structure as RequiredA
  isRequiredA(requiredA);
  // @ts-expect-error has different structure from BC (a has excessive `undefined` union element)
  isRequiredA(optionalA);
  // @ts-expect-error has different structure from BC (a has missed `undefined` union element)
  isOptionalA(requiredA);
  // as the same structure as OptionalA
  isOptionalA(optionalA);
}

function testPrimitiveUnionType() {
  type MaybeNumber = number | undefined;

  const numericLiteral = 10;
  const number = 10 as number;
  const maybeNumber = 10 as MaybeNumber;

  const isNumber = isExact<number>();
  const isMaybeNumber = isExact<MaybeNumber>();

  // @ts-expect-error has different type from number (numeric literal type)
  isNumber(numericLiteral);
  isNumber(number);
  // @ts-expect-error has different type from number (excessive `undefined` union element)
  isNumber(maybeNumber);

  // @ts-expect-error has different type from MaybeNumber (numeric literal type)
  isMaybeNumber(numericLiteral);
  isMaybeNumber(maybeNumber);
  // @ts-expect-error has different type from MaybeNumber (missing `undefined` union element)
  isMaybeNumber(number);
}
