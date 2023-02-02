/** Mark some properties as readonly, leaving others unchanged */
export type MarkReadonly<Type, Keys extends keyof Type> = Type extends Type
  ? Omit<Type, Keys> & Readonly<Pick<Type, Keys>>
  : never;
