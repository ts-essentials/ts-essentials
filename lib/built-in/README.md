`Builtin` matches primitive, function, date, error or regular expression

```ts
let builtin: Builtin;

builtin = noop;
builtin = /^[0-9]+$/g;
builtin = primitive;
builtin = new Date();
builtin = new Error();
```

TS Playground – https://tsplay.dev/w25y1W
