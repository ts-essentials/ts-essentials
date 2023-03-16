`PickKeys<Type, Value>` constructs a union type by picking all properties of object type `Type` which values are
assignable to type `Value`

```ts
interface StudentWithOptionalName {
  homework: string | undefined;
  name?: string;
  score: number;
}

type NumericStudentProperties = PickKeys<StudentWithOptionalName, number>;
//   ^? 'score'
```

Optional properties are treated as `| undefined` and are included in this case (e.g. property `name`)

```ts
type MaybeStringStudentProperties = PickKeys<StudentWithOptionalName, string | undefined>;
//   ^? 'homework' | 'name'
```

It includes property which values are equal to `Value` or narrower than `Value`

```ts
type AllStudentProperties = PickKeys<StudentWithOptionalName, number | string | undefined>;
//   ^? 'homework' | 'name' | 'score'
```

When there is no property of value equal to `Value` ot narrower than `Value`, it returns `never`

```ts
type NoStudentProperties = PickKeys<StudentWithOptionalName, string>;
//   ^? never
```

TS Playground – https://tsplay.dev/w25ojW
