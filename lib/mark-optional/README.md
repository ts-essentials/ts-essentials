`MarkOptional<Type, Keys>` constructs a type by picking all properties from type `Type` where properties `Keys` are set
as optional, meaning they aren't required

```ts
interface Student {
  name: string;
  score: number;
}

type StudentWithOptionalName = MarkOptional<Student, "name">;
//   ^? { name?: string; score: number }
```

TS Playground – https://tsplay.dev/W4jQ4N
