# TS-STL

Typescript Standard Library — all basic Typescript types in one place 🤙

## What's inside?

### Essentials:

`Primitive` type matching all primitive values

### Dictionaries

```typescript
const stringDict: Dictionary<string> = {
  a: "A",
  b: "B",
};

// Use Dictionary type with union string type to make sure to cover all possible values
export type DummyOptions = "open" | "closed" | "unknown";
const dictFromUnionType: Dictionary<number, DummyOptions> = {
  closed: 1,
  open: 2,
  unknown: 3,
};
// and get dictionary values
type stringDictValues = DictionaryValues<typeof stringDict>;
```

### Deep Partial & Deep Readonly

```typescript
type ComplexObject = {
  simple: number;
  nested: {
    a: string;
    array: [{ bar: number }];
  };
};
type ComplexObjectPartial = DeepPartial<ComplexObject>;
const sample: ComplexObjectPartial = {
  nested: {
    array: [{}],
  },
};

type ComplexObjectReadonly = DeepReadonly<ComplexObject>;
```

### Omit

```typescript
type SimplifiedComplexObject = Omit<ComplexObject, "nested">;
```

### Opaque

```typescript
type PositiveNumber = Opaque<number, "positive-number">;

function makePositiveNumber(n: number): PositiveNumber {
  if (n <= 0) {
    throw new Error("Value not positive !!!");
  }
  return (n as any) as PositiveNumber; // this ugly cast is required but only when "producing" opaque types
}
```

### Literal types

```typescript
// prevent type widening https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening
const t = {
  letter: literal("a"), // type stays "a" not string
  digit: literal(5), // type stays 5 not number
};
```

### Exhaustive switch cases in typescript

```typescript
function actOnDummyOptions(options: DummyOptions): string {
  switch (options) {
    case "open":
      return "it's open!";
    case "closed":
      return "it's closed";
    case "unknown":
      return "i have no idea";
    default:
      // if you would add another option to DummyOptions, you'll get error here!
      throw new UnreachableCaseError(options);
  }
}
```
