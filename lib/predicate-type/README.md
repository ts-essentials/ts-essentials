`PredicateType<Type>` constructs a type which equals to narrowed type in predicate function `Type`

```ts
const isTruthy = <Type>(value: Type): value is NonNullable<Type> => Boolean(value);

type Truthy<Type> = PredicateType<typeof isTruthy<Type>>

type BooleanType = Truthy<boolean | null>;
//   ^? boolean
```

It works as [`ReturnType<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype), but
will return narrowed type in
[type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

In the example above, `Truthy<Type>` equals to `NonNullable<Type>`

It's handy to chain guards to narrow broader types

```ts
const isEachElementOf = <Type extends PredicateFunction>(
  thing: unknown,
  elementPredicate: Type,
): thing is Array<PredicateType<Type>> => {
  return Array.isArray(thing) && thing.every(elementPredicate);
};

const array = [1, 2, 3] as unknown[];
//    ^? unknown[]

if (isEachElementOf(array, isNumber)) {
  array;
  // ^? number[]
}
```

TS Playground – https://tsplay.dev/NV3Bnm
