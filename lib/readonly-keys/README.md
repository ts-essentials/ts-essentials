`ReadonlyKeys<Type>` constructs a union type by picking all `readonly` properties of object type `Type`

```ts
interface UserThatCannotChangeEmailAndName {
  id: number;
  readonly email: string;
  readonly name: string;
}

type PropertiesThatUserCannotChange = ReadonlyKeys<UserThatCannotChangeEmailAndName>;
//   ^? 'email' | 'name'
```

It means properties which values cannot be reassigned

```ts
declare const user: UserThatCannotChangeEmailAndName;

// error: Cannot assign to 'email' because it is a read-only property
user.email = "new.email@gmail.com";
//   ^^^^^
// error: Cannot assign to 'name' because it is a read-only property
user.name = "Alex";
//   ^^^^
```

TS Playground – https://tsplay.dev/wRBbxw
