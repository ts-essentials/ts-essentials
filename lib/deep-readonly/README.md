`DeepReadonly<Type>` constructs a type by picking all properties from type `Type` recursively and setting `readonly`
modifier, meaning they cannot be reassigned

```ts
interface Company {
  name: string;
  employees: { name: string }[];
}

type DeepReadonlyCompany = DeepReadonly<Company>;
//   ^? {readonly name: string; readonly employees: readonly {readonly name: string}[]}
```

Useful when it's required to expose immutable object

```ts
declare const company: DeepReadonlyCompany;

// Cannot assign to 'name' because it is a read-only property
company.name = "ts-essentials";
// Cannot assign to 'employees' because it is a read-only property
company.employees = [];
// Cannot assign to 'name' because it is a read-only property
company.employees[0].name = "Kris Kaczor";
```

Especially handy to use it in `deepFreeze` function

```ts
function deepFreeze<Type extends object>(obj: Type): DeepReadonly<Type> {
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(obj) as (keyof Type)[];

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = obj[name];

    if ((value && typeof value === "object") || typeof value === "function") {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj) as DeepReadonly<Type>;
}
```

TS Playground – https://tsplay.dev/w6x5Em
