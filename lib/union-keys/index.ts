export type UnionKeys<UnionType> = UnionType extends UnionType ? keyof UnionType : never;
