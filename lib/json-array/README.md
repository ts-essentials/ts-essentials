Matches any [JSON array](https://www.rfc-editor.org/rfc/rfc8259#section-3)

```ts
let jsonArray: JsonArray;

jsonArray = [{ numberProperty: 1 }];
jsonArray = [{ stringProperty: "1" }];
jsonArray = [{ booleanProperty: true }];
// @ts-expect-error: Type 'symbol' is not assignable to type `JsonValue | JsonPrimitive`
jsonArray = [{ symbolProperty: Symbol.iterator }];
jsonArray = [{ nullProperty: null }];
// @ts-expect-error: Type 'undefined' is not assignable to type `JsonValue`
jsonArray = [{ undefinedProperty: undefined }];
```

TS Playground - https://tsplay.dev/N5dVPw
