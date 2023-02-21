import { PickKeysByValue } from "../pick-keys-by-value";

export type PickProperties<Type, Value> = Pick<Type, PickKeysByValue<Type, Value>>;
