`Prettify<Type>` flattens type and makes it more readable on the hover in your IDE.

It shows what properties are included in interfaces:

```ts
interface Name {
  first: string;
  second: string;
}

type NameOnly = Name;
//   ^? Name

type FullName = Prettify<Name>;
//   ^? {first: string; second: string}
```

It flattens intersections:

```ts
type Intersection = Name & {
  address: string;
};

type IntersectionOnly = Intersection;
//   ^? Name & {address: string}

type EverythingAboutPerson = Prettify<Intersection>;
//   ^? {first: string; second: string; address: string}
```

TS Playground - https://tsplay.dev/m3d51W
