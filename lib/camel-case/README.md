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

- COBOL-CASE
- CONSTANT_CASE
- PascalCase
- camelCase
- kebab-case
- oneword
- snake_case

TS Playground – https://tsplay.dev/mpjrMw
