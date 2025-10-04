import { AnyRecord } from "../any-record";
import { IsNever } from "../is-never";

type IsUnion<TUnion> = UnionToTuple<TUnion>["length"] extends 1 ? false : true;

type UnionToFunctionInsertion<TUnion> = (TUnion extends any ? (arg: () => TUnion) => any : never) extends (
  arg: infer TParam,
) => any
  ? TParam
  : never;

// NOTE: When replacing the utility type with `UnionToTuple` from `../union-to-tuple`,
// `isBC(bcOrBc3)` fails because `isBC` allows `BC | {readonly b: 2;readonly c: 3;}` as parameter???
type UnionToTuple<TUnion> = UnionToFunctionInsertion<TUnion> extends () => infer TReturnType
  ? [...UnionToTuple<Exclude<TUnion, TReturnType>>, TReturnType]
  : [];

type ExactUnionLength<TValue, TShape> = UnionToTuple<TValue>["length"] extends UnionToTuple<TShape>["length"]
  ? true
  : false;

// NOTE: `XOR` cannot be used as it's only handy with objects, not booleans
type BooleanXor<T, U> = T extends true ? (U extends true ? true : false) : U extends false ? true : false;

type BooleanAnd<TTuple> = TTuple extends [infer Head, ...infer Rest]
  ? Head extends true
    ? BooleanAnd<Rest>
    : false
  : TTuple extends []
  ? true
  : false;

type ObjectKeyExact<TValue, TShape> = BooleanAnd<
  [IsNever<Exclude<keyof TValue, keyof TShape>>, IsNever<Exclude<keyof TShape, keyof TValue>>]
>;

type ObjectValueDiff<TValue, TShape> = {
  [TKey in keyof TValue]: Exclude<TValue[TKey], TShape[TKey & keyof TShape]>;
}[keyof TValue];

type ObjectValueExact<TValue, TShape> = BooleanAnd<
  [IsNever<ObjectValueDiff<TValue, TShape>>, IsNever<ObjectValueDiff<TShape, TValue>>]
>;

type ObjectExact<TValue, TShape> = [TValue] extends [TShape]
  ? BooleanAnd<
      [
        BooleanXor<IsUnion<TValue>, IsUnion<TShape>>,
        ExactUnionLength<TValue, TShape>,
        ObjectKeyExact<TValue, TShape>,
        ObjectValueExact<TValue, TShape>,
      ]
    > extends true
    ? TValue
    : never
  : never;

type IsArray<TValue> = [TValue] extends [readonly any[]] ? true : false;

type IsReadonly<TArray> = Readonly<TArray> extends TArray ? true : false;

type SameLength<TValue extends readonly any[], TShape extends readonly any[]> = IsNever<
  PrimitiveExact<TValue["length"], TShape["length"]>
> extends true
  ? false
  : true;

type ArrayExact<TValue extends readonly any[], TShape extends readonly any[]> = BooleanAnd<
  [
    // both arrays
    IsArray<TValue>,
    IsArray<TShape>,
    // same length
    SameLength<TValue, TShape>,
    // both readonly or not
    BooleanXor<IsReadonly<TValue>, IsReadonly<TShape>>,
  ]
> extends true
  ? [TValue, TShape] extends [readonly (infer TValueElement)[], readonly (infer TShapeElement)[]]
    ? Exact<TValueElement, TShapeElement> extends TValueElement
      ? TValue
      : never
    : never
  : never;

// NOTE: When replacing the body with `AreNonDistributiveEqual<TValue, TShape> extends true ? TValue : never`,
// `isBCorBC3(bcOrBc3)` fails because `bcOrBc3` is inferred as `BC`???
type PrimitiveExact<TValue, TShape> = [TValue] extends [TShape] ? ([TShape] extends [TValue] ? TValue : never) : never;

export type Exact<TValue, TShape> = [TValue] extends [readonly any[]]
  ? [TShape] extends [readonly any[]]
    ? ArrayExact<TValue, TShape>
    : never
  : [TValue] extends [AnyRecord]
  ? ObjectExact<TValue, TShape>
  : PrimitiveExact<TValue, TShape>;
