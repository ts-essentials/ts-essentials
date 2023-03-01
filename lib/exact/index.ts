export type Exact<Type, Shape> = Type extends Shape
  ? Exclude<keyof Type, keyof Shape> extends never
    ? Type
    : never
  : never;
