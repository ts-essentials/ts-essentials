`Head<Type>` constructs a type which equals to first element in type `Type`

```ts
type FirstParameter<Type extends AnyFunction> = Head<Parameters<Type>>;

type StringValue = FirstParameter<typeof decodeURIComponent>;
//   ^? string
```

⚠️ Limitations:

- Returns `never` when type `Type` is `[]` or has `0` length

TS Playground – https://tsplay.dev/Wo8gMw
