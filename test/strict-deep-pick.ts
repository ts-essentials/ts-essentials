import { StrictDeepPick } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";

function testStrictDeepPickInRequiredObject() {
  let obj1: StrictDeepPick<ComplexNestedRequired, {}>;
  obj1 = {};
  // can still assign anything that is not from {}
  obj1 = { simple: 1 };

  let obj2: StrictDeepPick<ComplexNestedRequired, { simple: true }>;
  // @ts-expect-error
  obj2 = {};
  // @ts-expect-error
  obj2 = { simple: undefined };
  obj2 = { simple: 2 };

  let obj2_1: StrictDeepPick<ComplexNestedRequired, { simple: never }>;
  // @ts-expect-error
  obj2_1 = {};
  // @ts-expect-error
  obj2_1 = { simple: undefined };
  obj2_1 = { simple: 2 };

  let obj3: StrictDeepPick<ComplexNestedRequired, { nested: { date: true } }>;
  // @ts-expect-error
  obj3 = {};
  // @ts-expect-error
  obj3 = { nested: undefined };
  // @ts-expect-error
  obj3 = { nested: { date: undefined } };
  obj3 = { nested: { date: new Date() } };

  let obj3_1: StrictDeepPick<ComplexNestedRequired, { nested: { date: never } }>;
  // @ts-expect-error
  obj3_1 = {};
  // @ts-expect-error
  obj3_1 = { nested: undefined };
  // @ts-expect-error
  obj3_1 = { nested: { date: undefined } };
  obj3_1 = { nested: { date: new Date() } };

  let obj4: StrictDeepPick<ComplexNestedRequired, { nested: { func: true } }>;
  // @ts-expect-error
  obj4 = {};
  // @ts-expect-error
  obj4 = { nested: undefined };
  // @ts-expect-error
  obj4 = { nested: { func: undefined } };
  obj4 = { nested: { func: () => "123" } };

  let obj4_1: StrictDeepPick<ComplexNestedRequired, { nested: { func: never } }>;
  // @ts-expect-error
  obj4_1 = {};
  // @ts-expect-error
  obj4_1 = { nested: undefined };
  // @ts-expect-error
  obj4_1 = { nested: { func: undefined } };
  obj4_1 = { nested: { func: () => "123" } };

  let obj5: StrictDeepPick<ComplexNestedRequired, { nested: { array: true } }>;
  // @ts-expect-error
  obj5 = {};
  // @ts-expect-error
  obj5 = { nested: undefined };
  // @ts-expect-error
  obj5 = { nested: { array: undefined } };
  obj5 = { nested: { array: [] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj5 = { nested: { array: [] as const } };
  // @ts-expect-error
  obj5 = { nested: { array: ["1"] } };
  // @ts-expect-error
  obj5 = { nested: { array: [{ bar: "1" }] } };
  obj5 = { nested: { array: [{ bar: 1 }] } };

  let obj5_1: StrictDeepPick<ComplexNestedRequired, { nested: { array: never } }>;
  // @ts-expect-error
  obj5_1 = {};
  // @ts-expect-error
  obj5_1 = { nested: undefined };
  // @ts-expect-error
  obj5_1 = { nested: { array: undefined } };
  obj5_1 = { nested: { array: [] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj5_1 = { nested: { array: [] as const } };
  // @ts-expect-error
  obj5_1 = { nested: { array: ["1"] } };
  // @ts-expect-error
  obj5_1 = { nested: { array: [{ bar: "1" }] } };
  obj5_1 = { nested: { array: [{ bar: 1 }] } };

  let obj6: StrictDeepPick<ComplexNestedRequired, { nested: { tuple: true } }>;
  // @ts-expect-error
  obj6 = {};
  // @ts-expect-error
  obj6 = { nested: undefined };
  // @ts-expect-error
  obj6 = { nested: { tuple: undefined } };
  // @ts-expect-error
  obj6 = { nested: { tuple: [] } };
  // @ts-expect-error
  obj6 = { nested: { tuple: [] as const } };
  obj6 = { nested: { tuple: ["1", 2, { good: true }] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj6 = { nested: { tuple: ["1", 2, { good: true }] as const } };

  let obj6_1: StrictDeepPick<ComplexNestedRequired, { nested: { tuple: never } }>;
  // @ts-expect-error
  obj6_1 = {};
  // @ts-expect-error
  obj6_1 = { nested: undefined };
  // @ts-expect-error
  obj6_1 = { nested: { tuple: undefined } };
  // @ts-expect-error
  obj6_1 = { nested: { tuple: [] } };
  // @ts-expect-error
  obj6_1 = { nested: { tuple: [] as const } };
  obj6_1 = { nested: { tuple: ["1", 2, { good: true }] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj6_1 = { nested: { tuple: ["1", 2, { good: true }] as const } };

  let obj7: StrictDeepPick<ComplexNestedRequired, { nested: { set: true } }>;
  // @ts-expect-error
  obj7 = {};
  // @ts-expect-error
  obj7 = { nested: undefined };
  // @ts-expect-error
  obj7 = { nested: { set: undefined } };
  // @ts-expect-error
  obj7 = { nested: { set: new Set<number>() } };
  // @ts-expect-error
  obj7 = { nested: { set: new Set<{}>() } };
  obj7 = { nested: { set: new Set<{ name: string }>() } };

  let obj7_1: StrictDeepPick<ComplexNestedRequired, { nested: { set: never } }>;
  // @ts-expect-error
  obj7_1 = {};
  // @ts-expect-error
  obj7_1 = { nested: undefined };
  // @ts-expect-error
  obj7_1 = { nested: { set: undefined } };
  // @ts-expect-error
  obj7_1 = { nested: { set: new Set<number>() } };
  // @ts-expect-error
  obj7_1 = { nested: { set: new Set<{}>() } };
  obj7_1 = { nested: { set: new Set<{ name: string }>() } };

  let obj8: StrictDeepPick<ComplexNestedRequired, { nested: { map: true } }>;
  // @ts-expect-error
  obj8 = {};
  // @ts-expect-error
  obj8 = { nested: undefined };
  // @ts-expect-error
  obj8 = { nested: { map: undefined } };
  // @ts-expect-error
  obj8 = { nested: { map: new Map<number, boolean>() } };
  // @ts-expect-error
  obj8 = { nested: { map: new Map<string, {}>() } };
  obj8 = { nested: { map: new Map<string, { name: string }>() } };

  let obj8_1: StrictDeepPick<ComplexNestedRequired, { nested: { map: never } }>;
  // @ts-expect-error
  obj8_1 = {};
  // @ts-expect-error
  obj8_1 = { nested: undefined };
  // @ts-expect-error
  obj8_1 = { nested: { map: undefined } };
  // @ts-expect-error
  obj8_1 = { nested: { map: new Map<number, boolean>() } };
  // @ts-expect-error
  obj8_1 = { nested: { map: new Map<string, {}>() } };
  obj8_1 = { nested: { map: new Map<string, { name: string }>() } };

  let obj9: StrictDeepPick<ComplexNestedRequired, { nested: { promise: true } }>;
  // @ts-expect-error
  obj9 = {};
  // @ts-expect-error
  obj9 = { nested: undefined };
  // @ts-expect-error
  obj9 = { nested: { promise: undefined } };
  // @ts-expect-error
  obj9 = { nested: { promise: new Promise<boolean>(() => {}) } };
  // @ts-expect-error
  obj9 = { nested: { promise: new Promise<{}>(() => {}) } };
  // @ts-expect-error
  obj9 = { nested: { promise: new Promise<{ bar: number }>(() => {}) } };
  // @ts-expect-error
  obj9 = { nested: { promise: new Promise<{ foo: string }>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ foo: string; bar: number }>(() => {}) } };

  let obj9_1: StrictDeepPick<ComplexNestedRequired, { nested: { promise: never } }>;
  // @ts-expect-error
  obj9_1 = {};
  // @ts-expect-error
  obj9_1 = { nested: undefined };
  // @ts-expect-error
  obj9_1 = { nested: { promise: undefined } };
  // @ts-expect-error
  obj9_1 = { nested: { promise: new Promise<boolean>(() => {}) } };
  // @ts-expect-error
  obj9_1 = { nested: { promise: new Promise<{}>(() => {}) } };
  // @ts-expect-error
  obj9_1 = { nested: { promise: new Promise<{ bar: number }>(() => {}) } };
  // @ts-expect-error
  obj9_1 = { nested: { promise: new Promise<{ foo: string }>(() => {}) } };
  obj9_1 = { nested: { promise: new Promise<{ foo: string; bar: number }>(() => {}) } };

  let obj10: StrictDeepPick<ComplexNestedRequired, { nested: { date: true; array: true } }>;
  // @ts-expect-error
  obj10 = {};
  // @ts-expect-error
  obj10 = { nested: undefined };
  // @ts-expect-error
  obj10 = { nested: { date: undefined } };
  // @ts-expect-error
  obj10 = { nested: { array: undefined } };
  // @ts-expect-error
  obj10 = { nested: { array: undefined, date: undefined } };
  // @ts-expect-error
  obj10 = { nested: { array: [{ bar: 1 }], date: undefined } };
  // @ts-expect-error
  obj10 = { nested: { array: undefined, date: new Date() } };
  obj10 = { nested: { array: [{ bar: 1 }], date: new Date() } };
}

function testStrictDeepInPartialObject() {
  let obj1: StrictDeepPick<ComplexNestedPartial, {}>;
  obj1 = {};
  // can still assign anything that is not from {}
  obj1 = { simple: 1 };

  let obj2: StrictDeepPick<ComplexNestedPartial, { simple: true }>;
  obj2 = {};
  obj2 = { simple: undefined };
  obj2 = { simple: 2 };

  let obj2_1: StrictDeepPick<ComplexNestedPartial, { simple: never }>;
  obj2_1 = {};
  obj2_1 = { simple: undefined };
  obj2_1 = { simple: 2 };

  let obj3: StrictDeepPick<ComplexNestedPartial, { nested: { date: true } }>;
  obj3 = {};
  obj3 = { nested: undefined };
  obj3 = { nested: { date: undefined } };
  obj3 = { nested: { date: new Date() } };

  let obj3_1: StrictDeepPick<ComplexNestedPartial, { nested: { date: never } }>;
  obj3_1 = {};
  obj3_1 = { nested: undefined };
  obj3_1 = { nested: { date: undefined } };
  obj3_1 = { nested: { date: new Date() } };

  let obj4: StrictDeepPick<ComplexNestedPartial, { nested: { func: true } }>;
  obj4 = {};
  obj4 = { nested: undefined };
  obj4 = { nested: { func: undefined } };
  obj4 = { nested: { func: () => "123" } };

  let obj4_1: StrictDeepPick<ComplexNestedPartial, { nested: { func: never } }>;
  obj4_1 = {};
  obj4_1 = { nested: undefined };
  obj4_1 = { nested: { func: undefined } };
  obj4_1 = { nested: { func: () => "123" } };

  let obj5: StrictDeepPick<ComplexNestedPartial, { nested: { array: true } }>;
  obj5 = {};
  obj5 = { nested: undefined };
  obj5 = { nested: { array: undefined } };
  obj5 = { nested: { array: [] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj5 = { nested: { array: [] as const } };
  // @ts-expect-error
  obj5 = { nested: { array: ["1"] } };
  // @ts-expect-error
  obj5 = { nested: { array: [{ bar: "1" }] } };
  obj5 = { nested: { array: [{ bar: 1 }] } };

  let obj5_1: StrictDeepPick<ComplexNestedPartial, { nested: { array: never } }>;
  obj5_1 = {};
  obj5_1 = { nested: undefined };
  obj5_1 = { nested: { array: undefined } };
  obj5_1 = { nested: { array: [] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj5_1 = { nested: { array: [] as const } };
  // @ts-expect-error
  obj5_1 = { nested: { array: ["1"] } };
  // @ts-expect-error
  obj5_1 = { nested: { array: [{ bar: "1" }] } };
  obj5_1 = { nested: { array: [{ bar: 1 }] } };

  let obj6: StrictDeepPick<ComplexNestedPartial, { nested: { tuple: true } }>;
  obj6 = {};
  obj6 = { nested: undefined };
  obj6 = { nested: { tuple: undefined } };
  obj6 = { nested: { tuple: [] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj6 = { nested: { tuple: [] as const } };
  obj6 = { nested: { tuple: ["1", 2, { good: true }] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj6 = { nested: { tuple: ["1", 2, { good: true }] as const } };

  let obj6_1: StrictDeepPick<ComplexNestedPartial, { nested: { tuple: never } }>;
  obj6_1 = {};
  obj6_1 = { nested: undefined };
  obj6_1 = { nested: { tuple: undefined } };
  obj6_1 = { nested: { tuple: [] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj6_1 = { nested: { tuple: [] as const } };
  obj6_1 = { nested: { tuple: ["1", 2, { good: true }] } };
  // It doesn't throw TypeError for TypeScript>=5.3
  // obj6_1 = { nested: { tuple: ["1", 2, { good: true }] as const } };

  let obj7: StrictDeepPick<ComplexNestedPartial, { nested: { set: true } }>;
  obj7 = {};
  obj7 = { nested: undefined };
  obj7 = { nested: { set: undefined } };
  // @ts-expect-error
  obj7 = { nested: { set: new Set<number>() } };
  obj7 = { nested: { set: new Set<{}>() } };
  obj7 = { nested: { set: new Set<{ name?: string }>() } };
  obj7 = { nested: { set: new Set<{ name: string }>() } };

  let obj7_1: StrictDeepPick<ComplexNestedPartial, { nested: { set: never } }>;
  obj7_1 = {};
  obj7_1 = { nested: undefined };
  obj7_1 = { nested: { set: undefined } };
  // @ts-expect-error
  obj7_1 = { nested: { set: new Set<number>() } };
  obj7_1 = { nested: { set: new Set<{}>() } };
  obj7_1 = { nested: { set: new Set<{ name?: string }>() } };
  obj7_1 = { nested: { set: new Set<{ name: string }>() } };

  let obj8: StrictDeepPick<ComplexNestedPartial, { nested: { map: true } }>;
  obj8 = {};
  obj8 = { nested: undefined };
  obj8 = { nested: { map: undefined } };
  // @ts-expect-error
  obj8 = { nested: { map: new Map<number, boolean>() } };
  obj8 = { nested: { map: new Map<string, {}>() } };
  obj8 = { nested: { map: new Map<string, { name?: string }>() } };
  obj8 = { nested: { map: new Map<string, { name: string }>() } };

  let obj8_1: StrictDeepPick<ComplexNestedPartial, { nested: { map: never } }>;
  obj8_1 = {};
  obj8_1 = { nested: undefined };
  obj8_1 = { nested: { map: undefined } };
  // @ts-expect-error
  obj8_1 = { nested: { map: new Map<number, boolean>() } };
  obj8_1 = { nested: { map: new Map<string, {}>() } };
  obj8_1 = { nested: { map: new Map<string, { name?: string }>() } };
  obj8_1 = { nested: { map: new Map<string, { name: string }>() } };

  let obj9: StrictDeepPick<ComplexNestedPartial, { nested: { promise: true } }>;
  obj9 = {};
  obj9 = { nested: undefined };
  obj9 = { nested: { promise: undefined } };
  // @ts-expect-error
  obj9 = { nested: { promise: new Promise<boolean>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{}>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ foo: string }>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ bar: number }>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ foo?: string }>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ bar?: number }>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ foo?: string; bar?: number }>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ foo: string; bar: number }>(() => {}) } };

  let obj9_1: StrictDeepPick<ComplexNestedPartial, { nested: { promise: never } }>;
  obj9_1 = {};
  obj9_1 = { nested: undefined };
  obj9_1 = { nested: { promise: undefined } };
  // @ts-expect-error
  obj9_1 = { nested: { promise: new Promise<boolean>(() => {}) } };
  obj9_1 = { nested: { promise: new Promise<{}>(() => {}) } };
  obj9_1 = { nested: { promise: new Promise<{ foo: string }>(() => {}) } };
  obj9_1 = { nested: { promise: new Promise<{ bar: number }>(() => {}) } };
  obj9_1 = { nested: { promise: new Promise<{ foo?: string }>(() => {}) } };
  obj9_1 = { nested: { promise: new Promise<{ bar?: number }>(() => {}) } };
  obj9_1 = { nested: { promise: new Promise<{ foo?: string; bar?: number }>(() => {}) } };
  obj9_1 = { nested: { promise: new Promise<{ foo: string; bar: number }>(() => {}) } };

  let obj10: StrictDeepPick<ComplexNestedPartial, { nested: { date: true; array: true } }>;
  obj10 = {};
  obj10 = { nested: undefined };
  obj10 = { nested: { date: undefined } };
  obj10 = { nested: { array: undefined } };
  obj10 = { nested: { array: undefined, date: undefined } };
  obj10 = { nested: { array: [{ bar: 1 }], date: undefined } };
  obj10 = { nested: { array: undefined, date: new Date() } };
  obj10 = { nested: { array: [{ bar: 1 }], date: new Date() } };

  {
    type MapType = Map<
      string,
      {
        name: string;
        age: number;
      }
    >;

    // @ts-expect-error Type 'number' is not assignable to type 'string'
    let map: StrictDeepPick<MapType, Map<number, { age: true }>>;
  }

  {
    type MapType = Map<
      string,
      {
        name: string;
        age: number;
      }
    >;

    let map: StrictDeepPick<MapType, Map<string, { age: true }>>;

    map = new Map<string, { age: number }>();
    // @ts-expect-error  Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
    map = new Map<string, { name: string }>();
    // we still can extend value type
    map = new Map<
      string,
      {
        name: string;
        age: number;
      }
    >();
    // @ts-expect-error Type 'number' is not assignable to type 'string'
    map = new Map<number, {}>();
    map.set("key", { age: 1 });
  }

  {
    type MapType = ReadonlyMap<
      string,
      {
        name: string;
        age: number;
      }
    >;

    // @ts-expect-error Type 'number' is not assignable to type 'string'
    let map: StrictDeepPick<MapType, ReadonlyMap<number, { age: true }>>;
  }

  {
    type MapType = ReadonlyMap<
      string,
      {
        name: string;
        age: number;
      }
    >;

    let map: StrictDeepPick<MapType, ReadonlyMap<string, { age: true }>>;

    map = new Map<string, { age: number }>();
    // @ts-expect-error  Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
    map = new Map<string, { name: string }>();
    // we still can extend value type
    map = new Map<
      string,
      {
        name: string;
        age: number;
      }
    >();
    // @ts-expect-error Type 'number' is not assignable to type 'string'
    map = new Map<number, {}>();
    // @ts-expect-error Property 'set' does not exist on type 'ReadonlyMap<string, { age: number; }>'
    map.set("key", { age: 1 });
  }

  {
    type MapType = WeakMap<
      { a: string },
      {
        name: string;
        age: number;
      }
    >;
    ``;
    let map: StrictDeepPick<
      MapType,
      // for TypeScript 4.1 and 4.2 it's working though, so breaking it on purpose
      // @ts-expect-error ❌  Type 'number' is not assignable to type 'string'
      TsVersion extends "4.1" | "4.2" ? { breakingOnPurpose: true } : WeakMap<{ a: number }, { age: true }>
    >;
  }

  {
    type MapType = WeakMap<
      { a: string },
      {
        name: string;
        age: number;
      }
    >;

    let map: StrictDeepPick<MapType, WeakMap<{ a: string }, { age: true }>>;

    map = new WeakMap<{ a: string }, { age: number }>();
    // @ts-expect-error  Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
    map = new Map<{ a: string }, { name: string }>();
    // we still can extend value type
    map = new Map<
      { a: string },
      {
        name: string;
        age: number;
      }
    >();
    // @ts-expect-error Type 'number' is not assignable to type 'string'
    map = new Map<{ a: number }, {}>();
    map.set({ a: "key" }, { age: 1 });
  }

  {
    type SetType = Set<{
      name: string;
      age: number;
    }>;

    let set: StrictDeepPick<SetType, Set<{ age: true }>>;

    set = new Set<{ age: number }>();
    // @ts-expect-error  Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
    set = new Set<{ name: string }>();
    // we still can extend value type
    set = new Set<{
      name: string;
      age: number;
    }>();
    // @ts-expect-error Type 'number' is not assignable to type 'string'
    set = new Set<{}>();
    set.add({ age: 1 });
  }

  {
    type ReadonlySetType = ReadonlySet<{
      name: string;
      age: number;
    }>;

    let set: StrictDeepPick<ReadonlySetType, ReadonlySet<{ age: true }>>;

    set = new Set<{ age: number }>();
    // @ts-expect-error  Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
    set = new Set<{ name: string }>();
    // we still can extend value type
    set = new Set<{
      name: string;
      age: number;
    }>();
    // @ts-expect-error Type 'number' is not assignable to type 'string'
    set = new Set<{}>();
    // @ts-expect-error Property 'add' does not exist on type 'ReadonlySet<{ age: number; }>'
    set.add({ age: 1 });
  }

  {
    type WeakSetType = WeakSet<{
      name: string;
      age: number;
    }>;

    let set: StrictDeepPick<WeakSetType, WeakSet<{ age: true }>>;

    set = new WeakSet<{ age: number }>();
    // @ts-expect-error  Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
    set = new WeakSet<{ name: string }>();
    // we still can extend value type
    set = new WeakSet<{
      name: string;
      age: number;
    }>();
    // we even can use it that way for WeekSet
    set = new WeakSet<{}>();
    set.add({ age: 1 });
  }

  {
    type ArrayType = Array<{
      name: string;
      age: number;
    }>;

    let arr: StrictDeepPick<ArrayType, Array<{ age: true }>>;

    arr = new Array<{ age: number }>();
    // @ts-expect-error  Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
    arr = new Array<{ name: string }>();
    // we still can extend value type
    arr = new Array<{
      name: string;
      age: number;
    }>();
    // @ts-expect-error Property 'age' is missing in type '{}' but required in type '{ age: number; }'
    arr = new Array<{}>();
    arr.push({ age: 1 });
  }

  {
    type PromiseType = Promise<{
      name: string;
      age: number;
    }>;

    let promise: StrictDeepPick<PromiseType, Promise<{ age: true }>>;

    promise = new Promise<{ age: number }>(() => {});
    // @ts-expect-error  Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
    promise = new Promise<{ name: string }>(() => {});
    // we still can extend value type
    promise = new Promise<{
      name: string;
      age: number;
    }>(() => {});
    // @ts-expect-error Property 'age' is missing in type '{}' but required in type '{ age: number; }'
    promise = new Promise<{}>(() => {});
  }
}
