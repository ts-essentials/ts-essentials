import { IsTuple } from "../is-tuple";

type Join<TKey, TPath> = TKey extends string | number
  ? TPath extends string | number
    ? `${TKey}${"" extends TPath ? "" : "."}${TPath}`
    : never
  : never;

type PreviousIndexMapping = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

type TupleKeys<TTuple extends readonly any[]> = Exclude<keyof TTuple, keyof any[]>;

type Paths<Type, TDepth extends number = 10> = [TDepth] extends [never]
  ? never
  : Type extends Array<infer Values>
  ? Type extends IsTuple<Type>
    ? {
        [TKey in TupleKeys<Type>]-?: TKey extends string | number
          ? `${TKey}` | Join<TKey, Paths<Type[TKey], PreviousIndexMapping[TDepth]>>
          : never;
      }[TupleKeys<Type>]
    : `${number}` | Join<`${number}`, Paths<Values, PreviousIndexMapping[TDepth]>>
  : Type extends object
  ? {
      [TKey in keyof Type]-?: TKey extends string | number
        ? `${TKey}` | Join<TKey, Paths<Type[TKey], PreviousIndexMapping[TDepth]>>
        : never;
    }[keyof Type]
  : "";

export { Paths };
