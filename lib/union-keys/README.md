`UnionKeys<UnionType>` constructs a union type by picking all properties from all union members of `UnionType`

```ts
type AppEvent = 
  | { type: "start"; ms: number }
  | { type: "stop"; reason: string }
  | { type: "report"; crashed: boolean }

type JustType = keyof AppEvent;
//   ^? "type"

type AllKeys = UnionKeys<AppEvent>;
//   ^? "type" | "ms" | "reason" | "crashed"
```

TS Playground - https://tsplay.dev/NVVdBN
