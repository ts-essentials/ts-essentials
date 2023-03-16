`ElementOf<Type>` constructs a type which equals to array element type for type `Type`

```ts
const array = [false, 1, "2"];
const tuple = asTuple(["<first name>", "<last name>"]);

type ArrayElement = ElementOf<typeof array>;
//   ^? string | number | boolean
type TupleElement = ElementOf<typeof tuple>;
//   ^? string
```

TS Playground – https://tsplay.dev/NDejlm
