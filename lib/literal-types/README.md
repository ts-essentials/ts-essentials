# Literal types

## CamelCase

`CamelCase` can convert any case to camel case:

- oneword
- snake_case
- CONSTANT_CASE
- kebab-case
- COBOL-CASE
- camelCase
- PascalCase

```typescript
type OneWordExample = CamelCase<"ONEWORD">;
//   ^? 'oneword'

type TwoWordsExample = CamelCase<"two_words">;
//   ^? 'twoWords'

type ThreeWordsExample = CamelCase<"HERE-THREE-WORDS">;
//   ^? 'hereThreeWords'
```

## DeepCamelCaseProperties

Given an object, converts all keys to camel case:

```typescript
type Input = {
  ONEWORD: 1;
  two_words: {
    "HERE-THREE-WORDS": false;
  };
};

type Example = DeepCamelCaseProperties<Input>;
//   ^? { oneword: 1; twoWords: { hereThreeWords: false } }
```
