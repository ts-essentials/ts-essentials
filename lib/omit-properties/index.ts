import { PickKeysByValue } from "../pick-keys-by-value";

export type OmitProperties<Type, Value> = Omit<Type, PickKeysByValue<Type, Value>>;
