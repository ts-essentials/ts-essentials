`assert(condition, message?)` matches runtime function that helps assert `condition`

```ts
declare const maybeString: string | null;
//            ^? string | null

assert(maybeString);

maybeString;
// ^? string
```

It's handy to use with any builtin predicate (e.g. `typeof`)

```ts
declare const maybeBoolean: boolean | null;
//            ^? boolean | null

assert(typeof maybeBoolean === "boolean");

maybeBoolean;
// ^? boolean
```

and custom predicates

```ts
const isTruthy = <Type>(value: Type): value is NonNullable<Type> => Boolean(value);

declare const maybeNumber: number | null;
//            ^? number | null

assert(isTruthy(maybeNumber));

maybeNumber;
// ^? number
```

When `condition` is falsy, it throws an error with `Assertion Error: ${message}` (message is
`"no additional info provided"` by default)

TS Playground – https://tsplay.dev/NlDZBN
