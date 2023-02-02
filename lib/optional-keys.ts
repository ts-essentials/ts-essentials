/** Gets keys of an object which are optional */
export type OptionalKeys<Type> = Type extends unknown
  ? {
      [Key in keyof Type]-?: undefined extends { [Key2 in keyof Type]: Key2 }[Key] ? Key : never;
    }[keyof Type]
  : never;
