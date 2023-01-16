import { isExact } from "../lib";

function testArray() {
  const readonlyArray: readonly number[] = [1, 2, 3];
  const writableArray: number[] = [1, 2, 3];
  const tuple: [number] = [1];
  const readonlyTuple = [1, 2, 3] as const;

  const isReadonlyArray = isExact<readonly number[]>();
  const isWritableArray = isExact<number[]>();
  const isTuple = isExact<[number]>();
  const isReadonlyTuple = isExact<readonly [1, 2, 3]>();

  isReadonlyArray(readonlyArray);
  // @ts-expect-error: doesn't have `readonly`
  isReadonlyArray(writableArray);
  // @ts-expect-error: doesn't have `readonly` and is tuple
  isReadonlyArray(tuple);
  // @ts-expect-error: is tuple
  isReadonlyArray(readonlyTuple);

  // @ts-expect-error: has `readonly`
  isWritableArray(readonlyArray);
  isWritableArray(writableArray);
  // @ts-expect-error: is tuple
  isWritableArray(tuple);
  // @ts-expect-error: has `readonly` and is tuple
  isWritableArray(readonlyTuple);

  // @ts-expect-error: has `readonly` and isn't tuple
  isTuple(readonlyArray);
  // @ts-expect-error: isn't tuple
  isTuple(writableArray);
  isTuple(tuple);
  // @ts-expect-error: has `readonly`
  isTuple(readonlyTuple);

  // @ts-expect-error: isn't tuple
  isReadonlyTuple(readonlyArray);
  // @ts-expect-error: has NO `readonly` and isn't tuple
  isReadonlyTuple(writableArray);
  // @ts-expect-error: has NO `readonly`
  isReadonlyTuple(tuple);
  isReadonlyTuple(readonlyTuple);
}

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
  // @ts-expect-error: has different structure from BC (b and c have different types)
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

  // @ts-expect-error: has different structure from BC (b and c have different type)
  isBC(bcOrBc3);

  const isBCorBC3 = isExact<BC | typeof bc3>();

  // has the same structure
  isBCorBC3(bcOrBc3);
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
  let numericLiteral2 = 10 as 10;
  const number = 10 as number;
  let number2 = 10;
  let number3: number | undefined = 10;
  const maybeNumber = 10 as MaybeNumber;
  const maybeNumber2 = 10 as number | undefined;
  let maybeNumber3 = Math.random() > 0.5 ? 10 : undefined;

  const isNumber = isExact<number>();
  const isMaybeNumber = isExact<MaybeNumber>();
  const isMaybeNumber2 = isExact<number | undefined>();

  // @ts-expect-error has different type from number (numeric literal type)
  isNumber(numericLiteral);
  // @ts-expect-error has different type from number (numeric literal type)
  isNumber(numericLiteral2);
  isNumber(number);
  isNumber(number2);
  isNumber(number3);
  // @ts-expect-error has different type from number (excessive `undefined` union element)
  isNumber(maybeNumber);
  // @ts-expect-error has different type from number (excessive `undefined` union element)
  isNumber(maybeNumber2);
  // @ts-expect-error has different type from number (excessive `undefined` union element)
  isNumber(maybeNumber3);

  // @ts-expect-error has different type from MaybeNumber (numeric literal type)
  isMaybeNumber(numericLiteral);
  // @ts-expect-error has different type from MaybeNumber (numeric literal type)
  isMaybeNumber(numericLiteral2);
  isMaybeNumber(maybeNumber);
  isMaybeNumber(maybeNumber2);
  isMaybeNumber(maybeNumber3);
  // @ts-expect-error has different type from MaybeNumber (missing `undefined` union element)
  isMaybeNumber(number);
  // @ts-expect-error has different type from MaybeNumber (missing `undefined` union element)
  isMaybeNumber(number2);
  // @ts-expect-error has different type from MaybeNumber (missing `undefined` union element)
  isMaybeNumber(number3);

  // @ts-expect-error has different type from MaybeNumber (numeric literal type)
  isMaybeNumber2(numericLiteral);
  // @ts-expect-error has different type from MaybeNumber (numeric literal type)
  isMaybeNumber2(numericLiteral2);
  isMaybeNumber2(maybeNumber);
  isMaybeNumber2(maybeNumber2);
  isMaybeNumber2(maybeNumber3);
  // @ts-expect-error has different type from MaybeNumber (missing `undefined` union element)
  isMaybeNumber2(number);
  // @ts-expect-error has different type from MaybeNumber (missing `undefined` union element)
  isMaybeNumber2(number2);
  // @ts-expect-error has different type from MaybeNumber (missing `undefined` union element)
  isMaybeNumber2(number3);
}
