⚠️ deprecated

`Awaited<Type>` is meant to model operations like `await` in `async` functions, or the `.then()` method on `Promise`s

```ts
type StringType = Awaited<Promise<string>>;
//   ^? string
```

Despite builtin `Awaited`, this implementation doesn't unwrap `Promise`s recursively

```ts
type NumberType = Awaited<Promise<number>>;
//   ^? number

type BooleanOrPromisedNumberType = Awaited<Promise<Promise<number>>>;
//   ^? Promise<number>
```

It gulps down non-`Promise` types

```ts
type AnotherNumberType = Awaited<boolean | Promise<number>>;
//   ^? number

type BooleanOrNumberType = Awaited<Promise<boolean> | Promise<number>>;
//   ^? boolean | number
```

⚠️ Limitations:

- It unwraps `Promise`s on one layer
- It doesn't support non-`Promise` types

TS Playground – https://tsplay.dev/mL3VvN
