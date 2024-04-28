// TODO: merge to ExtractFromArray
type ExtractFromObject<Obj extends Record<PropertyKey, unknown>, Key> = Key extends keyof Obj
  ? Obj[Key]
  : Key extends keyof NonNullable<Obj>
  ? NonNullable<Obj>[Key] | undefined
  : undefined;

// TODO: merge to ExtractFromObject
type ExtractFromArray<Arr extends readonly any[], Key> = any[] extends Arr
  ? Arr extends readonly (infer T)[]
    ? T | undefined
    : undefined
  : Key extends keyof Arr
  ? Arr[Key]
  : undefined;

type GetWithArray<Type, Path> = Path extends []
  ? Type
  : Path extends [infer Key, ...infer Rest]
  ? Type extends Record<PropertyKey, unknown>
    ? GetWithArray<ExtractFromObject<Type, Key>, Rest>
    : Type extends readonly any[]
    ? GetWithArray<ExtractFromArray<Type, Key>, Rest>
    : undefined
  : never;

type Path<Type> = Type extends `${infer Key}.${infer Rest}`
  ? [Key, ...Path<Rest>]
  : Type extends `${infer Key}`
  ? [Key]
  : [];

export type PathValue<Type, StringPath> = GetWithArray<Type, Path<StringPath>>;
