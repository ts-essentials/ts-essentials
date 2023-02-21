`OmitProperties<Type, Value>` constructs a type by picking all properties from type `Type` and removing those properties
which values equal to `Value`

```ts
interface UserInformation {
  birthday: Date;
  email: string;
  id: string;
  name: string;
  happyBirthday: () => void;
  hello: () => void;
}

type UserFields = OmitProperties<UserInformation, Function>;
//   ^? { birthday: Date; email: string; id: string; name: string; }
```

`Value` can also be a union type

```ts
type UserActions = OmitProperties<UserInformation, Date | Primitive>;
//   ^? { happyBirthday: () => void; hello: () => void; }
```

TS Playground – https://tsplay.dev/m3xVqW
