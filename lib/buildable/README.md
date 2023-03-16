`Buildable<Type>` constructs a type by combining `DeepPartial` and `DeepWritable`, meaning all properties from type
`Type` are recursively set as non-`readonly` and optional, meaning they can be reassigned and aren't required

```ts
interface Company {
  readonly name: string;
  readonly employees: { readonly name: string }[];
}

type BuildableCompany = Buildable<Company>;
//   ^? { name?: string | undefined; employees?: ({ name?: string | undefined } | undefined)[] | undefined }
```

This allows building objects step-by-step by assigning property values in multiple statements:

```ts
declare const company: BuildableCompany;

company.name = "ts-essentials";
company.employees = [];
company.employees.push({ name: "Kris Kaczor" });
```
