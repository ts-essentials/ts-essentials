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
// 'oneword'
type Example1 = CamelCase<"ONEWORD">;
// 'twoWords'
type Example2 = CamelCase<"two_words">;
// 'hereThreeWords'
type Example3 = CamelCase<"HERE-THREE-WORDS">;
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

// { oneword: 1; twoWords: { hereThreeWords: false } }
type Example = DeepCamelCaseProperties<Input>;
```
