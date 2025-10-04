import { UnionToIntersection } from "../union-to-intersection";

export type NonUnion<Type> = [Type] extends [UnionToIntersection<Type>] ? Type : never;
