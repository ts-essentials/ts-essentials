/** Similar to the builtin Exclude, but checks the filter strictly */
export type StrictExclude<UnionType, ExcludedMembers extends UnionType> = Exclude<UnionType, ExcludedMembers>;
