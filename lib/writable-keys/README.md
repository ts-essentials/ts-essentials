`WritableKeys<Type>` constructs a union type by picking all writable properties of object type `Type`

```ts
interface UserThatCannotChangeEmail {
  id: number;
  readonly email: string;
  name: string;
}

type PropertiesThatUserCanChange = WritableKeys<UserThatCannotChangeEmail>;
//   ^? 'id' | 'name'
```

It means properties which values can be reassigned

```ts
declare const user: UserThatCannotChangeEmail;

user.id = 1;
user.name = "Alex";
```

TS Playground – https://tsplay.dev/NV3XGm
