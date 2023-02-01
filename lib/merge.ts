/** Merge 2 types, properties types from the latter override the ones defined on the former type */
export type Merge<Object1, Object2> = Omit<Object1, keyof Object2> & Object2;
