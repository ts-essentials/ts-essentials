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
