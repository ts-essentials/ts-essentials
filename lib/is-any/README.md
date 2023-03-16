`IsAny<Type>` returns `true` when type `Type` is `any`. Otherwise returns `false`

```ts
type IsNeverAny = IsAny<never>;
//   ^? false
type IsAnyAny = IsAny<any>;
//   ^? true
type IsUnknownAny = IsAny<unknown>;
//   ^? false
```

TS Playground – https://tsplay.dev/WG4KKw
