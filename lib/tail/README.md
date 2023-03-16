`Tail<Type>` constructs a type which equals to elements but first one in type `Type`

```ts
const tail = <Type extends AnyArray>(tuple: readonly [...Type]) => tuple.slice(1) as Tail<Type>;

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const nonZeroDigits = tail(digits);
//    ^? [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

⚠️ Limitations:

- It returns `never` for readonly arrays and tuples (so use `readonly [...Type]` to workaround this)

TS Playground – https://tsplay.dev/mq9nqm
