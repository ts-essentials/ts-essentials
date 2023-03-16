`PredicateFunction` matches type constraint for type guard, meaning first argument is used in return type and return
type is [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

```ts
const createPredicate = createFactoryWithConstraint<PredicateFunction>();

const isBoolean = createPredicate((value: unknown): value is boolean => typeof value === "boolean");
//    ^? (value: unknown) => value is boolean
```

It's handy to use it with `PredicateType` to chain guards to narrow broader types

```ts
const isEachElementOf = <Type extends PredicateFunction>(
  thing: unknown,
  elementPredicate: Type,
): thing is Array<PredicateType<Type>> => {
  return Array.isArray(thing) && thing.every(elementPredicate);
};

const array = [true, false, true] as unknown[];
//    ^? unknown[]

if (isEachElementOf(array, isBoolean)) {
  array;
  // ^? boolean[]
}
```

TS Playground – https://tsplay.dev/mAJX1W
