`DeepMarkRequired<Type, KeyPathUnion>` constructs a type by picking all properties from type `Type` where
  properties by paths `KeyPathUnion` are set as required

```ts
type Teacher = { address: { postcode: string; city: string } };

type TeacherWithCityAddress = DeepMarkRequired<DeepPartial<Teacher>, 'address' | 'address.city'>;
//   ^? { address: { postcode?: string; city: string } }

const londonTeacher: TeacherWithCityAddress = {address: {city: 'London'}};

type TeacherWithAddress = DeepMarkRequired<DeepPartial<Teacher>, 'address' | 'address.postcode'>;
//   ^? { address: { postcode: string; city?: string } }

const teacherFromCamden: TeacherWithAddress = {address: {postcode: 'NW1'}}
```

Useful when particular part of deep partial object type is required for business logic

TS Playground – https://tsplay.dev/mLdkAm
