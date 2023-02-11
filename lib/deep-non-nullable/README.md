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

Useful when object type, where property values can be both `undefined` and `null`, is a source of truth and you need to
have non-nullable object type, where property values cannot be both `undefined` and `null`

TS Playground – https://tsplay.dev/wE75ym
