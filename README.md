<p align="center">
  <img src="/logo.png" width="120" alt="ts-essentials">
  <h3 align="center">ts-essentials</h3>
  <p align="center">All essential TypeScript types in one place 🤙</p>
  <p align="center">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/ts-essentials.svg">
    <img alt="Build status" src="https://github.com/krzkaczor/ts-essentials/actions/workflows/ci.yml/badge.svg">
    <a href="/package.json"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
    <img src="https://img.shields.io/badge/all_contributors-32-orange.svg?style=flat-square" alt="All Contributors">
    <a href="https://codechecks.io"><img src="https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true" alt="codechecks.io"></a>
  </p>
</p>

## Install

```sh
npm install --save-dev ts-essentials
```

👉 We require `typescript>=4.1`. If you're looking for support for older TS versions, please have a look at the
[TypeScript dependency table](https://github.com/krzkaczor/ts-essentials/tree/master#TypeScript-dependency-table)

👉 As we really want types to be stricter, we require enabled
[strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks) in your project

If you use any [functions](https://github.com/krzkaczor/ts-essentials/blob/master/lib/functions.ts) you should add
`ts-essentials` to your `dependencies` (`npm install --save ts-essentials`) to avoid runtime errors in production.

## What's inside?

`ts-essentials` is a set of high-quality, useful TypeScript types that make writing type-safe code easier.

- [Install](#Install)
- [What's inside?](#Whats-inside)
  - [Basic](#Basic)
  - [Dictionaries](#Dictionaries)
  - [Type checkers](#type-checkers)
    - `IsUnknown`
    - `IsNever`
    - `IsAny`
  - [Deep\* wrapper types](#Deep-wrapper-types)
    - DeepPartial
    - DeepRequired
    - DeepReadonly
    - DeepNonNullable
    - DeepNullable
    - DeepUndefinable
    - [Difference between `DeepRequired` and `DeepNonNullable`](#difference-between-deeprequired-and-deepnonnullable)
  - [Literal types](https://github.com/krzkaczor/ts-essentials/tree/master/lib/literal-types#literal-types)
    - CamelCase
  - [Writable & DeepWritable](#Writable)
  - [Buildable](#Buildable)
  - [Pick](#Pick)
  - [Omit](#Omit)
  - [StrictOmit](#StrictOmit)
    - [Comparison between `Omit` and `StrictOmit`](#Comparison-between-Omit-and-StrictOmit)
  - [StrictExtract](#StrictExtract)
    - [Comparison between `Extract` and `StrictExtract`](#Comparison-between-Extract-and-StrictExtract)
  - [StrictExclude](#StrictExclude)
    - [Comparison between `Exclude` and `StrictExclude`](#Comparison-between-Exclude-and-StrictExclude)
  - [DeepOmit](#DeepOmit)
  - [DeepPick](#DeepPick)
  - [OmitProperties](#OmitProperties)
  - [PickProperties](#PickProperties)
  - [NonNever](#NonNever)
  - [NonEmptyObject](#NonEmptyObject)
  - [NonEmptyArray](#NonEmptyArray)
  - [Merge](#Merge)
  - [MergeN](#MergeN)
  - [MarkRequired](#MarkRequired)
  - [MarkOptional](#MarkOptional)
  - [MarkReadonly](#MarkReadonly)
  - [MarkWritable](#MarkWritable)
  - [ReadonlyKeys](#ReadonlyKeys)
  - [WritableKeys](#WritableKeys)
  - [OptionalKeys](#OptionalKeys)
  - [RequiredKeys](#RequiredKeys)
  - [PickKeys](#pickkeys)
  - [UnionToIntersection](#UnionToIntersection)
  - [Opaque types](#Opaque-types)
  - [Tuple constraint](#Tuple-constraint)
  - [Exhaustive switch cases](#Exhaustive-switch-cases)
  - [ValueOf type](#ValueOf-type)
  - [ElementOf type](#ElementOf-type)
  - [ArrayOrSingle](#ArrayOrSingle)
  - [AsyncOrSync type](#AsyncOrSync-type)
  - [Awaited type](#awaited-type)
  - [Newable](#newable)
  - [Assertions](#Assertions)
  - [Exact](#Exact)
  - [isExact](#isExact)
  - [XOR](#XOR)
  - [Functional type essentials](#functional-type-essentials)
    - Head
    - Tail
- [TypeScript dependency table](#TypeScript-dependency-table)
- [Contributors](#Contributors)

### Basic

- `Primitive` type matching all primitive values.
- `noop` function that takes any arguments and returns nothing, as a placeholder for e.g. callbacks.

### Dictionaries

_keywords: map_

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
type StringDictionaryValueType = DictionaryValues<typeof stringDict>;
//   ^? string

// When building a map using JS objects consider using SafeDictionary
const safeDict: SafeDictionary<number> = {};
const value: number | undefined = safeDict["foo"];

// With SafeDictionary you don't need to use all of the sub-types of a finite type.
// If you care about the key exhaustiveness, use a regular Dictionary.
type ConfigKeys = "LOGLEVEL" | "PORT" | "DEBUG";
const configSafeDict: SafeDictionary<number, ConfigKeys> = {
  LOGLEVEL: 2,
};
const maybePort: number | undefined = configSafeDict["PORT"];

const configDict: Dictionary<number, ConfigKeys> = {
  LOGLEVEL: 2,
  PORT: 8080,
  DEBUG: 1,
};
const port: number = configDict["PORT"];
```

### Type checkers

- `IsUnknown` checks whether we get `unknown` or not. If so, we get `true`. Otherwise, `false`

```typescript
// ✅ true
type Test1 = IsUnknown<unknown>;
// ❌ false
type Test2 = IsUnknown<{ name: "Alexey" }>;
```

- `IsNever` checks whether we get `never` or not. If so, we get `true`. Otherwise, `false`

```typescript
// ✅ true
type Test1 = IsNever<never>;
// ❌ false
type Test2 = IsNever<{ name: "Alexey" }>;
```

- `IsAny` checks whether we get `any` or not. If so, we get `true`. Otherwise, `false`

```typescript
// ✅ true
type Test1 = IsAny<any>;
// ❌ false
type Test2 = IsAny<{ name: "Alexey" }>;
```

### Deep\* wrapper types

- DeepPartial
- DeepRequired
- DeepReadonly
- DeepNonNullable
- DeepNullable
- DeepUndefinable

_keywords: recursive, nested, optional_

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
    array: [{ bar: 1 }],
  },
};

type ComplexObjectReadonly = DeepReadonly<ComplexObject>;

type ComplexNullableObject = {
  simple: number | null | undefined;
  nested: {
    a: string | null | undefined;
    array: [{ bar: number | null | undefined }] | null | undefined;
  };
};

type ComplexObjectNonNullable = DeepNonNullable<ComplexNullableObject>;
const sampleNonNullable: ComplexObjectNonNullable = {
  simple: 5,
  nested: {
    a: "test",
    array: [{ bar: null }], // Error: Type 'null' is not assignable to type 'number'
  },
};

type ComplexObjectNullable = DeepNullable<ComplexObject>;
const sampleDeepNullable1: ComplexObjectNullable = {
  simple: null,
  nested: {
    a: null,
    array: [{ bar: null }],
  },
};
const sampleDeepNullable2: ComplexObjectNullable = {
  simple: 1,
  nested: {
    array: [null], // OK
    // error -- property `a` missing, should be `number | null`
  },
};

// DeepUndefinable will come in handy if:
//  - you want to explicitly assign values to all of the properties
//  AND
//  - the expression used for the assignment can return an `undefined` value
// In most situations DeepPartial will suffice.
declare function tryGet(name: string): string | undefined;
type ComplexObjectUndefinable = DeepUndefinable<ComplexObject>;
const sampleDeepUndefinable1: ComplexObjectUndefinable = {
  simple: undefined,
  nested: {
    a: tryGet("a-value"),
    array: [{ bar: tryGet("bar-value") }],
  },
};
const sampleDeepUndefinable2: ComplexObjectUndefinable = {
  // error -- property `simple` missing, should be `number | undefined`
  nested: {
    array: [[{ bar: undefined }]],
    // error -- property `a` missing, should be `string | undefined`
  },
};
```

#### Difference between `DeepRequired` and `DeepNonNullable`

`DeepRequired` is closer to `Required` but `DeepNonNullable` on the other hand is closer to `NonNullable`

It means that `DeepRequired` doesn't remove `null` and `undefined` but only makes fields required. On the other hand,
`DeepNonNullable` will only remove `null` and `undefined` but doesn't prohibit the field to be optional.

Let's have a look at the optional nullable field:

```typescript
type Person = {
  name?: string | null | undefined;
};

type NonNullablePerson = DeepNonNullable<Person>;
// { name?: string | undefined; }
type RequiredPerson = DeepRequired<Person>;
// { name: string | null; }
```

Let's have a look at the required nullable field:

```typescript
type FullName = {
  first: string | null | undefined;
};

type NonNullableFullName = DeepNonNullable<FullName>;
// { first: string; }
type RequiredFullName = DeepRequired<FullName>;
// { first: string | null | undefined; }
```

And there's no difference between `DeepNonNullable` and `DeepRequired` if the property is non nullable and required

### Writable

Make all attributes of object writable.

```typescript
type Foo = {
  readonly a: number;
  readonly b: string;
};

const foo: Foo = { a: 1, b: "b" };
(foo as Writable<typeof foo>).a = 42;
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

### Buildable

_keywords: builder_

A combination of both `DeepWritable` and `DeepPartial`. This type allows building an object step-by-step by assigning
values to its attributes in multiple statements.

```typescript
interface ReadonlyObject
  extends Readonly<{
    simple: number;
    nested: Readonly<{
      a: string;
      array: ReadonlyArray<Readonly<{ bar: number }>>;
    }>;
  }> {}

const buildable: Buildable<ReadonlyObject> = {};
buildable.simple = 7;
buildable.nested = {};
buildable.nested.a = "test";
buildable.nested.array = [];
buildable.nested.array.push({ bar: 1 });
const finished = buildable as ReadonlyObject;
```

### Pick

There's no need for own implementation of `Pick`, as it's already strict:

```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
//           ^^^^^^^^^^^^^^^^^

interface Person {
  age: number;
  name: string;
}

// @ts-expect-error: Type '"job"' does not satisfy the constraint 'keyof Person'
type WithJob = Pick<Person, "job">;
//                          ^^^^^
```

### Omit

Our version of `Omit` is renamed to `StrictOmit` in `v3`, since the builtin `Omit` has become part of TypeScript 3.5

### StrictOmit

Usage is similar to the builtin version, but checks the filter type more strictly.

```typescript
type ComplexObject = {
  simple: number;
  nested: {
    a: string;
    array: [{ bar: number }];
  };
};

type SimplifiedComplexObject = StrictOmit<ComplexObject, "nested">;
//   ^? { simple: number }

// if you want to Omit multiple properties just use union type:
type SimplifiedComplexObject = StrictOmit<ComplexObject, "nested" | "simple">;
//   ^? {}
```

#### Comparison between `Omit` and `StrictOmit`

Following the code above, we can compare the behavior of `Omit` and `StrictOmit`.

```typescript
// Type '"simple" | "nested" | "nonexistent"' does not satisfy the constraint '"simple" | "nested"'
// @ts-expect-error: Type '"nonexistent"' is not assignable to type '"simple" | "nested"'
type SimplifiedComplexObjectWithStrictOmit = StrictOmit<ComplexObject, "nested" | "simple" | "nonexistent">;
//                                                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

type SimplifiedComplexObjectWithOmit = Omit<ComplexObject, "nested" | "simple" | "nonexistent">;
//   ^? {}
```

As is shown in the example, `StrictOmit` ensures that no extra key is specified in the filter.

### StrictExtract

Usage is similar to the builtin version, but checks the filter type more strictly.

```typescript
interface Dog {
  type: "dog";
  woof(): void;
}

interface Cat {
  type: "cat";
  meow(): void;
}

interface Mouse {
  type: "mouse";
  squeak(): void;
}

type Animal = Dog | Cat | Mouse;

type DogAnimal = StrictExtract<Animal, { type: "dog" }>;
//   ^? Dog

// if you want to Extract multiple properties just use union type:

// 1. if you use typescript up to version 4.5
type HouseAnimal = StrictExtract<Animal, { type: "dog" | "cat" }>;
//   ^? Cat | Dog

// 2. otherwise use
type HouseAnimal = StrictExtract<Animal, { type: "dog" } | { type: "cat" }>;
//   ^? Cat | Dog
```

#### Comparison between `Extract` and `StrictExtract`

Following the code above, we can compare the behavior of `Extract` and `StrictExtract`.

```typescript
// Type '{ type: "dog"; } | { type: "cat"; } | { type: "horse"; }' does not satisfy the constraint 'Partial<Animal>'
//   Type '{ type: "horse"; }' is not assignable to type 'Partial<Animal>'
//     Type '{ type: "horse"; }' is not assignable to type 'Partial<Mouse>'
//       Types of property 'type' are incompatible
// @ts-expect-error: Type '"horse"' is not assignable to type '"mouse"'.
type HouseAnimalWithStrictExtract = StrictExtract<Animal, { type: "dog" } | { type: "cat" } | { type: "horse" }>;
//                                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// no error
type HouseAnimalWithExtract = Extract<Animal, { type: "dog" } | { type: "cat" } | { type: "horse" }>;
//   ^? Dog | Cat
```

### StrictExclude

Usage is similar to the builtin version, but checks the filter type more strictly.

```typescript
type Animal = "dog" | "cat" | "mouse";

type DogAnimal = StrictExclude<Animal, "dog">;
//   ^? 'cat' | 'mouse'

// if you want to Exclude multiple properties just use union type:
type MouseAnimal = StrictExclude<Animal, "dog" | "cat">;
//   ^? 'mouse'
```

#### Comparison between `Exclude` and `StrictExclude`

Following the code above, we can compare the behavior of `Exclude` and `StrictExclude`.

```typescript
// Type '"dog" | "cat" | "horse"' is not assignable to type '"dog" | "cat" | "mouse"'
// @ts-expect-error: '"horse"' is not assignable to type '"dog" | "cat" | "mouse"'.
type HouseAnimalWithStrictExclude = StrictExclude<Animal, "dog" | "cat" | "horse">;

// no error
type HouseAnimalWithExclude = Exclude<Animal, "dog" | "cat" | "horse">;
```

### DeepOmit

Recursively omit deep properties according to key names.

Here is the `Teacher` interface.

```typescript
interface Teacher {
  name: string;
  gender: string;
  students: { name: string; score: number }[];
}
```

Now suppose you want to omit `gender` property of `Teacher`, and `score` property of `students`. You can achieve this
with a simple type filter.

In the filter, the properties to be omitted completely should be defined as either `never` or `true`. For the properties
you want to partially omit, you should recursively define the sub-properties to be omitted.

```typescript
type TeacherSimple = DeepOmit<
  Teacher,
  {
    gender: never;
    students: {
      score: never;
    }[];
  }
>;
// ^? { name: string; students: { name: string }[] }
```

NOTE

- `DeepOmit` works fine with `Array`s and `Set`s. When applied to a `Map`, the filter is only applied to its value.
- If there exists any property in the filter which is not in the original type, an error will occur.

### DeepPick

Recursively pick deep properties according to key names.

This type works as complementary type to DeepOmit, in the similar way like Exclude and Extract types complement each
other.

The filter syntax is the same as for the DeepPick, so one filter can be used to obtain both DeepPick and DeepOmit types
from it.

The properties to be picked completely should be defined as `never`. For the properties you want to partially pick, you
should recursively define the sub-properties to be picked.

```typescript
interface Teacher {
  name: string;
  gender: string;
  students: { name: string; score: number }[];
}
```

```typescript
type TeacherSimple = DeepPick<
  Teacher,
  {
    gender: never;
    students: {
      score: never;
    }[];
  }
>;
// ^? { gender: string; students: { score: number }[] }
```

### OmitProperties

_keywords: filter, props_

Removes all properties extending type `P` in type `T`. NOTE: it works opposite to filtering.

```typescript
interface Example {
  log(): void;
  version: string;
}

type ExampleWithoutMethods = OmitProperties<Example, Function>;
//   ^? { version: string }

// if you want to Omit multiple properties just use union type like:
type ExampleWithoutMethods = OmitProperties<Example, Function | string>;
//   ^? {}
```

### PickProperties

Pick only properties extending type `P` in type `T`.

```typescript
interface Example {
  log(): void;
  version: string;
  versionNumber: number;
}

type ExampleOnlyMethods = PickProperties<Example, Function>;
//   ^? { log(): void }

// if you want to pick multiple properties just use union type like:
type ExampleOnlyMethodsAndString = PickProperties<Example, Function | string>;
//   ^? { log(): void; version: string }
```

### NonNever

Useful for purifying object types. It improves intellisense but also allows for extracting keys satisfying a conditional
type.

```typescript
type GetDefined<TypesMap extends { [key: string]: any }> = keyof NonNever<{
  [T in keyof TypesMap]: TypesMap[T] extends undefined ? never : TypesMap[T];
}>;
```

### NonEmptyObject

Useful for accepting only objects with keys, great after a filter like OmitProperties or PickProperties.

```typescript
/* return never if the object doesn't have any number value*/
type NumberDictionary<T> = NonEmptyObject<PickProperties<T, number>>;

// return { a: number }
type SomeObject = NumberDictionary<{ a: number; b: string }>;

// return never
type EmptyObject = NumberDictionary<{}>;
```

### NonEmptyArray

Useful for accepting only arrays containing at least one element.

```typescript
// declare function expression type accepting some rest parameters, but at least one element for the rest parameters is required
type FunctionAcceptingRestParameters = (someString: string, ...args: NonEmptyArray<number>) => void;

// declare some non-empty array variables
const okay: NonEmptyArray<number> = [1, 2];
const alsoOkay: NonEmptyArray<number> = [1];
// @ts-expect-error: Type '[]' is not assignable to type 'NonEmptyArray<number>'. Source has 0 element(s) but target requires 1.
const error: NonEmptyArray<number> = [];
```

### Merge

_keywords: override_

```typescript
type Foo = {
  a: number;
  b: string;
};

type Bar = {
  b: number;
};

const xyz: Merge<Foo, Bar> = { a: 4, b: 2 };
//   ^? { a: number; b: number }
```

### MergeN

_keywords: override_

```typescript
type Tuple = [
  {
    a: number;
    b: string;
  },
  {
    b: number;
  },
];

const xyz: MergeN<Tuple> = { a: 4, b: 2 };
//   ^? { a: number; b: number }
```

### MarkRequired

Useful when you're sure some optional properties will be set. A real life example: when selecting an object with its
related entities from an ORM.

```typescript
class User {
  id: number;
  posts?: Post[];
  photos?: Photo[];
}
type UserWithPosts = MarkRequired<User, "posts">;

// example usage with a TypeORM repository -- `posts` are now required, `photos` are still optional
async function getUserWithPosts(id: number): Promise<UserWithPosts> {
  return userRepo.findOneOrFail({ id }, { relations: ["posts"] }) as Promise<UserWithPosts>;
}
```

### MarkOptional

Useful when you want to make some properties optional without creating a separate type.

```typescript
interface User {
  email: string;
  password: string;
}

type UserWithoutPassword = MarkOptional<User, "password">;
//   ^? { email: string; password?: string }
```

### MarkReadonly

Useful when you want to make some properties readonly without creating a separate type.

```typescript
interface User {
  id: number;
  name: string;
}

type UserThatCannotChangeName = MarkReadonly<User, "name">;
//   ^? { id: number; readonly name: string }
```

### MarkWritable

Useful when you want to make some properties writable (or unset `readonly`) without creating a separate type.

```typescript
interface User {
  readonly id: number;
  readonly name: string;
}

type UserThatCanChangeName = MarkWritable<User, "name">;
//   ^? { readonly id: number; name: string }
```

### ReadonlyKeys

Gets keys of an object which are readonly.

```typescript
type T = {
  readonly a: number;
  b: string;
};

type Result = ReadonlyKeys<T>;
//   ^? 'a'
```

### WritableKeys

Gets keys of an object which are writable.

```typescript
type T = {
  readonly a: number;
  b: string;
};

type Result = WritableKeys<T>;
//   ^? 'b'
```

### OptionalKeys

Gets keys of an object which are optional.

```typescript
type T = {
  a: number;
  b?: string;
  c: string | undefined;
  d?: string;
};

type Result = OptionalKeys<T>;
//   ^? 'b' | 'd'
```

### RequiredKeys

Gets keys of an object which are required.

```typescript
type T = {
  a: number;
  b?: string;
  c: string | undefined;
  d?: string;
};

type Result = RequiredKeys<T>;
//   ^? 'a' | 'c'
```

### PickKeys

Gets keys of properties of given type in object type.

```typescript
type T = {
  a: number;
  b?: string;
  c: string | undefined;
  d: string;
};

type Result1 = PickKeys<T, string>;
//   ^? 'd'

type Result2 = PickKeys<T, string | undefined>;
//   ^? 'b' | 'c' | 'd'
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

Opaque types allow you to create unique type that can't be assigned to base type by accident. Good examples of opaque
types include:

- JWTs or other tokens - these are special kinds of string used for authorization purposes. If your app uses multiple
  types of tokens each should be a separate opaque type to avoid confusion.
- specific currencies - amount of different currencies shouldn't be mixed
- bitcoin address - special kind of string

It's **critical** to understand that each token (second argument to `Opaque`) has to be unique across your codebase.

We encourage you to leverage a pattern where you have single function to validate base type and create opaque type.

```typescript
type PositiveNumber = Opaque<number, "PositiveNumber">;
function makePositiveNumber(n: number): PositiveNumber {
  if (n <= 0) {
    throw new Error(`Value ${n} is not positive !`);
  }
  return n as PositiveNumber; // you can cast it directly without unknown and any
}

type NegativeNumber = Opaque<number, "NegativeNumber">;
function makeNegativeNumber(n: number): NegativeNumber {
  if (n >= 0) {
    throw new Error(`Value ${n} is not negative !`);
  }
  return n as NegativeNumber; // you can cast it directly without unknown and any
}

let a = makePositiveNumber(5); // runtime check
let b = makeNegativeNumber(-10); // runtime check

a = b; // error at compile time
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

type ObjectValueType = ValueOf<typeof obj>;
//   ^? string | number
```

### ElementOf type

```typescript
const array = [1, 2, true, false];

type ArrayElementType = ElementOf<typeof array>;
//   ^? number | boolean
```

### ArrayOrSingle

Useful for the functions where data can be passed as a value or an array

```typescript
const castArray = <T extends any>(value: ArrayOrSingle<T>): T[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
};

// number[]
const numbers = castArray(1);
// string[]
const strings = castArray(["a", "b", "c"]);
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

// to get original type use AsyncOrSyncType
AsyncOrSyncType<AsyncOrSync<number>> // return 'number'
```

### Awaited type

Unwrap promised type:

```typescript
Awaited<Promise<number>> // number
```

### Newable

_keywords: constructor, class_

Type useful when working with classes (not their instances).

```typescript
class TestCls {
  constructor(arg1: string) {}
}

const t1: Newable<any> = TestCls;
```

### Assertions

_keywords: invariant_

Simple runtime assertion that narrows involved types using
[assertion functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions).

Note: This function is not purely type level and leaves minimal runtime trace in generated code.

```typescript
const something: string | undefined = "abc" as any;
assert(something, "Something has to be defined!");
// from now on `something` is string, if this wouldn't be a case, assert would throw

const anything = "abc" as any;
assert(anything instanceof String, "anything has to be a string!");
// from now on `anything` is string
```

### PredicateType

_keywords: narrow, guard, validate_

Works just like [`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) but will
return the [predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) associated
with the function instead. This is particularly useful if you need to chain guards to narrow broader types.

```typescript
// Without PredicateType you can never use a set of functions like this together; how can you resolve ???
// You would need a specific instance of isArrayOf for each type you want to narrow
const isArrayOf = (thing: unknown, validator: (...x: any[]) => boolean): thing is ???[] => {
  return Array.isArray(thing) && thing.every(validator);
};

// With PredicateType you can pull the predicate of the validator into the higher level guard
const isArrayOf = <T extends (...x: any[]) => boolean>(
  thing: unknown,
  validator: T,
): thing is Array<PredicateType<T>> => {
  return Array.isArray(thing) && thing.every(validator);
};
```

### Exact

_keywords: same, equals, equality_

`Exact<TYPE, SHAPE>` Checks if `TYPE` is exactly the same as `SHAPE`, if yes than `TYPE` is returned otherwise `never`.

```typescript
type ABC = { a: number; b: number; c: number }
type BC = { b: number; c: number }
type C = { c: number }

Exact<ABC, C> // returns NEVER
Exact<C, C> // returns C
```

### isExact

`isExact<SHAPE>()(value)` is a runtime function that returns (on the type level) value if value is exactly of type
`SHAPE` or `never` otherwise.

```typescript
type ABC = { a: number; b: number; c: number };
type BC = { b: number; c: number };

let abc: ABC = { a: 1, b: 2, c: 3 };
let bc: BC = { b: 2, c: 3 };

// due to TS limitations, `isExact` has to be a curried function
const isBC = isExact<BC>();

isBC(abc); // returns NEVER -- abc has different structure from BC (excessive property a)
isBC(bc); // works fine

// note: that isExact can be used inline too
isExact<BC>()(abc); // returns NEVER
```

### createFactoryWithConstraint

`createFactoryWithConstraint<Constraint>()(value)` is a runtime function that returns (on the type level) value,
narrowed within constraint type `Constraint`, or throws type error otherwise

```typescript
type NumericDictionary = Dictionary<number>;

// due to TS limitations, `createFactoryWithConstraint` has to be a curried function
const createNumericDictionary = createFactoryWithConstraint<NumericDictionary>();

const abNumber = createNumericDictionary({ a: 1, b: 2 });
//    ^? { a: number; b: number }

// @ts-expect-error: Type 'string' is not assignable to type 'number'
createNumericDictionary({ a: "1", b: "2" });
```

### XOR

Gets the XOR (Exclusive-OR) type which could make 2 types exclude each other.

```typescript
type A = { a: string };
type B = { a: number; b: boolean };
type C = { c: number };

let A_XOR_B: XOR<A, B>;
let A_XOR_C: XOR<A, C>;

// fail
A_XOR_B = { a: 0 };
A_XOR_B = { b: true };
A_XOR_B = { a: "", b: true };
A_XOR_C = { a: "", c: 0 }; // would be allowed with `A | C` type

// ok
A_XOR_B = { a: 0, b: true };
A_XOR_B = { a: "" };
A_XOR_C = { c: 0 };
```

### Functional type essentials

`Head` & `Tail`: useful for functional programming, or as building blocks for more complex functional types.

```typescript
function tail<T extends any[]>(array: T): Tail<T> {
  return array.slice(1) as Tail<T>;
}

type FirstParameter<FnT extends (...args: any) => any> = FnT extends (...args: infer ArgsT) => any
  ? Head<ArgsT>
  : never;
```

## TypeScript dependency table

| `ts-essentials` | `typescript` / type of dependency |
| --------------- | --------------------------------- |
| `^8.0.0`        | `^4.1.0` / peer                   |
| `^5.0.0`        | `^3.7.0` / peer                   |
| `^3.0.1`        | `^3.5.0` / peer                   |
| `^1.0.1`        | `^3.2.2` / dev                    |
| `^1.0.0`        | `^3.0.3` / dev                    |

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://twitter.com/krzkaczor"><img src="https://avatars2.githubusercontent.com/u/1814312?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Chris Kaczor</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=krzkaczor" title="Code">💻</a> <a href="#business-krzkaczor" title="Business development">💼</a> <a href="#example-krzkaczor" title="Examples">💡</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=krzkaczor" title="Documentation">📖</a></td>
    <td align="center"><a href="https://scholar.google.com/citations?user=3xZtvpAAAAAJ"><img src="https://avatars3.githubusercontent.com/u/9780746?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Xiao Liang</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=yxliang01" title="Code">💻</a> <a href="#ideas-yxliang01" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=yxliang01" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Andarist"><img src="https://avatars2.githubusercontent.com/u/9800850?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mateusz Burzyński</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=Andarist" title="Code">💻</a> <a href="#ideas-Andarist" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=Andarist" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/macbem"><img src="https://avatars1.githubusercontent.com/u/12464061?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maciej Bembenista</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=macbem" title="Code">💻</a> <a href="#ideas-macbem" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=macbem" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/MichaelTontchev"><img src="https://avatars0.githubusercontent.com/u/12261336?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michael Tontchev</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=MichaelTontchev" title="Code">💻</a> <a href="#ideas-MichaelTontchev" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=MichaelTontchev" title="Documentation">📖</a></td>
    <td align="center"><a href="http://ThomasdH.blogspot.com"><img src="https://avatars0.githubusercontent.com/u/3889750?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thomas den Hollander</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=ThomasdenH" title="Code">💻</a> <a href="#ideas-ThomasdenH" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=ThomasdenH" title="Documentation">📖</a></td>
    <td align="center"><a href="https://twitter.com/esamatti"><img src="https://avatars3.githubusercontent.com/u/225712?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Esa-Matti Suuronen</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=epeli" title="Code">💻</a> <a href="#ideas-epeli" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=epeli" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/IlyaSemenov"><img src="https://avatars1.githubusercontent.com/u/128121?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ilya Semenov</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=IlyaSemenov" title="Code">💻</a> <a href="#ideas-IlyaSemenov" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=IlyaSemenov" title="Documentation">📖</a></td>
    <td align="center"><a href="https://codechecks.io"><img src="https://avatars2.githubusercontent.com/u/46399828?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Code Checks</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/pulls?q=is%3Apr+reviewed-by%3Acodechecks" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.nomiclabs.io"><img src="https://avatars1.githubusercontent.com/u/176499?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patricio Palladino</b></sub></a><br /><a href="#ideas-alcuadrado" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://twitter.com/quezak2"><img src="https://avatars0.githubusercontent.com/u/666206?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Artur Kozak</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=quezak" title="Code">💻</a> <a href="#ideas-quezak" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=quezak" title="Documentation">📖</a> <a href="https://github.com/krzkaczor/ts-essentials/pulls?q=is%3Apr+reviewed-by%3Aquezak" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/lucifer1004"><img src="https://avatars2.githubusercontent.com/u/13583761?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zihua Wu</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=lucifer1004" title="Code">💻</a> <a href="#ideas-lucifer1004" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=lucifer1004" title="Documentation">📖</a></td>
    <td align="center"><a href="http://kevinpeno.com"><img src="https://avatars1.githubusercontent.com/u/343808?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kevin Peno</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=kevinpeno" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/DomParfitt"><img src="https://avatars2.githubusercontent.com/u/11363907?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Dom Parfitt</b></sub></a><br /><a href="#ideas-DomParfitt" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/EduardoRFS"><img src="https://avatars0.githubusercontent.com/u/3393115?v=4?s=100" width="100px;" alt=""/><br /><sub><b>EduardoRFS</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=EduardoRFS" title="Code">💻</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=EduardoRFS" title="Documentation">📖</a></td>
    <td align="center"><a href="https://andydvorak.net/"><img src="https://avatars1.githubusercontent.com/u/409245?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrew C. Dvorak</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=acdvorak" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/a1russell"><img src="https://avatars0.githubusercontent.com/u/241628?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Russell</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=a1russell" title="Code">💻</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=a1russell" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/sz-piotr"><img src="https://avatars2.githubusercontent.com/u/17070569?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Piotr Szlachciak</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=sz-piotr" title="Code">💻</a> <a href="#ideas-sz-piotr" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=sz-piotr" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/mikhailswift"><img src="https://avatars3.githubusercontent.com/u/3218582?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mikhail Swift</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=mikhailswift" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/DevilZh"><img src="https://avatars1.githubusercontent.com/u/10295215?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ryan Zhang</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=DevilZh" title="Code">💻</a> <a href="#ideas-DevilZh" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=DevilZh" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/francesco-borzi/"><img src="https://avatars1.githubusercontent.com/u/75517?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Francesco Borzì</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=FrancescoBorzi" title="Documentation">📖</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=FrancescoBorzi" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/leaumar"><img src="https://avatars2.githubusercontent.com/u/3950300?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Marnick L'Eau</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=leaumar" title="Code">💻</a> <a href="#ideas-leaumar" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=leaumar" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/kubk"><img src="https://avatars1.githubusercontent.com/u/22447849?v=4?s=100" width="100px;" alt=""/><br /><sub><b>kubk</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=kubk" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bbarry"><img src="https://avatars0.githubusercontent.com/u/84951?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Bill Barry</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=bbarry" title="Code">💻</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=bbarry" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/akwodkiewicz"><img src="https://avatars2.githubusercontent.com/u/22861194?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Andrzej Wódkiewicz</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=akwodkiewicz" title="Code">💻</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=akwodkiewicz" title="Documentation">📖</a> <a href="#ideas-akwodkiewicz" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://chjdev.com"><img src="https://avatars2.githubusercontent.com/u/973941?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Christian</b></sub></a><br /><a href="#ideas-chjdev" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/mattleff"><img src="https://avatars0.githubusercontent.com/u/120155?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matthew Leffler</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=mattleff" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/studds"><img src="https://avatars2.githubusercontent.com/u/3046407?v=4?s=100" width="100px;" alt=""/><br /><sub><b>studds</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=studds" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Beraliv"><img src="https://avatars.githubusercontent.com/u/2991847?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alex Berezin</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=Beraliv" title="Code">💻</a> <a href="https://github.com/krzkaczor/ts-essentials/commits?author=Beraliv" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/vitonsky"><img src="https://avatars.githubusercontent.com/u/86191922?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vitonsky</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=vitonsky" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/itayronen"><img src="https://avatars.githubusercontent.com/u/21139000?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Itay Ronen</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=itayronen" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cyberbiont"><img src="https://avatars.githubusercontent.com/u/59398323?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Yaroslav Larin</b></sub></a><br /><a href="https://github.com/krzkaczor/ts-essentials/commits?author=cyberbiont" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome! [Read more](./CONTRIBUTING.md)
