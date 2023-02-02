/** Mark some properties as optional, leaving others unchanged */
export type MarkOptional<Type, Keys extends keyof Type> = Type extends Type
  ? Omit<Type, Keys> & Partial<Pick<Type, Keys>>
  : never;
