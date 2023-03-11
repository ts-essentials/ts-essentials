`MergeN<Tuple>` constructs a type by merging objects with type `Merge` in tuple `Tuple` recursively

```ts
type SymbolNames = {
  [names: symbol]: symbol;
  name: symbol;
};

type StringNames = {
  [names: string]: string;
  name: string;
};

type Names = MergeN<[SymbolNames, StringNames]>;
//   ^? { [names: symbol]: symbol; [names: string]: string; name: string }
```

To infer return type without specifying it, it's handy to have a small utility:

```ts
const mergeAll = <Tuple extends Record<string, unknown>[]>(...args: [...Tuple]): MergeN<Tuple> => {
  let merged = {} as MergeN<Tuple>;

  for (const obj of args) {
    merged = { ...merged, ...obj };
  }

  return merged;
};

const projectProperties = mergeAll(
  //  ^? { name: string; description: string; license: string }
  { name: "ts-essentials" },
  { description: "All essential TypeScript types in one place" },
  { license: "MIT" },
);
```

It supports:

- index signatures
- property modifiers (optional or readonly property)

TS Playground – https://tsplay.dev/WYLKzm
