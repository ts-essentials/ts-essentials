`AsyncOrSyncType<Type>` unwraps `AsyncOrSync` type

```ts
type AsyncOrSyncNumber = AsyncOrSync<number>;

type NumberType = AsyncOrSyncType<AsyncOrSyncNumber>;
//   ^? number
```

TS Playground – https://tsplay.dev/wOLQlN
