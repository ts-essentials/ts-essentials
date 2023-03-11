`NonNever<Type>` constructs a type by picking all properties from type `Type` which values don't equal to `never`

```ts
interface Preference {
  sweets: never;
  sour: true;
  salt: never;
  bitter: never;
}

type TruePreference = NonNever<Preference>;
//   ^? { sour: true }
```

It's handy to remove `never` after applying intersection for object types

```ts
interface ValueOfFunction {
  input: string;
  output: number;
}

interface IncrementNumberFunction {
  input: number;
  output: number;
}

type CommonFields = NonNever<ValueOfFunction & IncrementNumberFunction>;
//   ^? { output: number }
```

When discriminated unions are used in the codebase, `NonNever` allows to assign values to all properties of
discriminated unions combined. In certain cases it will be useful

```ts
interface Circle {
  kind: "circle";
  radius: number;
  sideLength?: never;
}

interface Square {
  kind: "square";
  radius?: never;
  sideLength: number;
}

type Shape = Circle | Square;

const createShape = () => {
  const kind = Math.random() > 0.5 ? "circle" : "square";
  const side = Math.floor(Math.random() * 10);

  const shape: NonNever<Shape> = {
    kind,
    radius: kind === "circle" ? side : undefined,
    sideLength: kind === "square" ? side : undefined,
  };

  return shape as Shape;
};
```

TS Playground – https://tsplay.dev/mL3JVN
