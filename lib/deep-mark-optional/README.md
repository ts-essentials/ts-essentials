`DeepMarkOptional<Type, KeyPathUnion>` constructs a type by picking all properties from type `Type` where
  properties by paths `KeyPathUnion` are set as optional

```ts
type Teacher = { address: { postcode: string; city: string } };

type TeacherWithPostcode = DeepMarkOptional<Teacher, 'address' | 'address.city'>;
//   ^? { address?: { postcode: string; city?: string } }

const teacherFromCamden: TeacherWithPostcode = {address: {postcode: 'NW1'}};

type TeacherWithCityAddress = DeepMarkOptional<Teacher, 'address' | 'address.postcode'>;
//   ^? { address?: { postcode?: string; city: string } }

const teacherFromLondon: TeacherWithCityAddress = {address: {city: 'London'}};
```

Useful when particular part of deep required object type is optional for business logic

TS Playground – https://tsplay.dev/m0kRGN
