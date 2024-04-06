`StrictDeepOmit<Type, Filter>` constructs a type by picking all properties from type `Type` and removing properties
which values are `never` or `true` in type `Filter`

```ts
interface EnglishClass {
  students: { name: string; score: number }[];
  teacher: {
    name: string;
    yearsOfExperience: number;
  };
  year: number;
}

type AnonymousEnglishClass = StrictDeepOmit<
  // ^? { students: { score: number }[]; teacher: { yearsOfExperience: number }; year: number }
  EnglishClass,
  {
    students: { name: never }[];
    teacher: {
      name: never;
    };
  }
>;
```

It validates that all `Filter` properties exist in type `Type`

```ts
// error: Type '{ id: never; students: { id: never; }[]; teacher: { id: never; }; }' does not satisfy the constraint '{ students?: true | DeepModify<{ name: string; score: number; }[]> | undefined; teacher?: true | { name?: true | undefined; yearsOfExperience?: true | undefined; } | undefined; year?: true | undefined; }'.
//   Types of property 'students' are incompatible.
//     Type '{ id: never; }[]' is not assignable to type 'true | DeepModify<{ name: string; score: number; }[]> | undefined'.
//       Type '{ id: never; }[]' is not assignable to type '(true | { name?: true | undefined; score?: true | undefined; } | undefined)[]'.
//         Type '{ id: never; }' is not assignable to type 'true | { name?: true | undefined; score?: true | undefined; } | undefined'.
type UnknownEnglishClass = StrictDeepOmit<
  EnglishClass,
  {
    id: never;
    students: { id: never }[];
    teacher: {
      id: never;
    };
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^
>;
```

If you don't need a second type parameter to be validated against a first type parameter structure, please use
[DeepOmit](../deep-omit/).

Useful in functions which cannot access specified properties

```ts
declare const englishClass: EnglishClass;

const takeSurvey = (englishClass: AnonymousEnglishClass) => {
  // Property 'name' does not exist on type '{ yearsOfExperience: number; }'
  englishClass.teacher.name;
  //                   ^^^^
  // Property 'name' does not exist on type '{ score: number; }'
  englishClass.students[0].name;
  //                       ^^^^
};

takeSurvey(englishClass);
```

⚠️ Limitations:

- `StrictDeepOmit` cannot be used when `Type` is generic type
  – https://github.com/ts-essentials/ts-essentials/issues/343 (please use `DeepOmit` instead)
- (bug) `StrictDeepOmit` cannot be used on nullable type - https://github.com/ts-essentials/ts-essentials/issues/380
- `StrictDeepOmit` only limits access to specified properties in your codebase, but doesn't remove them in runtime

TS Playground – https://tsplay.dev/wjo7lN
