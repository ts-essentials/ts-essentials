# ts-essentials

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
