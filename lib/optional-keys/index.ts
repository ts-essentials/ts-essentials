export type OptionalKeys<Type> = Type extends unknown
  ? {
      [Key in Exclude<keyof Type, never>]-?: undefined extends { [Key2 in keyof Type]: Key2 }[Key] ? Key : never;
    }[keyof Type]
  : never;
