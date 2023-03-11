import { IsTuple } from "../is-tuple";

type Pathable = string | number;

type Join<TKey extends Pathable, TPath> = TPath extends Pathable
  ? `${TKey}${"" extends TPath ? "" : "."}${TPath}`
  : never;

type PreviousIndexMapping = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

type TupleKeys<TTuple extends readonly any[]> = Exclude<keyof TTuple, keyof any[]>;

type Paths<Type, TDepth extends number = 10> = [TDepth] extends [never]
  ? never
  : Type extends Array<infer Values>
  ? Type extends IsTuple<Type>
    ? {
        [TKey in TupleKeys<Type>]-?: TKey extends Pathable
          ? `${TKey}` | Join<TKey, Paths<Type[TKey], PreviousIndexMapping[TDepth]>>
          : never;
      }[TupleKeys<Type>]
    : `${bigint}` | Join<`${bigint}`, Paths<Values, PreviousIndexMapping[TDepth]>>
  : Type extends object
  ? {
      [TKey in keyof Type]-?: TKey extends Pathable
        ? `${TKey}` | Join<TKey, Paths<Type[TKey], PreviousIndexMapping[TDepth]>>
        : never;
    }[keyof Type]
  : "";

export { Paths };
