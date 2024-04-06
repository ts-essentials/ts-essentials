`StrictDeepPick<Type, Filter>` constructs a type by picking set of properties, which have property values `never` or
`true` in type `Filter`, from type `Type`

```ts
interface EnglishClass {
  students: { name: string; score: number }[];
  teacher: {
    name: string;
    yearsOfExperience: number;
  };
  year: number;
}

type EnglishClassNamesOnly = StrictDeepPick<
  // ^? { students: { name: string }[]; teacher: { name: string }; }
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
type UnknownEnglishClass = StrictDeepPick<
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
[DeepPick](../deep-pick/).

Useful in functions which cannot access specified properties

```ts
declare const englishClass: EnglishClass;

const calculateAverageScore = (englishClass: EnglishClassNamesOnly) => {
  let scoreSum = 0;

  for (const student of englishClass.students) {
    // Property 'score' does not exist on type '{ name: string; }'
    scoreSum += student.score;
    //                  ^^^^^
  }

  return scoreSum / englishClass.students.length;
};

calculateAverageScore(englishClass);
```

⚠️ Limitations:

- `StrictDeepPick` cannot be used when `Type` is generic type
  – https://github.com/ts-essentials/ts-essentials/issues/343 (please use `DeepPick` instead)
- (bug) `StrictDeepPick` cannot be used on nullable type - https://github.com/ts-essentials/ts-essentials/issues/380
- `StrictDeepPick` only limits access to specified properties in your codebase, but doesn't remove them in runtime

TS Playground – https://tsplay.dev/w1GJkm
