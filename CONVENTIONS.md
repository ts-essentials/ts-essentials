# Conventions

The conventions are integral part of the ts-essentials library codebase: they provide a consistent way of development
for both maintainers and engineers that use this library.

## Naming

Consistent naming improves readability and simplifies the maintainability.

Prefixes:

- `Any*` prefix is used for top types for specified subset of types, e.g.
  [`AnyFunction<Args?, ReturnType?>`](./lib/any-function/) for any possible functions,
  [`AnyArray<Type?>`](/lib/any-array) for any type of arrays, etc.
  - ⚠️ [`NonEmptyArray<Type>`](/lib/non-empty-array) doesn't follow this rule and has to be renamed to
    `AnyNonEmptyArray`
- `Deep*` prefix is used when the type changes are applied to the whole structure recursively.
  - If you wonder why [`Buildable<Type>`](./lib/buildable/) doesn't include a prefix, it is because it doesn't have
    direct recursive call
- `Is*` prefix is used when type expects to return `true` or `false`
  - ⚠️ Some types don't follow this convention for performance reasons, e.g. [`IsTuple<Type>`](/lib/is-tuple)
  - ⚠️ [`Exact<Type, Shape>`](/lib/exact) return `Type` or `never` and has to be updated to `IsExact` to match the name
    of respective function called `isExact`
- `Mark*` prefix is used when the partial type changes are applied to a type, e.g. some properties are set to optional
  in [`MarkOptional<Type, Keys>`](/lib/mark-optional)
- `Non*` prefix is used when type expects to return `Type` or `never` (although this is not strict)
  - [`NonNever<Type>`](/lib/non-never) doesn't return `never` so has to be renamed to `OmitNeverProperties`
- `Strict*` prefix is used when the additional generic constraint is applied to a type parameter to constrain its usage,
  e.g. [`StrictOmit<Type, Keys>`](/lib/strict-omit) adds an additional generic constraint for `Keys extends keyof Type`
  so only existing keys within `Type` are passed to this utility type.
  - ⚠️ Inevitably all `Strict*` types lack the support of generic types for the first type parameter `Type` because
    generic constraints rely on a structure of `Type` which cannot be inferred at declaration. To mitigate it, please
    use non-`Strict*` analogue of a utility type.

Body:

- `*Or*` is used for top types for 2 types, e.g. [`AsyncOrSync<Type>`](/lib/async-or-sync) for either asynchronous type
  (i.e. `PromiseLike`) or a synchronous type.
  - [`AsyncOrSyncType<Type>`](/lib/async-or-sync-type) is an exception because it serves to unwrap `Type` in
    `AsyncOrSync<Type>`.

Suffices:

- `*Keys` suffix is used when the names of the properties (i.e. the keys) are returned or manipulated
- `*Properties` suffix is used when the values of the properties (or simply properties) are returned or manipulated
  - [`NonNever<Type>`](/lib/non-never) updates properties so has to be renamed to `OmitNeverProperties`
