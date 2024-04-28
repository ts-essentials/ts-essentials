import { PickProperties } from "../pick-properties";

export type PickKeys<Type, Value> = Exclude<keyof PickProperties<Type, Value>, undefined>;
