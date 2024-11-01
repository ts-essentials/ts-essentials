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
- Wildcard array indices (opt-in)

⚠️ Limitations:

- It doesn't recursively call it on `NonRecursiveType`, i.e. [`Builtin`](/lib/built-in/), `Promise`, `ReadonlyMap` and
  `ReadonlySet`

TS Playground – https://tsplay.dev/mL3BZN

## Configuration

There are 2 configurable options: `depth` and `anyArrayIndexAccessor`

The depth option restricts the depth of the paths lookup.

By default, the depth option is set to `7`. It should cover the
majority of use cases. If by any chance it doesn't fit you, feel free to
increase the value.

```ts
type ReallyDeepType = {a: {b: {c: {d: {e: {f: {g: {h: {i: {j: number}}}}}}}}}};

type StandardPaths = Paths<ReallyDeepType>;

// not enough, I need "j"
const standardPath: StandardPaths = 'a.b.c.d.e.f.g.h';

type DeeperPaths = Paths<ReallyDeepType, { depth: 9 }>;

// Much better now 🥳
const path2: DeeperPaths = 'a.b.c.d.e.f.g.h.i.j';
```

> [!WARNING]  
> The depth increase may increase the chance of getting `Type instantiation is
excessively deep and possibly infinite` error.

The `anyArrayIndexAccessor` option provides a symbol that satisfies any array index if defined.

By default, you may use `0` for arrays and tuples (if such index exists).

```ts
type WildcardCompanyPaths = Paths<Company, { anyArrayIndexAccessor: "*" }>;

const anyEmployee: WildcardCompanyPaths = 'employees.*';
const anyEmployeeName: WildcardCompanyPaths = 'employees.*.name';
```
