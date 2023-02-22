export type MarkRequired<Type, Keys extends keyof Type> = Type extends Type
  ? Omit<Type, Keys> & Required<Pick<Type, Keys>>
  : never;
