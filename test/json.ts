import { JsonArray, JsonObject, JsonPrimitive, JsonValue } from "../lib";

function testJsonPrimitive() {
  let primitive: JsonPrimitive;

  primitive = 1;
  primitive = "1";
  primitive = true;
  // @ts-expect-error: Type 'unique symbol' is not assignable to type 'JsonPrimitive'
  primitive = Symbol.iterator;
  primitive = null;
  // @ts-expect-error: Type 'undefined' is not assignable to type 'JsonPrimitive'
  primitive = undefined;
}

function testJsonObject() {
  let jsonObject: JsonObject;

  jsonObject = { numberProperty: 1 };
  jsonObject = { stringProperty: "1" };
  jsonObject = { booleanProperty: true };
  // @ts-expect-error: Type 'symbol' is not assignable to type `JsonValue | JsonPrimitive`
  jsonObject = { symbolProperty: Symbol.iterator };
  jsonObject = { nullProperty: null };
  // @ts-expect-error: Type 'undefined' is not assignable to type `JsonValue | JsonPrimitive`
  jsonObject = { undefinedProperty: undefined };
}

function testJsonArray() {
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
}

function testCompatibleJson() {
  type JsonCompatible<T> = {
    [P in keyof T]: T[P] extends JsonValue
      ? T[P]
      : Pick<T, P> extends Required<Pick<T, P>>
      ? never
      : T[P] extends (() => any) | undefined
      ? never
      : JsonCompatible<T[P]>;
  };

  function test<T extends JsonCompatible<T>>(_: T): T {
    return null as any;
  }

  interface RequiredNumberObject {
    a: number;
  }

  class RequiredNumberClass {
    a!: number;
  }

  interface OptionalNumberObject {
    a?: number;
  }

  interface RequiredDateObject {
    a: Date;
  }

  interface OptionalDateObject {
    a?: Date;
  }

  interface NumberOrUndefinedObject {
    a: number | undefined;
  }

  interface OptionalAnyFunctionObject {
    a?: () => any;
  }

  test(null);
  test(false);
  test(0);
  test("");
  test([]);
  test({});
  test([0]);
  test({ a: 0 });
  test({} as RequiredNumberObject);
  test({} as RequiredNumberClass);
  test({} as OptionalNumberObject);

  // @ts-expect-error Type '() => string' is not assignable to type 'never'
  test(new Date());
  // @ts-expect-error Type 'Date' is not assignable to type 'never'
  test([new Date()]);
  // @ts-expect-error Type 'Date' is not assignable to type 'never'
  test({ a: new Date() });
  // @ts-expect-error Type 'undefined' is not assignable to type 'never'
  test({ a: undefined });
  // @ts-expect-error  Type 'Date' is not assignable to type 'never'
  test({} as RequiredDateObject);
  // @ts-expect-error  Type '() => string' is not assignable to type 'never'
  test({} as OptionalDateObject);
  // @ts-expect-error Type 'undefined' is not assignable to type 'never'
  test({} as NumberOrUndefinedObject);
  // @ts-expect-error Type '() => any' is not assignable to type 'undefined'
  test({} as OptionalAnyFunctionObject);
}
