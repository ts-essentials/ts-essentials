`IsUnknown<Type>` returns `true` when type `Type` is `unknown`. Otherwise returns `false`

```ts
type IsNeverUnknown = IsUnknown<never>;
//   ^? false
type IsAnyUnknown = IsUnknown<any>;
//   ^? false
type IsUnknownUnknown = IsUnknown<unknown>;
//   ^? true
```

TS Playground – https://tsplay.dev/wjXA2m
