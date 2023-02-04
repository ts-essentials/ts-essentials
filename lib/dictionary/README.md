`Dictionary<Type, Keys?>` constructs a required object type which property keys are `Keys` (`string` by default).

Like [`Record<Keys, Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type), but can be
used with only one argument:

```ts
const abbreviations: Dictionary<string> = {
  afaik: "as far as I know",
  afk: "away from keyboard",
};
```

Useful, when all of the keys of a finite type need to be used:

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Dictionary<CatInfo, CatName> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```
