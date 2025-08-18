export type Prettify<Type> = Type extends Function
  ? Type
  : {
      [Key in keyof Type]: Type[Key];
    };
