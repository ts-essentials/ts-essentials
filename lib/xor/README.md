`XOR<Type1, Type2, Type3?, ..., Type50?>` construct a type which is assignable to either type `Type1` or `Type2` but not
both.

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

Starting in ts-essentials@10, it supports up to 50 generic types, e.g.

```ts
type SinglePet = XOR<
  { cat: string },
  { dog: string },
  { parrot: string },
  { fish: string },
  { rabbit: string },
  { turtle: string },
  { guineaPig: string },
  { hamster: string }
>;

let singlePet: SinglePet;
singlePet = { cat: "Timofey" };
singlePet = { dog: "Sirius" };
// Type '{ cat: string; dog: string; }' is not assignable to type 'XOR<{ cat: string; }, { dog: string; }, { parrot: string; }, { fish: string; }, { rabbit: string; }, { turtle: string; }, { guineaPig: string; }, { hamster: string; }, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, ... 26 more .....'.
//  Type '{ cat: string; dog: string; }' is not assignable to type '{ dog?: undefined; parrot?: undefined; fish?: undefined; rabbit?: undefined; turtle?: undefined; guineaPig?: undefined; hamster?: undefined; cat?: undefined; }'.
//    Types of property 'dog' are incompatible.
//      Type 'string' is not assignable to type 'undefined'
singlePet = { cat: "Timofey", dog: "Sirius" };
```

TS Playground – https://tsplay.dev/wRb51w

> [!NOTE]  
> XOR utility type didn't infer the correct types in functions parameters for TypeScript
> versions between 4.7.x and 4.8.x. For more details, see [test/xor.function-parameters.ts](../../test/xor.function-parameters.ts) [scripts/update-test-tsconfig.js](../../scripts/update-test-tsconfig.js)
