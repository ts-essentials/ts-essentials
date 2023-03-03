`CamelCase<Type>` converts type `Type` to camel case (e.g. `camelCase`)

```ts
type OneWordExample = CamelCase<"ONEWORD">;
//   ^? 'oneword'

type TwoWordsExample = CamelCase<"two_words">;
//   ^? 'twoWords'

type ThreeWordsExample = CamelCase<"HERE-THREE-WORDS">;
//   ^? 'hereThreeWords'
```

It supports:

- oneword
- snake_case
- CONSTANT_CASE
- kebab-case
- COBOL-CASE
- camelCase
- PascalCase

TS Playground – https://tsplay.dev/mpjrMw
