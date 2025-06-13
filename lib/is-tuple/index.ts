import type { IsNever } from "../is-never";

export type IsTuple<Type> = Type extends ReadonlyArray<infer Values>
  ? Array<Values> extends Type
    ? IsNever<keyof Type & `${number}`> extends true
      ? never
      : Type // To handle cases like `[number?, ...number[]]`, because `number[]` extends `[number?, ...number[]]`
    : Type
  : never;
