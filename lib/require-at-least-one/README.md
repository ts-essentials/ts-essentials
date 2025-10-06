`RequireAtLeastOne<Type, Keys?>` constructs a type with at least one required key from `Keys` (`keyof Type` by default) and other keys from `Type`, which are not part of `Keys`

```ts
type JsonFile = { type: 'json' };
type YamlFile = { type: 'yaml' };

type VirtualFile = {
  readonly: boolean;
  toJson: () => JsonFile;
  toYaml: () => YamlFile;
};

type Converter = RequireAtLeastOne<VirtualFile, "toJson" | "toYaml">;

const converter: Converter = {
  readonly: false,
  toJson: () => ({ type: 'json' }),
};
```

TS Playground - https://tsplay.dev/WJgkDw
