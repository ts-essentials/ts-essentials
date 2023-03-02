type Without<Type1, Type2> = { [P in Exclude<keyof Type1, keyof Type2>]?: never };

export type XOR<Type1, Type2> = Type1 | Type2 extends object
  ? (Without<Type1, Type2> & Type2) | (Without<Type2, Type1> & Type1)
  : Type1 | Type2;
