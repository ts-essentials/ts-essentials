<p align="center">
  <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/146/toolbox_1f9f0.png" width="120" alt="TypeStrict">
  <h3 align="center">ts-essentials</h3>
  <p align="center">All essential TypeScript types in one place 🤙</p>
  <p align="center">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/ts-essentials.svg">
    <img alt="Build status" src="https://circleci.com/gh/krzkaczor/ts-essentials.svg?style=svg">
    <a href="/package.json"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
  </p>
</p>

## Install

```sh
npm add --save-dev ts-essentials
```

or

```sh
yarn add --dev ts-essentials
```

## What's inside?

- [Basic](#basic)
  - Primitive
- [Dictionaries](#dictionaries)
  - Dictionary
  - DictionaryValues
- [Deep Partial & DeepRequired & Deep Readonly](#deep-partial--deep-required--deep-readonly)
- [Writable & DeepWritable](#writable)
- [Omit](#omit)
- [OmitProperties](#omitproperties)
- [NonNever](#nonnever)
- [Merge](#merge)
- [UnionToIntersection](#uniontointersection)
- [Opaque types](#opaque-types)
- [Tuple constraint](#tuple-constraint)
- [Literal types](#literal-types)
- [Exhaustive switch cases](#exhaustive-switch-cases)
- [ValueOf](#valueof-type)
- [AsyncOrSync](#asyncorsync-type)

### Basic:

- `Primitive` type matching all primitive values.

### Dictionaries

```typescript
const stringDict: Dictionary<string> = {
  a: "A",
  b: "B",
};

// Specify second type argument to change dictionary keys type
const dictOfNumbers: Dictionary<string, number> = {
  420: "four twenty",
  1337: "HAX",
};

// You may specify union types as key to cover all possible cases. It acts the same as Record from TS's standard library
export type DummyOptions = "open" | "closed" | "unknown";
const dictFromUnionType: Dictionary<number, DummyOptions> = {
  closed: 1,
  open: 2,
  unknown: 3,
};

// and get dictionary values
type stringDictValues = DictionaryValues<typeof stringDict>;
// Result: string
```

### Deep Partial & Deep Required & Deep Readonly

```typescript
type ComplexObject = {
  simple: number;
  nested: {
    a: string;
    array: [{ bar: number }];
  };
};

type ComplexObjectPartial = DeepPartial<ComplexObject>;
const samplePartial: ComplexObjectPartial = {
  nested: {
    array: [{}],
  },
};

type ComplexObjectAgain = DeepRequired<ComplexObjectPartial>;
const sampleRequired: ComplexObjectAgain = {
  simple: 5,
  nested: {
    a: "test",
    array: [],
  },
};

type ComplexObjectReadonly = DeepReadonly<ComplexObject>;
```

### Writable

Make all attributes of object writable.

```typescript
type Foo = {
  readonly a: number;
  readonly b: string;
};

const foo: Foo = ({ a: 1, b: "b" }(foo as Writable<typeof foo>).a = 42);
```

```typescript
type Foo = {
  readonly foo: string;
  bar: {
    readonly x: number;
  };
}[];

const test: DeepWritable<Foo> = [
  {
    foo: "a",
    bar: {
      x: 5,
    },
  },
];

// we can freely write to this object
test[0].foo = "b";
test[0].bar.x = 2;
```

### Omit

```typescript
type ComplexObject = {
  simple: number;
  nested: {
    a: string;
    array: [{ bar: number }];
  };
};

type SimplifiedComplexObject = Omit<ComplexObject, "nested">;

// Result:
// {
//  simple: number
// }

// if you want to Omit multiple properties just use union type:
type SimplifiedComplexObject = Omit<ComplexObject, "nested" | "simple">;

// Result:
// { } (empty type)
```

### OmitProperties

Removes all properties extending type `P` in type `T`.

```typescript
interface Example {
  log(): void;
  version: string;
}

type ExampleWithoutMethods = OmitProperties<Example, Function>;

// Result:
// {
//   version: string;
// }

// if you want to Omit multiple properties just use union type like

type ExampleWithoutMethods = OmitProperties<Example, Function | string>;
// Result:
// { } (empty type)

```

### NonNever

Useful for purifying object types. It improves intellisense but also allows for extracting keys satisfying a conditional
type.

```typescript
type GetDefined<TypesMap extends { [key: string]: any }> = keyof NonNever<
  { [T in keyof TypesMap]: TypesMap[T] extends undefined ? never : TypesMap[T] }
>;
```

### Merge

```typescript
type Foo = {
  a: number;
  b: string;
};

type Bar = {
  b: number;
};

const xyz: Merge<Foo, Bar> = { a: 4, b: 2 };
// Result:
// {
//   a: number,
//   b: number,
// }
```

### UnionToIntersection

Useful for converting mapped types with function values to intersection type (so in this case - overloaded function).

```typescript
type Foo = {
  bar: string;
  xyz: number;
};

type Fn = UnionToIntersection<{ [K in keyof Foo]: (type: K, arg: Foo[K]) => any }[keyof Foo]>;
```

### Opaque types

```typescript
type PositiveNumber = Opaque<number, "positive-number">;

function makePositiveNumber(n: number): PositiveNumber {
  if (n <= 0) {
    throw new Error("Value not positive !!!");
  }
  return (n as any) as PositiveNumber; // this ugly cast is required but only when "producing" opaque types
}
```

### Tuple constraint

```typescript
function foo<T extends Tuple>(tuple: T): T {
  return tuple;
}

const ret = foo(["s", 1]);
// return type of [string, number]
```

You can also parametrize `Tuple` type with a type argument to constraint it to certain types, i.e.
`Tuple<string | number>`.

### Literal types

_For TypeScript >= 3.4_: TypeScript 3.4 shipped
[`const` assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html) which are very
similar to our `literal` helper but also make type readonly, you should prefer `as const` construct.

_For TypeScript < 3.4_: this is served as a backport of the [`const` assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html) added since TypeScript 3.4.

```typescript
// prevent type widening https://blog.mariusschulz.com/2017/02/04/typescript-2-1-literal-type-widening
const t = {
  letter: literal("a"), // type stays "a" not string
  digit: literal(5), // type stays 5 not number
};
```

### Exhaustive switch cases

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

### ValueOf type

```typescript
const obj = {
  id: "123e4567-e89b-12d3-a456-426655440000",
  name: "Test object",
  timestamp: 1548768231486,
};

type objKeys = ValueOf<typeof obj>;
// Result: string | number
```

### AsyncOrSync type

Useful as a return type in interfaces or abstract classes with missing implementation

```typescript
interface CiProvider {
  getSHA(): AsyncOrSync<string>;
  // same as
  getSHA(): Promise<string> | string;
}

class Circle implements CiProvider {
  // implementation can use sync version
  getSHA() {
    return "abc";
  }
}

class Travis implements CiProvider {
  // implementation can use async version when needed
  async getSHA() {
    // do async call
    return "def";
  }
}
```

## Contributing

All contributions are welcomed [Read more](./CONTRIBUTING.md)
