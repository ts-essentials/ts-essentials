import { AreNonDistributiveEqual } from "../are-non-distributive-equal";
import { HasParsablePath } from "../has-parsable-path";
import { MarkRequired } from "../mark-required";
import { Paths } from "../paths";
import { Prettify } from "../prettify";
import { UnionToTuple } from "../union-to-tuple";

type RecursiveDeepMarkRequiredSinglePath<Type, KeyPath> = KeyPath extends `${infer PropertyKey}.${infer RestKeyPath}`
  ? {
      [Key in keyof Type]: AreNonDistributiveEqual<Key, PropertyKey> extends true
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

export type DeepMarkRequired<Type, KeyPathUnion extends Paths<Type>> = HasParsablePath<Type> extends false
  ? Type
  : RecursiveDeepMarkRequired<Type, UnionToTuple<KeyPathUnion>>;
