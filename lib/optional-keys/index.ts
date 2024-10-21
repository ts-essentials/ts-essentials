export type OptionalKeys<Type> = Type extends unknown
  ? {
      [Key in Exclude<keyof Type, never>]-?: undefined extends { [Key2 in keyof Type]: never }[Key] ? Key : never;
    }[keyof Type]
  : never;
