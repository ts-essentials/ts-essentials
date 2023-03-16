`XOR<Type1, Type2>` construct a type which is assignable to either type `Type1` or `Type2` but not both

```ts
interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

type Pet = XOR<Dog, Cat>;

let pet: Pet;

pet = { bark };
pet = { meow };
// error: Type '{ bark: () => void; meow: () => void; }' is not assignable to type '(Without<Dog, Cat> & Cat) | (Without<Cat, Dog> & Dog)'.
//   Type '{ bark: () => void; meow: () => void; }' is not assignable to type 'Without<Cat, Dog> & Dog'.
//     Type '{ bark: () => void; meow: () => void; }' is not assignable to type 'Without<Cat, Dog>'.
//       Types of property 'meow' are incompatible.
//         Type '() => void' is not assignable to type 'undefined'
pet = { bark, meow };
//^
```

`pet = { bark, meow };` is permitted when union is used

```ts
type DogOrCat = Dog | Cat;

let dogOrCat: DogOrCat;

dogOrCat = { bark };
dogOrCat = { meow };
dogOrCat = { bark, meow };
```

TS Playground – https://tsplay.dev/NV3Dlm
