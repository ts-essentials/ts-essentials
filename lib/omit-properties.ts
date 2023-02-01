import { PickKeysByValue } from "./pick-keys-by-value";

/** Omit all properties of given type in object type */
export type OmitProperties<Type, Value> = Omit<Type, PickKeysByValue<Type, Value>>;
