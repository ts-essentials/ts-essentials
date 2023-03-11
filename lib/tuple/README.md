`Tuple<Type?>` matches type constraint for tuple with elements of type `Type`

Parameter isn't required (default to `any`) in `Tuple`, but it can be parameterised with a type `Type` to constraint it
to a specified type (e.g. `number`):

```ts
type NumberTuple = Tuple<number>;

const digits: NumberTuple = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// error: Type 'string' is not assignable to type 'number'
const first3letters: NumberTuple = ["a", "b", "c"];
//                                  ^^^
```

It's handy to use `Tuple` without `Type` as generic type in a function to convert array to a tuple

```ts
const asTuple = <Type extends Tuple>(args: Type): Type => args;

const name = asTuple(["<first name>", "<last name>"]);
//    ^? [string, string]
```

TS Playground – https://tsplay.dev/W4jgKN
