`RequireAtMostOne<Type, Keys?>` constructs a type with at least one required key from `Keys` (`keyof Type` by default) and other keys from `Type`, which are not part of `Keys`

```ts
type JsonFile = { type: 'json' };
type YamlFile = { type: 'yaml' };

type VirtualFile = {
  readonly: boolean;
  toJson: () => JsonFile;
  toYaml: () => YamlFile;
};

type Converter = RequireAtMostOne<VirtualFile, "toJson" | "toYaml">;

const converter: Converter = {
  readonly: false,
  toJson: () => ({ type: 'json' }),
  // Uncommenting next line throws TypeError, as only one of `toJson` or `toYaml` can be included
  // toYaml: () => ({ type: 'yaml' }),
};
```

TS Playground - https://tsplay.dev/NBOKnm
