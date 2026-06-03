export type PublicInterface<Type> = { [Key in keyof Type]: Type[Key] };
