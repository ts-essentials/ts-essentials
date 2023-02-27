`RequiredKeys<Type>` constructs a union type by picking all required properties of object type `Type`

```ts
interface StudentWithOptionalName {
  homework: string | undefined;
  name?: string;
  score: number;
}

type PropertiesThatStudentAlwaysHave = RequiredKeys<StudentWithOptionalName>;
//   ^? 'homework' | 'score'
```

TS validates required properties are always specified, otherwise shows an error

```ts
const student: StudentWithOptionalName = {
  homework: undefined,
  score: 0,
};

// error: Property 'homework' is missing in type '{ score: number; }' but required in type 'StudentWithOptionalName'
const studentWithoutHomework: StudentWithOptionalName = {
  //  ^^^^^^^^^^^^^^^^^^^^^^
  score: 0,
};
```

TS Playground – https://tsplay.dev/mq9gdm
