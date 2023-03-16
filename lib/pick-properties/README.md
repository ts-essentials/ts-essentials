`PickProperties<Type, Value>` constructs a type by picking all properties from type `Type` which values equal to `Value`

```ts
interface UserInformation {
  birthday: Date;
  email: string;
  id: string;
  name: string;
  happyBirthday: () => void;
  hello: () => void;
}

type UserActions = PickProperties<UserInformation, Function>;
//   ^? { happyBirthday: () => void; hello: () => void; }
```

`Value` can also be a union type

```ts
type UserFields = PickProperties<UserInformation, Date | Primitive>;
//   ^? { birthday: Date; email: string; id: string; name: string; }
```

TS Playground – https://tsplay.dev/wXO1LW
