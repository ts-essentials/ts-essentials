`IsExact<Type, Shape>` returns `Type` when type `Type` and `Shape` are identical. Otherwise returns `never`

```ts
interface Dog {
  name: string;
  bark: () => void;
}

interface Cat {
  name: string;
  meow: () => void;
}

type CatEqualsToDog = IsExact<Cat, Dog>;
//   ^? never

type DogEqualsToDog = IsExact<Dog, Dog>;
//   ^? Dog
```

It supports:

- Arrays
- Object types
- Tuples
- Union types with objects
- Union types with primitives

It doesn't support:

- Enums
