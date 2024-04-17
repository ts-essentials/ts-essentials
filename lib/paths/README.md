`Paths<Type>` constructs a union type by picking all possible paths for type `Type`

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
- As a side effect of `number`, float number access for arrays

⚠️ Limitations:

- It doesn't recursively call it on `NonRecursiveType`, i.e. [`Builtin`](/lib/built-in/), `Promise`, `ReadonlyMap` and
  `ReadonlySet`

TS Playground – https://tsplay.dev/mL3BZN
