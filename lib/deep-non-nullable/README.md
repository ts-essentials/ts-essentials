`DeepNonNullable<Type>` constructs a type by picking all properties from type `Type` recursively and exclude `null` and
`undefined` property values from all of them

```ts
interface DeepNullableCompany {
  name: string | null | undefined;
  employees: ({ name: string | null | undefined } | null | undefined)[] | null | undefined;
}

type Company = DeepNonNullable<DeepNullableCompany>;
//   ^? { name: string; employees: { name: string }[] }
```

Useful when object type, where property values can be either `undefined` or `null`, is a source of truth and you need to
have non-nullable object type, meaning property values cannot be either `undefined` or `null`

TS Playground – https://tsplay.dev/wE75ym

It's different from `DeepRequired` as it doesn't change optional field:

```ts
interface Person {
  name?: string | null | undefined;
}

type RequiredPerson = DeepRequired<Person>;
//   ^? { name: string | null; }
type NonNullablePerson = DeepNonNullable<Person>;
//   ^? { name?: string | undefined; }
```

TS Playground – https://tsplay.dev/N9jy8m
