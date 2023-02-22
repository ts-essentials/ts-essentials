`Writable<Type>` constructs a type with removed `readonly` for all properties of `Type`

```ts
interface ReadonlyUser {
  readonly id: string;
  readonly email: string;
}

type User = Writable<ReadonlyUser>;
//   ^? { id: string; email: string }
```

It means the properties of the constructed type can be reassigned:

```ts
const cannotUpdateUser = (user: ReadonlyUser) => {
  // Cannot assign to 'id' because it is a read-only property
  user.id = "random-id";
  //   ^^
  // Cannot assign to 'email' because it is a read-only property
  user.email = "new.email@gmail.com";
  //   ^^^^^
};

const updateUser = (user: User) => {
  user.id = "random-id";
  user.email = "new.email@gmail.com";
};
```

TS Playground – https://tsplay.dev/mxjqBw
