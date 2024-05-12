Matches any [JSON object](https://www.rfc-editor.org/rfc/rfc8259#section-3)

```ts
let jsonObject: JsonObject;

jsonObject = { numberProperty: 1 };
jsonObject = { stringProperty: "1" };
jsonObject = { booleanProperty: true };
// @ts-expect-error: Type 'symbol' is not assignable to type `JsonValue | JsonPrimitive`
jsonObject = { symbolProperty: Symbol.iterator };
jsonObject = { nullProperty: null };
// @ts-expect-error: Type 'undefined' is not assignable to type `JsonValue | JsonPrimitive`
jsonObject = { undefinedProperty: undefined };
```

It accepts optional properties, such as `pets?: string[];`:

```ts
type Person = {
  name: string;
  age: number;
  pets?: string[];
};

declare const person: Person;

jsonObject = person;
```

TS Playground - https://tsplay.dev/mZKV1W
