`OptionalKeys<Type>` constructs a union type by picking all optional properties of object type `Type`

```ts
interface StudentWithOptionalName {
  homework: string | undefined;
  name?: string;
  score: number;
}

type PropertiesThatStudentDoesNotUsuallyHave = OptionalKeys<StudentWithOptionalName>;
//   ^? 'name'
```

It means we can either set a new value or delete it

```ts
declare const user: StudentWithOptionalName;

user.name = "Alex";
delete user.name;
```

TS Playground – https://tsplay.dev/Wo8ePw
