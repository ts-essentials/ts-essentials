`ReadonlyArrayOrSingle<Type>` matches `Type` or `readonly Type[]`

```ts
type NumberOrNumberReadonlyArray = ReadonlyArrayOrSingle<number>;

let numberOrNumberReadonlyArray: NumberOrNumberReadonlyArray;

numberOrNumberReadonlyArray = 1;
numberOrNumberReadonlyArray = [1, 2, 3, 4];
// error: Type 'string' is not assignable to type 'NumberOrNumberReadonlyArray'
numberOrNumberReadonlyArray = "5";
// ^^^^^^^^^^^^^^^^^^^^^^^^
```

It's handy to use it in functions where data can be passed as a value or an array

```ts
const isReadonlyArray: (value: unknown) => value is readonly any[] = Array.isArray;

const castReadonlyArray = <Type>(value: ReadonlyArrayOrSingle<Type>): readonly Type[] => {
  if (isReadonlyArray(value)) {
    return value;
  }

  return [value];
};

const numbers = castReadonlyArray(1);
//    ^? readonly number[]
const strings = castReadonlyArray(["a", "b", "c"]);
//    ^? readonly string[]
```

TS Playground – https://tsplay.dev/NBJOdN
