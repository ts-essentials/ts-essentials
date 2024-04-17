`PathValue<Type, StringPath>` constructs a path value for type `Type` and path `Path`

```ts
interface Company {
  name: string;
  employees: { name: string }[];
}

type CompanyPaths = PathValue<Company, `employees.0`>;
//   ^? { name: string } | undefined
```

It's handy to bind it to JS with small utility function

```ts
function get<Type, StringPath extends string>(obj: Type, path: `${StringPath}`): PathValue<Type, StringPath>;
function get<Type>(obj: Type, path: string) {
  const keys = (path as string).split(".") as (keyof Type)[];

  return keys.reduce((acc, key) => acc?.[key] as unknown as Type, obj);
}
```

It will let you infer property values types

```ts
const companyName = get(company, "name");
//    ^? string
const companyEmployees = get(company, "employees");
//    ^? { name: string }[]
const companyEmployee = get(company, "employees.0");
//    ^? { name: string } | undefined
const companyEmployeeName = get(company, "employees.0.name");
//    ^? string | undefined
```

⚠️ Limitations:

- `StringPath extends Paths<Type>` isn't currently supported and will throw TypeError code T2589:
  `Type instantiation is excessively deep and possibly infinite`

TS Playground – https://tsplay.dev/m3qQjw
