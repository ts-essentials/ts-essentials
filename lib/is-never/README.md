`IsNever<Type>` returns `true` when type `Type` is `never`. Otherwise returns `false`

```ts
type IsNeverNever = IsNever<never>;
//   ^? true
type IsAnyNever = IsNever<any>;
//   ^? false
type IsUnknownNever = IsNever<unknown>;
//   ^? false
```

TS Playground – https://tsplay.dev/weBR1N
