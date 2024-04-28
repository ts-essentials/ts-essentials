# ts-essentials

## 9.4.2

### Patch Changes

- f88f757: Add TypeScript 5.3 and 5.4 support (fix a bug with `WeakKey` for `WeakSet` and `WeakMap`)

## 9.4.1

### Patch Changes

- bc3c474: Fix regression in TypeScript 5.1 with CamelCase

## 9.4.0

### Minor Changes

- ddb1bea: Make `typescript` optional as a peer dependency

## 9.3.2

### Patch Changes

- 8761667: `DeepPartial`, `DeepRequired`, `DeepWritable` and `DeepReadonly` can update structure of `Error` or interface
  which extends `Error`
- afccd35: Fix handling of readonly arrays in `isTuple`, `DeepNullable`, `DeepPartial`, and `DeepUndefinable`

## 9.3.1

### Patch Changes

- 0c215b9: Changed the `Tuple`'s type implementation to only use a tuple type (instead of a union of a tuple type and an
  array type).
- 544742e: Fix unique symbol `__OPAQUE_TYPE__` in `Opaque` that cannot be used outside of ts-essentials
- 4c45165: Improve the object constraint for `NonEmptyObject<T>` to not allow primitives
- 66a6169: Improve the `ValueOf` utility type to cover the edge cases

## 9.3.0

### Minor Changes

- a86c5b5: Add `ReadonlyArrayOrSingle` which is a counterpart to `ArrayOrSingle` with the array being readonly
- 14cfa7c: Add utility function `createFactoryWithConstraint`

### Patch Changes

- c63e30e: Refactor `Tail` to use variadic tuple type
- 8a28c53: Fix `DeepReadonly` for a union with an array of itself
- 5989dda: Add union support to all Mark\* methods: `MarkRequired`, `MarkOptional`, `MarkReadonly` and `MarkWritable`
- 8abe8a6: Fix `StrictExtract` usage for TypeScript@^4.6.0

## 9.2.0

### Minor Changes

- 5aa1f26: Add `NonEmptyArray` which ensures an array to have at least one item
- fa03dda: Add `StrictExclude`, a stricter version of `Exclude`
- 6b27ee4: Add `MarkWritable` which unsets readonly for specified keys
- e76a08a: Add `MarkReadonly` which sets readonly for specific keys

### Patch Changes

- 13504d0: Fix `DeepPartial` for normal arrays

## 9.1.2

### Patch Changes

- 08adddd: Remove `postinstall` script

## 9.1.1

### Patch Changes

- bf05a7e: Fix `DeepPick` and `DeepOmit` for project with TypeScript 4.5 or newer
- c338a99: Fix `DeepOmit` and `DeepPick` for WeakMap in TypeScript 4.1 and 4.2

## 9.1.0

### Minor Changes

- a2ac470: Add `IsAny` which returns true if it's `any`, otherwise false
- a2ac470: Add `ArrayOrSingle`
- a2ac470: Add `DeepPick` with the validation of the filter
- a2ac470: Add `CamelCase` and `DeepCamelCaseProperties` for converting it from other cases

### Patch Changes

- a2ac470: Properly infer required fields for set, map, array and promise in `DeepOmit` and `DeepPick`
- a2ac470: Improve `DeepOmit` by removing 4 intersections for objects and applying generic restriction for Filter
- 3541ee9: Replace `PropertyKey` with `KeyofBase` to tolerate `keyofStringsOnly` option in TypeScript
- a2ac470: Adapt `OptionalKeys` and `RequiredKeys` for union of objects

## 9.0.0

### Major Changes

- aa879ca: Use TypeScript@^4.1.0 because of introduced recursive conditional types

### Minor Changes

- e39426b: Add `IsUnknown` which returns true if it's `unknown`, otherwise false
- 6d10f69: Add `IsNever` which returns true if it's `never`, otherwise false
- b580ac1: Add `isExact` function

## 8.1.0

### Minor Changes

- 7bf4fdb: Make `DeepRequired` as recursive `Required` without removing `null` and `undefined`

### Patch Changes

- c463c70: Align `ReadonlySet` and `ReadonlyMap` in `DeepUndefinable` with other sets and maps
- 374431f: Fix `DeepPartial` and `Buildable` for `unknown`
- 83458c0: Align `ReadonlySet` and `ReadonlyMap` in `DeepNullable` with other sets and maps
- 7bf4fdb: Add difference between `DeepRequired` and `DeepNonNullable` in README
- ec8d796: Allow only objects to be used in `StrictOmit`
- f045817: Fix `DictionaryValues` for `SafeDictionary` with number and string literals keys
- ec8d796: `StrictOmit` returns `never` for arrays and tuples

## 8.0.0

### Major Changes

- 239e7e3: Use `typescript@^4.0.0`

### Minor Changes

- ab6f68e: Add `StrictExtract` to check the original structure of type and extract it correctly
- 239e7e3: Add `MergeN`: you can pass tuple of size N and it will recursively apply `Merge`

### Patch Changes

- b39ce66: Improve readme description about what's this project is all about
- 239e7e3: Add `DeepReadonly` support for `unknown` type
- 35e73b6: `IsTuple` now works with any tuple length
- 239e7e3: Update readme description of `Opaque`

## 7.0.3

### Patch Changes

- f917f9b: Refactor Opaque, now `__TYPE__` is not accessible at all
