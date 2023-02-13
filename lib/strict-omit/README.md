`StrictOmit<Type, Keys>` constructs a type by picking all properties from `Type` and then removing `Keys`

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatInfoWithoutBreed = StrictOmit<CatInfo, "breed">;
//   ^? { age: number }
```

This is stricter version of [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys),
meaning `StrictOmit` validates that key union type `Keys` exist in type `Type`

```ts
// error: Type '"height"' does not satisfy the constraint 'keyof CatInfo'
type CatInfoWithoutHeight = StrictOmit<CatInfo, "height">;

// error: Type '"age" | "weight"' does not satisfy the constraint 'keyof CatInfo'
// Type '"weight"' is not assignable to type 'keyof CatInfo'
type CatInfoWithoutAgeAndWeight = StrictOmit<CatInfo, "age" | "weight">;
```

TS Playground – https://tsplay.dev/N9jPjm
