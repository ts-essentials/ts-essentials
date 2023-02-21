`Merge<Object1, Object2>` constructs a type by picking all properties from `Object1` and `Object2`

```ts
type SymbolNames = {
  [names: symbol]: symbol;
  name: symbol;
};

type StringNames = {
  [names: string]: string;
  name: string;
};

type Names = Merge<SymbolNames, StringNames>;
//   ^? { [names: symbol]: symbol; [names: string]: string; name: string }
```

It's identical to a spread for objects

```ts
declare const symbolNames: SymbolNames;
declare const stringNames: StringNames;

const names: Names = { ...symbolNames, ...stringNames };
//    ^? Names
```

To infer return type without specifying it, it's handy to have a small utility

```ts
const merge = <Object1, Object2>(obj1: Object1, obj2: Object2): Merge<Object1, Object2> => ({ ...obj1, ...obj2 });
```

It supports:

- index signatures
- property modifiers (optional or readonly property)

TS Playground – https://tsplay.dev/mbE39N
