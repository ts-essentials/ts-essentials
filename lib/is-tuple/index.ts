export type IsTuple<Type> = Type extends any[] ? (any[] extends Type ? never : Type) : never;
