`IsTuple<Type>` returns `Type` when type `Type` is tuple. Otherwise returns `never`

```ts
type IsArrayTuple = IsTuple<number[]>;
//   ^? never
type IsReadonlyArrayTuple = IsTuple<readonly number[]>;
//   ^? never
type IsTupleTuple = IsTuple<[number]>;
//   ^? [number]
```

⚠️ Limitations

- Returns `Type` or `never` instead of `true` or `false` (it will be addressed in
  https://github.com/ts-essentials/ts-essentials/issues/353)
