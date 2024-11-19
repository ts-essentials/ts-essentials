export type MarkRequired<Type, Keys extends keyof Type> = Type extends Type
  ? Type & Required<Omit<Type, Exclude<keyof Type, Keys>>>
  : never;
