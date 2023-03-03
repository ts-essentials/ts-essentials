`AnyFunction<Args?, ReturnType?>` matches function type with arguments type `Args` (`any[]` by default) and return type
`ReturnType` (`any` by default)

It's handy to use it in generic constraint with default type `Args` and `ReturnType`

```ts
type FirstParameter<Type extends AnyFunction> = Head<Parameters<Type>>;

type StringValue = FirstParameter<typeof decodeURIComponent>;
//   ^? string
```

`Args` and `ReturnType` can be specified if necessary

```ts
type SumFunction = AnyFunction<[first: number, second: number], number>;

type NumberValue = FirstParameter<SumFunction>;
//   ^? number
```

TS Playground – https://tsplay.dev/mbEM2N
