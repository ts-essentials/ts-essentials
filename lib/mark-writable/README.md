`MarkWritable<Type, Keys>` constructs a type by picking all properties from type `Type` where properties `Keys` remove
`readonly` modifier, meaning they can be reassigned

```ts
interface ReadonlyUser {
  readonly id: string;
  readonly email: string;
}

type UserThatCanChangeEmail = MarkWritable<ReadonlyUser, "email">;
//   ^? { readonly id: string; email: string }
```

It means the set of properties of the constructed type can be reassigned:

```ts
const cannotUpdateUserEmail = (user: ReadonlyUser) => {
  // Cannot assign to 'email' because it is a read-only property
  user.email = "new.email@gmail.com";
  //   ^^^^^
};

const updateUserEmail = (user: UserThatCanChangeEmail) => {
  user.email = "new.email@gmail.com";
};
```

TS Playground – https://tsplay.dev/wQ2qVN
