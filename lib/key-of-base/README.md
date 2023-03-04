`KeyofBase` is a [`keyofStringsOnly`](https://www.typescriptlang.org/tsconfig#keyofStringsOnly)-tolerant analogue for
`PropertyKey`

With `keyofStringsOnly` disabled:

```ts
import { KeyofBase } from "ts-essentials";
//      ^? string | number | symbol

type BuiltinKeys = PropertyKey;
//   ^? string | number | symbol
```

With `keyofStringsOnly` enabled:

```ts
import { KeyofBase } from "ts-essentials";
//      ^? string

type BuiltinKeys = PropertyKey;
//   ^? string | number | symbol
```

It's recommended to use `KeyofBase` since TypeScript 2.9.2
– https://devblogs.microsoft.com/typescript/announcing-typescript-2-9-2/#support-for-symbols-and-numeric-literals-in-keyof-and-mapped-object-types

`keyofStringsOnly` is deprecated since TypeScript 5.0
– https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#deprecations-and-default-changes

TS Playground:

- disabled `keyofStringsOnly` – https://tsplay.dev/NBJ9dN
- enabled `keyofStringsOnly` – https://tsplay.dev/mbEb2N
