import { PickKeysByValue } from "./pick-keys-by-value";

/** Pick all properties of given type in object type */
export type PickProperties<Type, Value> = Pick<Type, PickKeysByValue<Type, Value>>;
