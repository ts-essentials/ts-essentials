`DeepCamelCaseProperties<Type>` constructs a type by picking all properties from type `Type` recursively and converting
all of them to camel case

```ts
type Config = {
  ONEWORD: false;
  many_words: {
    two_words: true;
    "HERE-THREE-WORDS": false;
  };
};

type Example = DeepCamelCaseProperties<Config>;
//   ^? { oneword: false; manyWords: { twoWords: true; hereThreeWords: false } }
```

It supports:

- Object types

TS Playground – https://tsplay.dev/wXOM8W
