Matches any [JSON value](https://www.rfc-editor.org/rfc/rfc8259#section-3)

```ts
let jsonValue: JsonValue;

// primitive

jsonValue = 1;
jsonValue = "1";
jsonValue = true;
jsonValue = null;

// object

jsonValue = { numberProperty: 1 };
jsonValue = { stringProperty: "1" };
jsonValue = { booleanProperty: true };
// @ts-expect-error: Type 'symbol' is not assignable to type `JsonValue | JsonPrimitive`
jsonValue = { symbolProperty: Symbol.iterator };
jsonValue = { nullProperty: null };
// @ts-expect-error: Type 'undefined' is not assignable to type `JsonValue | JsonPrimitive`
jsonValue = { undefinedProperty: undefined };

// array

jsonValue = [{ numberProperty: 1 }];
jsonValue = [{ stringProperty: "1" }];
jsonValue = [{ booleanProperty: true }];
// @ts-expect-error: Type 'symbol' is not assignable to type `JsonValue | JsonPrimitive`
jsonValue = [{ symbolProperty: Symbol.iterator }];
jsonValue = [{ nullProperty: null }];
// @ts-expect-error: Type 'undefined' is not assignable to type `JsonValue`
jsonValue = [{ undefinedProperty: undefined }];
```

TS Playground - https://tsplay.dev/ND0ARN
