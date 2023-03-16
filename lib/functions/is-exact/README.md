`isExact<Expected>()(actual)` matches runtime function, which validates that type of `actual` equals to `Expected`

```ts
interface Dog {
  name: string;
  bark: () => void;
}

interface Cat {
  name: string;
  meow: () => void;
}

const isCat = isExact<Cat>();
```

It validates equality of types, otherwise TypeScript shows an error

```ts
declare const dog: Dog;
declare const cat: Cat;

// error: Argument of type 'Dog' is not assignable to parameter of type 'never'.
isCat(dog);
//    ^^^

isCat(cat);
```

⚠️ Limitations:

- It has to be a curried function
- Supported types depend on [`Exact`](../../exact) implementation
