`ArrayOrSingle<Type>` matches `Type` or `Type[]`

```ts
type NumberOrNumberArray = ArrayOrSingle<number>;

let numberOrNumberArray: NumberOrNumberArray;

numberOrNumberArray = 1;
numberOrNumberArray = [1, 2, 3, 4];
// error: Type 'string' is not assignable to type 'NumberOrNumberArray'
numberOrNumberArray = "5";
// ^^^^^^^^^^^^^^^^
```

It's handy to use it in functions where data can be passed as a value or an array

```ts
const castArray = <Type>(value: ArrayOrSingle<Type>): Type[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
};

const numbers = castArray(1);
//    ^? number[]
const strings = castArray(["a", "b", "c"]);
//    ^? string[]
```

TS Playground – https://tsplay.dev/m0YJRW
