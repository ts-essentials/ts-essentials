export type PickKeysByValue<Type, Value> = { [Key in keyof Type]: Type[Key] extends Value ? Key : never }[keyof Type];

export type PickProperties<Type, Value> = Pick<Type, PickKeysByValue<Type, Value>>;
