`StrictExtract<Type, Union>` constructs a type by extracting from `Type` all union members that are assignable to
`Union`

```ts
interface Dog {
  type: "dog";
  woof: () => void;
}

interface Cat {
  type: "cat";
  meow: () => void;
}

interface Mouse {
  type: "mouse";
  squeak: () => void;
}

type Animal = Dog | Cat | Mouse;

type DogAnimal = StrictExtract<Animal, { type: "dog" }>;
//   ^? Dog

type HouseAnimal = StrictExtract<Animal, { type: "dog" } | { type: "cat" }>;
//   ^? Dog | Cat
```

This is stricter version of
[`Extract`](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union), meaning `StrictExtract`
validates that all `Union` union members are assignable to type `Type`

```ts
// error: Type '{ type: "dog"; } | { type: "cat"; } | { type: "horse"; }' does not satisfy the constraint 'Partial<Animal>'.
//   Type '{ type: "horse"; }' is not assignable to type 'Partial<Animal>'.
//     Type '{ type: "horse"; }' is not assignable to type 'Partial<Mouse>'.
//       Types of property 'type' are incompatible.
//         Type '"horse"' is not assignable to type '"mouse"'
type HouseAnimalWithStrictExtract = StrictExtract<Animal, { type: "dog" } | { type: "cat" } | { type: "horse" }>;
//                                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

TS Playground – https://tsplay.dev/mL332N
