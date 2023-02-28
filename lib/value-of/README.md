`ValueOf<Type>` constructs a type for type `Type` where it equals to:

1. The primitive for a primitive

```ts
type BooleanValue = ValueOf<boolean>;
//   ^? boolean
type StringValue = ValueOf<string>;
//   ^? string
```

2. The array elements for an array

```ts
const array = [false, 1, "2"];
const tuple = asTuple(["<first name>", "<last name>"]);

type ArrayValue = ValueOf<typeof array>;
//   ^? string | number | boolean
type TupleValue = ValueOf<typeof tuple>;
//   ^? string
```

3. The function return type for a function

```ts
const asTuple = <Type extends Tuple>(args: Type): Type => args;
const identity = <Type>(value: Type) => value;

type AsTupleFunctionValue = ValueOf<typeof asTuple>;
//   ^? [any?, ...any[]]
type IdentityFunctionValue = ValueOf<typeof identity>;
//   ^? unknown
```

3. The object property values for objects

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserValue = ValueOf<User>;
//   ^? string | number
```

⚠️ Limitations:

- When function has generic type without a default value type, it returns `unknown` (e.g. `identity`)
- When function has generic type with a default value type, it returns this default value type (e.g. `asTuple`)

TS Playground – https://tsplay.dev/N55YMN
