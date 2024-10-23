export type OptionalKeys<Type> = Type extends object
  ? {
      [Key in keyof Type]-?: Type extends Required<Pick<Type, Key>> ? never : Key;
    }[keyof Type & (Type extends ReadonlyArray<any> ? number : keyof Type)]
  : never;
