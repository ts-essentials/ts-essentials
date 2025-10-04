Matches any [JSON array](https://www.rfc-editor.org/rfc/rfc8259#section-3)

```ts
let jsonArray: JsonArray;

jsonArray = [{ numberProperty: 1 }];
jsonArray = [{ numberProperty: 1 }] as const;
jsonArray = [{ stringProperty: "1" }];
jsonArray = [{ stringProperty: "1" }] as const;
jsonArray = [{ booleanProperty: true }];
jsonArray = [{ booleanProperty: true }] as const;
// @ts-expect-error: Type 'symbol' is not assignable to type `JsonValue | JsonPrimitive`
jsonArray = [{ symbolProperty: Symbol.iterator }];
jsonArray = [{ nullProperty: null }];
jsonArray = [{ nullProperty: null }] as const;
// @ts-expect-error: Type 'undefined' is not assignable to type `JsonValue`
jsonArray = [{ undefinedProperty: undefined }];
```

TS Playground - https://tsplay.dev/WP4PJW
