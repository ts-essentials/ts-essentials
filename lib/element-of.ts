/** Easily extract the type of a given array's elements */
export type ElementOf<Type extends readonly any[]> = Type extends readonly (infer Values)[] ? Values : never;
