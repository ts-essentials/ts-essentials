# ts-essentials

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
