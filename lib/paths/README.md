`Paths<Type>` constructs a union type by picking all possible paths for object type `Type`

```ts
interface Company {
  name: string;
  employees: { name: string }[];
}

type CompanyPaths = Paths<Company>;
//   ^? 'name' | 'employees' | `employees.${number}` | `employees.${number}.name`
```

It supports:

- Arrays
- Object types
- Tuples
- Union types

TS Playground – https://tsplay.dev/mL3BZN
