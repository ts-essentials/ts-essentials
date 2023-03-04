`Opaque<Type, Token>` constructs a unique type which is a subset of `Type` with a specified unique token `Token`

It means that base type cannot be assigned to unique type by accident.

Good examples of opaque types include:

- JWTs or other tokens - these are special kinds of string used for authorization purposes. If your app uses multiple
  types of tokens each should be a separate opaque type to avoid confusion
- Specific currencies - amount of different currencies shouldn't be mixed
- Bitcoin address - special kind of string

```ts
type GithubAccessToken = Opaque<string, "GithubAccessToken">;
type USD = Opaque<number, "USD">;
type PositiveNumber = Opaque<number, "PositiveNumber">;
```

It's recommended to leverage a pattern where you have a function that validates a base type `Type` and create opaque
type:

1. Declare the type (e.g. `PositiveNumber`)

```ts
type PositiveNumber = Opaque<number, "PositiveNumber">;
```

2. Create a function (e.g. `createPositiveNumber`) that returns opaque type and align its behaviour in runtime

```ts
const createPositiveNumber = (n: number): PositiveNumber => {
  if (n <= 0) {
    throw new Error(`Cannot create positive number, ${n} is not positive`);
  }

  return n as PositiveNumber;
};
```

3. When several opaque type are used, assigning one to another shows TS error

```ts
type NegativeNumber = Opaque<number, "NegativeNumber">;

const createNegativeNumber = (n: number): NegativeNumber => {
  if (n >= 0) {
    throw new Error(`Cannot create negative number, ${n} is not negative`);
  }

  return n as NegativeNumber;
};

let positiveNumber = createPositiveNumber(5);
let negativeNumber = createNegativeNumber(-11);

// error: Type 'number & { readonly [__OPAQUE_TYPE__]: "NegativeNumber"; }' is not assignable to type 'number & { readonly [__OPAQUE_TYPE__]: "PositiveNumber"; }'.
//   Type 'number & { readonly [__OPAQUE_TYPE__]: "NegativeNumber"; }' is not assignable to type '{ readonly [__OPAQUE_TYPE__]: "PositiveNumber"; }'.
//     Types of property '[__OPAQUE_TYPE__]' are incompatible.
//       Type '"NegativeNumber"' is not assignable to type '"PositiveNumber"'
positiveNumber = negativeNumber;
// ^^^^^^^^^^^
```

⚠️ Limitations:

- Each `Token` has to be unique across your codebase
- Assignment of values of different opaque types are only limited on build time, but doesn't restrict it in runtime
