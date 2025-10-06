import { UnionToIntersection } from "../union-to-intersection";

// Adopted a workaround by som-sm from type-fest - https://github.com/sindresorhus/type-fest/pull/1009
export type UnionKeys<UnionType> = keyof UnionToIntersection<
  UnionType extends UnionType ? Record<keyof UnionType, never> : never
>;
