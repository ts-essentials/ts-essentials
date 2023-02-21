# Contributing

All contributions to `ts-essentials` are welcomed.

Do you have idea for a new type? Please, first submit github issue (or send me PM) and describe your proposal.

## Adding new types

- [`lib/functions`](lib/functions) — functions that incur _some_ runtime overhead
- Other folders (e.g. [`lib/merge`](lib/merge)) — pure types, with 0 runtime overhead

Please make sure to add:

- Short description of what new type does in [README.md > API](/README.md#api), e.g.

> - [`StrictOmit<Type, Keys>`](/lib/strict-omit) - Constructs a type by picking all properties from `Type` and then
>   removing `Keys`. This is stricter version of
>   [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)

- Documentation with short examples and link to [TS Playground](https://www.typescriptlang.org/play) in
  `lib/<type-name>/README.md`, e.g.

> `StrictOmit<Type, Keys>` constructs a type by picking all properties from `Type` and then removing `Keys`
>
> ```ts
> interface CatInfo {
>   age: number;
>   breed: string;
> }
>
> type CatInfoWithoutBreed = StrictOmit<CatInfo, "breed">;
> //   ^? { age: number }
> ```
>
> This is stricter version of [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-> keys),
> meaning `StrictOmit` validates that properties `Keys` exist in type `Type`
>
> ```ts
> // error: Type '"height"' does not satisfy the constraint 'keyof CatInfo'
> type CatInfoWithoutHeight = StrictOmit<CatInfo, "height">;
>
> // error: Type '"age" | "weight"' does not satisfy the constraint 'keyof CatInfo'
> // Type '"weight"' is not assignable to type 'keyof CatInfo'
> type CatInfoWithoutAgeAndWeight = StrictOmit<CatInfo, "age" | "weight">;
> ```
>
> TS Playground – https://tsplay.dev/N9jPjm

- Tests for new type in `lib/<type-name>.ts`, e.g. [`test/strict-omit.ts`](/test/strict-omit.ts)

When you're done with your changes use `yarn test:fix` to run `prettier` to reformat code and `tsc` to make sure that
there are no compilation errors.

Thanks! 🙏🏻
