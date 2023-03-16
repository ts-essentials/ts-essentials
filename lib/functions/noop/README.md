`noop(..._args)` matches runtime function that does nothing with arguments `_args`

```ts
const platformConfigurationsMap = new Map<string, () => void>()
  .set("mobile", () => {
    // implementation
  })
  .set("desktop", () => {
    // implementation
  });

declare const platform: string;

const configurePlatform = platformConfigurationsMap.get(platform) ?? noop;

configurePlatform();
```

TS Playground – https://tsplay.dev/we63KN
