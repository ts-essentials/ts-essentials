`DeepPartial<Type>` constructs a type by picking all properties from type `Type` recursively and setting them as
optional, meaning they aren't required

```ts
interface Company {
  name: string;
  employees: { name: string }[];
}

type DeepPartialCompany = DeepPartial<Company>;
//   ^? { name?: string | undefined; employees?: ({ name?: string | undefined } | undefined)[] | undefined }
```

`DeepPartial` can be used for deep-merge libraries that don't have type coverage:

```ts
import merge from "helpful-merge";
import { DeepPartial } from "ts-essentials";

const deepMerge = <Type>(value: Type, overrides: DeepPartial<Type>): Type => {
  return merge(value, overrides, { deep: true });
};
```

Useful for merging objects with default settings, e.g.:

```ts
const companyDefaults: Company = {
  name: "fill in company name",
  employees: [{ name: "fill in employee name" }],
};

const company = deepMerge(companyDefaults, {
  name: "ts-essentials",
});
```

TS Playground – https://tsplay.dev/WylDbm
