`createFactoryWithConstraint<Constraint>()(value)` matches runtime function, which validates that type of `value`
matches `Constraint` without changing resulting type of `value`

```ts
type NumericDictionary = Dictionary<number>;

const createNumericDictionary = createFactoryWithConstraint<NumericDictionary>();

const numericDictionary = createNumericDictionary({ input: 10, output: 100 });
//    ^? { input: number; output: number }

// error: Type 'string' is not assignable to type 'number'
const stringDictionary = createNumericDictionary({ input: "Mike", output: "Hello, Mike" });
//                                                 ^^^^^          ^^^^^^
```

It is a ponyfill for
[`satisfies` operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator),
it's available since TypeScript 4.9

```ts
const anotherNumericDictionary = { input: 10, output: 100 } satisfies NumericDictionary;
//    ^? { input: number; output: number }

// error: Type 'string' is not assignable to type 'number'
const anotherStringDictionary = { input: "Mike", output: "Hello, Mike" } satisfies NumericDictionary;
//                                ^^^^^          ^^^^^^
```

⚠️ Limitations:

- It has to be a curried function

TS Playground – https://tsplay.dev/wRBD7w
