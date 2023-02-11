`DeepNullable<Type>` constructs a type by picking all properties from type `Type` recursively and include `null`
property values for all of them

```ts
interface Company {
  name: string;
  employees: { name: string }[];
}

type DeepNullableCompany = DeepNullable<Company>;
//   ^? { name: string | null; employees: { name: string | null }[] }
```

Useful when object type is a source of truth and you need to have nullable object type, meaning property values can be
`null`
