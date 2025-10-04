> [!WARNING]
> `DictionaryValues` is deprecated, please use [ValueOf](../value-of/) instead

`DictionaryValues<Type>` unwraps `Dictionary` value type:

```ts
const cats: Dictionary<{ age: number; breed: string }> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

type CatInfo = DictionaryValues<typeof cats>;
//   ^? { age: number; breed: string }
```

TS Playground – https://tsplay.dev/mL5gbW
