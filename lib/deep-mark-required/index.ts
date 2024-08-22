import { HasParsablePath } from "../has-parsable-path";
import { MarkRequired } from "../mark-required";
import { Paths } from "../paths";
import { Prettify } from "../prettify";
import { UnionToIntersection } from "../union-to-intersection";

type AreEqual<First, Second> = First extends Second ? (Second extends First ? true : false) : false;

type RecursiveDeepMarkRequiredSinglePath<Type, KeyPath> = KeyPath extends `${infer PropertyKey}.${infer RestKeyPath}`
  ? {
      [Key in keyof Type]: AreEqual<Key, PropertyKey> extends true
        ? Prettify<RecursiveDeepMarkRequiredSinglePath<NonNullable<Type[Key]>, RestKeyPath>>
        : Type[Key];
    }
  : KeyPath extends keyof Type
  ? Prettify<MarkRequired<Type, KeyPath>>
  : Type;

type RecursiveDeepMarkRequired<Accumulator, KeyPaths extends string[]> = KeyPaths extends [
  infer KeyPath,
  ...infer RestKeyPaths
]
  ? RestKeyPaths extends string[]
    ? // Keep all the changes in `Accumulator`
      RecursiveDeepMarkRequired<RecursiveDeepMarkRequiredSinglePath<Accumulator, KeyPath>, RestKeyPaths>
    : never
  : Accumulator;

type LastOfUnion<UnionType> = UnionToIntersection<
  UnionType extends unknown ? (arg: UnionType) => unknown : never
> extends (arg: infer LastUnionElement) => unknown
  ? LastUnionElement
  : never;

/**
 * A solution to 730. UnionToTuple (hard).
 *
 * Please avoid when possible as it may break at any TypeScript version.
 *
 * @see https://github.com/type-challenges/type-challenges/blob/main/questions/00730-hard-union-to-tuple/README.md
 */
type UnionToTuple<UnionType, Accumulator extends string[] = []> = [UnionType] extends [never]
  ? Accumulator
  : LastOfUnion<UnionType> extends infer LastUnionElement
  ? LastUnionElement extends string
    ? UnionToTuple<Exclude<UnionType, LastUnionElement>, [...Accumulator, LastUnionElement]>
    : never
  : never;

export type DeepMarkRequired<Type, KeyPathUnion extends Paths<Type>> = HasParsablePath<Type> extends false
  ? Type
  : RecursiveDeepMarkRequired<NonNullable<Type>, UnionToTuple<KeyPathUnion>>;
