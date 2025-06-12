export type IsTuple<Type> = Type extends ReadonlyArray<infer Values>
  ? Array<Values> extends Type
    ? never
    : Type
  : never;
