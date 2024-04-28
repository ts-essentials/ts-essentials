`Exact<Type, Shape>` returns `Type` when type `Type` and `Shape` are identical. Otherwise returns `never`

```ts
interface Dog {
  name: string;
  bark: () => void;
}

interface Cat {
  name: string;
  meow: () => void;
}

type CatEqualsToDog = Exact<Cat, Dog>;
//   ^? never

type DogEqualsToDog = Exact<Dog, Dog>;
//   ^? Dog
```

It supports:

- Object types

It doesn't support:

- Arrays
- Enums
- Tuples
- Union types with objects
- Union types with primitives

Support is addressed in https://github.com/ts-essentials/ts-essentials/issues/342

TS Playground – https://tsplay.dev/Wo8dlw
