`SafeDictionary<Type, Keys?>` constructs an optional object type which property keys are `Keys` (`string` by default)
and which property values are `Type`

Like [`Partial<Record<Keys, Type>>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type),
but can be used with only one argument:

```ts
const abbreviations: SafeDictionary<string> = {
  afaik: "as far as I know",
  afk: "away from keyboard",
};
```

It ensures type safety of index access:

```ts
const { til } = abbreviations;
//      ^? string | undefined
```

It also doesn't enforce key exhaustiveness:

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: SafeDictionary<CatInfo, CatName> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  // 'mordred' key is not specified and there is no TS error
};
```

TS Playground – https://tsplay.dev/WJ7eZw
