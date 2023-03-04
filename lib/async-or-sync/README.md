`AsyncOrSync<Type>` constructs a type with `Type` or `PromiseLike<Type>`

```ts
type AsyncOrSyncNumber = AsyncOrSync<number>;
//   ^? number | PromiseLike<number>
```

It's handy to use it as return type for functions in interfaces and abstract classes

```ts
interface CiProvider {
  getSHA(): AsyncOrSync<string>;
}

class Circle implements CiProvider {
  getSHA() {
    // ^? () => string
    return "abc";
  }
}

class Travis implements CiProvider {
  async getSHA() {
    // ^? () => Promise<string>
    return "def";
  }
}
```

TS Playground – https://tsplay.dev/wE7eZm
