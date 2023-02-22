export type MarkReadonly<Type, Keys extends keyof Type> = Type extends Type
  ? Omit<Type, Keys> & Readonly<Pick<Type, Keys>>
  : never;
