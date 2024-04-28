`MarkReadonly<Type, Keys>` constructs a type by picking all properties from type `Type` where properties `Keys` are set
to `readonly`, meaning they cannot be reassigned

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserThatCannotChangeEmail = MarkReadonly<User, "email">;
//   ^? { id: number; name: string; readonly email: string }
```

Useful when in current context a set of properties cannot be reassigned

```ts
declare const user: UserThatCannotChangeEmail;

// error: Cannot assign to 'email' because it is a read-only property
user.email = "new.email@gmail.com";
//   ^^^^^
```

TS Playground – https://tsplay.dev/NaEZ0N
