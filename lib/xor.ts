/** Mark some properties which only the former including as optional and set the value to never */
type Without<Type1, Type2> = { [P in Exclude<keyof Type1, keyof Type2>]?: never };

/** get the XOR type which could make 2 types exclude each other */
export type XOR<Type1, Type2> = Type1 | Type2 extends object
  ? (Without<Type1, Type2> & Type2) | (Without<Type2, Type1> & Type1)
  : Type1 | Type2;
