`AnyArray<Type?>` matches `Array` or `ReadonlyArray`

```ts
const average = (numbers: AnyArray<number>) => numbers.reduce((sum, n) => sum + n, 0) / numbers.length;

const two = average([1, 2, 3]);
//    ^? number

const three = average([1, 2, 3, 4, 5] as const);
//    ^? number
```

It's handy to use it with default `Type` in generic constraints

```ts
const first = <Type extends AnyArray>(tuple: readonly [...Type]) => tuple[0] as Type[0];

const numbers = [1, 2, 3];

const one = first(numbers);
//    ^? number

const four = first([4, 5, 6]);
//    ^? number

const six = first([6, 7, 8] as const);
//    ^? 6
```

TS Playground – https://tsplay.dev/w25q1W
