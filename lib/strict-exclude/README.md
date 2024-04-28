`StrictExclude<UnionType, ExcludedMembers>` constructs a type by excluding from `UnionType` all union members that are
assignable to `ExcludedMembers`

```ts
type CatName = "miffy" | "boris" | "mordred";

type MiffyAndBoris = StrictExclude<CatName, "mordred">;
//   ^? "miffy" | "boris"
```

This is stricter version of
[`Exclude`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers), meaning
`StrictExclude` validates that all `ExcludedMembers` union members are assignable to type `UnionType`

```ts
// error: Type '"Norris"' does not satisfy the constraint 'CatName'
type NotMrsNorris = StrictExclude<CatName, "Norris">;
//                                         ^^^^^^^^

// error: Type '"mordred" | "Norris"' does not satisfy the constraint 'CatName'.
//   Type '"Norris"' is not assignable to type 'CatName'
type NotMordredOrMrsNorris = StrictExclude<CatName, "mordred" | "Norris">;
//                                                  ^^^^^^^^^^^^^^^^^^^^
```

⚠️ Limitations:

- `StrictExclude` cannot be used when `UnionType` is generic type
  – https://github.com/ts-essentials/ts-essentials/issues/343 (please use `Exclude` instead)

TS Playground – https://tsplay.dev/w6x1Gm
