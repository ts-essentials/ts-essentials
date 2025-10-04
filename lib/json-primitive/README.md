Matches any [JSON primitive value](https://www.rfc-editor.org/rfc/rfc8259#section-3)

```ts
let primitive: JsonPrimitive;

primitive = 1;
primitive = "1";
primitive = true;
// @ts-expect-error: Type 'unique symbol' is not assignable to type 'JsonPrimitive'
primitive = Symbol.iterator;
primitive = null;
// @ts-expect-error: Type 'undefined' is not assignable to type 'JsonPrimitive'
primitive = undefined;
```

TS Playground - https://tsplay.dev/w8y2dN
