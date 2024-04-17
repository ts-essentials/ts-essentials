`DeepOmit<Type, Filter>` constructs a type by picking all properties from type `Type` and removing properties which
values are `never` or `true` in type `Filter`

```ts
interface EnglishClass {
  students: { name: string; score: number }[];
  teacher: {
    name: string;
    yearsOfExperience: number;
  };
  year: number;
}

type AnonymousEnglishClass = DeepOmit<
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

It doesn't validate that all `Filter` properties exist in type `Type`:

```ts
type UnknownEnglishClass = DeepOmit<
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

If you'd like type a second type parameter `Filter` to be validated against a structure of a first type parameter
`Type`, please use [`StrictDeepOmit<Type, Filter>`](../strict-deep-omit/).

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

- `DeepOmit` cannot be used when `Type` is generic type – https://github.com/ts-essentials/ts-essentials/issues/343
- `DeepOmit` only limits access to specified properties in your codebase, but doesn't remove them in runtime

TS Playground – https://tsplay.dev/wedDdW
