`PathValue<Type, Path>` constructs a path value for type `Type` and path `Path`

```ts
interface Company {
  name: string;
  employees: { name: string }[];
}

type CompanyPaths = PathValue<Company, `employees.0`>;
//   ^? { name: string }
```

It's handy to bind it to JS with small utility function

```ts
function get<Type, Path extends Paths<Type>>(obj: Type, path: `${Path}`): PathValue<Type, Path>;
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
//    ^? { name: string }
const companyEmployeeName = get(company, "employees.0.name");
//    ^? string
```

It supports:

- autocomplete for `Path`
- Arrays/Tuples indices

TS Playground – https://tsplay.dev/NlDAON
