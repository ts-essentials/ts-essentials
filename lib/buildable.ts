import { DeepPartial } from "./deep-partial";
import { DeepWritable } from "./deep-writable";

/** Combination of DeepPartial and DeepWritable */
export type Buildable<Type> = DeepPartial<DeepWritable<Type>>;
