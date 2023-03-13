import { Paths } from "../paths";

type UnsafePathValue<Type, TPath> = Type extends any
  ? TPath extends `${infer TKey}.${infer TRest}`
    ? TKey extends keyof Type
      ? Type[TKey] extends infer TValue
        ? UnsafePathValue<TValue, TRest> extends infer CalculatedUnsafePathValue
          ? undefined extends TValue
            ? CalculatedUnsafePathValue | undefined
            : CalculatedUnsafePathValue
          : never
        : never
      : TKey extends `${bigint}`
      ? Type extends readonly (infer TValues)[]
        ? UnsafePathValue<TValues, TRest>
        : never
      : never
    : TPath extends keyof Type
    ? Type[TPath]
    : TPath extends `${bigint}`
    ? Type extends readonly (infer TValues)[]
      ? TValues
      : never
    : never
  : never;

export type PathValue<Type, Path extends Paths<Type>> = UnsafePathValue<Type, Path>;
