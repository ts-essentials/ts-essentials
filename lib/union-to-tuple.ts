// Don't use `UnionToIntersection` because assignable version returns `never` in
// `LastOfUnion` for any union
type NonAssignableUnionToIntersection<Union> = (Union extends any ? (arg: Union) => void : never) extends (
  arg: infer Intersection,
) => void
  ? Intersection
  : never;

type LastOfUnion<UnionType> = NonAssignableUnionToIntersection<
  UnionType extends unknown ? (args: UnionType) => void : never
> extends (args: infer LastUnionElement) => void
  ? LastUnionElement
  : never;

/**
 * A solution to 730. UnionToTuple (hard).
 *
 * Please avoid when possible, the `LastOfUnion` logic may break at any TS
 * version. However, it's acceptable to use `UnionToTuple`, when the logic
 * doesn't rely on the tuple order. For example, `Exact` or `DeepMarkRequired`.
 *
 * @see https://github.com/type-challenges/type-challenges/blob/main/questions/00730-hard-union-to-tuple/README.md
 */
export type UnionToTuple<UnionType, Accumulator extends string[] = []> = [UnionType] extends [never]
  ? Accumulator
  : LastOfUnion<UnionType> extends infer LastUnionElement
  ? LastUnionElement extends string
    ? UnionToTuple<Exclude<UnionType, LastUnionElement>, [...Accumulator, LastUnionElement]>
    : never
  : never;
