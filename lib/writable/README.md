`Writable<Type>` constructs a type with removed `readonly` for all properties of `Type`

```ts
interface ReadonlyUserInformation {
  readonly id: string;
  readonly email: string;
}

type UserInformation = Writable<ReadonlyUserInformation>;
//   ^? { id: string; email: string }
```

It means the properties of the constructed type can be reassigned:

```ts
const cannotUpdateUser = (user: ReadonlyUserInformation) => {
  // Cannot assign to 'id' because it is a read-only property
  user.id = "random-id";
  // Cannot assign to 'email' because it is a read-only property
  user.email = "ts-essentials@gmail.com";
};

const updateUser = (user: UserInformation) => {
  user.id = "random-id";
  user.email = "ts-essentials@gmail.com";
};
```

TS Playground – https://tsplay.dev/mMXxQN
