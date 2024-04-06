`DeepPick<Type, Filter>` constructs a type by picking set of properties, which have property values `never` or `true` in
type `Filter`, from type `Type`

```ts
interface EnglishClass {
  students: { name: string; score: number }[];
  teacher: {
    name: string;
    yearsOfExperience: number;
  };
  year: number;
}

type EnglishClassNamesOnly = DeepPick<
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

It doesn't validate that all `Filter` properties exist in type `Type`:

```ts
type UnknownEnglishClass = DeepPick<
  EnglishClass,
  {
    id: never;
    students: { id: never }[];
    teacher: {
      id: never;
    };
  }
>;
```

If you'd like a second type parameter to be validated against a first type parameter structure, please use
[StrictDeepPick](../strict-deep-pick/).

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

- `DeepPick` only limits access to specified properties in your codebase, but doesn't remove them in runtime

TS Playground – https://tsplay.dev/mAJ2PW
