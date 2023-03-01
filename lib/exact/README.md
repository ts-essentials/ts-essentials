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

TS Playground – https://tsplay.dev/Wo8dlw
