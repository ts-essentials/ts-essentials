`DeepUndefinable<Type>` constructs a type by picking all properties from type `Type` recursively and include `undefined`
property values for all of them

```ts
interface Company {
  name: string;
  employees: { name: string }[];
}

type DeepUndefinableCompany = DeepUndefinable<Company>;
//   ^? { name: string | undefined; employees: { name: string | undefined }[] }
```

Useful when object type is a source of truth and you need to have object type where property values can be `undefined`

Especially handy when all property values need to be assigned with a value recursively

```ts
const company: DeepUndefinableCompany = {
  // error: Property 'name' is missing in type '{ employees: { name: string; }[]; }' but required in
  // type '{ name: string | undefined; employees: { name: string | undefined; }[]; }'.
  employees: [{ name: "Kris Kaczor" }],
};
```

TS Playground – https://tsplay.dev/N75PEW
