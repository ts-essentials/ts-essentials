type StringLiteral<Type> = Type extends string ? (string extends Type ? never : Type) : never;

declare const __OPAQUE_TYPE__: unique symbol;

export type Opaque<Type, Token extends string> = Token extends StringLiteral<Token>
  ? Type & { readonly [__OPAQUE_TYPE__]: Token }
  : never;
