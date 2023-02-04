`DeepRequired<Type>` constructs a type by picking all properties from type `Type` recursively and setting as required

```ts
interface DeepPartialCompany {
  name?: string | undefined;
  employees?: ({ name?: string | undefined } | undefined)[] | undefined;
}

type Company = DeepRequired<DeepPartialCompany>;
//   ^? { name: string; employees: { name: string }[] }
```

Useful when deep partial object type is a source of truth and you need to have required object type

TS Playground – https://tsplay.dev/W4XkOW
