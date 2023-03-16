`DeepWritable<Type>` constructs a type by picking all properties from type `Type` recursively and removing `readonly`
modifier, meaning they can be reassigned.

```ts
interface Company {
  readonly name: string;
  readonly employees: { readonly name: string }[];
}

type DeepWritableCompany = DeepWritable<Company>;
//   ^? { name: string; employees: {name: string}[]}
```

Useful when object needs to be mutable, e.g. in tests

```ts
declare const company: DeepWritableCompany;

company.name = "ts-essentials";
company.employees = [];
company.employees[0].name = "Kris Kaczor";
```

TS Playground – https://tsplay.dev/N75yoW
