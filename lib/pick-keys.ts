import { PickProperties } from "./pick-properties";

/** Gets keys of properties of given type in object type */
export type PickKeys<Type, Value> = Exclude<keyof PickProperties<Type, Value>, undefined>;
