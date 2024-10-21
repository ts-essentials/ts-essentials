export type OptionalKeys<Type> = Type extends object
  ? {
      [Key in keyof Type]-?: undefined extends { [Key2 in keyof Type]: never }[Key] ? Key : never;
    }[keyof Type & (Type extends ReadonlyArray<any> ? number : keyof Type)]
  : never;
