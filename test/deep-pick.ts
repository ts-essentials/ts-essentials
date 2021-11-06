import { DeepPick } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";

function testDeepPickInRequiredObject() {
  let obj1: DeepPick<ComplexNestedRequired, {}>;
  obj1 = {};
  // can still assign anything that is not from {}
  obj1 = { simple: 1 };

  let obj2: DeepPick<ComplexNestedRequired, { simple: true }>;
  // @ts-expect-error
  obj2 = {};
  // @ts-expect-error
  obj2 = { simple: undefined };
  obj2 = { simple: 2 };

  let obj3: DeepPick<ComplexNestedRequired, { nested: { date: true } }>;
  // @ts-expect-error
  obj3 = {};
  // @ts-expect-error
  obj3 = { nested: undefined };
  // @ts-expect-error
  obj3 = { nested: { date: undefined } };
  obj3 = { nested: { date: new Date() } };

  let obj4: DeepPick<ComplexNestedRequired, { nested: { func: true } }>;
  // @ts-expect-error
  obj4 = {};
  // @ts-expect-error
  obj4 = { nested: undefined };
  // @ts-expect-error
  obj4 = { nested: { func: undefined } };
  obj4 = { nested: { func: () => "123" } };

  let obj5: DeepPick<ComplexNestedRequired, { nested: { array: true } }>;
  // @ts-expect-error
  obj5 = {};
  // @ts-expect-error
  obj5 = { nested: undefined };
  // @ts-expect-error
  obj5 = { nested: { array: undefined } };
  obj5 = { nested: { array: [] } };
  // @ts-expect-error
  obj5 = { nested: { array: [] as const } };
  // @ts-expect-error
  obj5 = { nested: { array: ["1"] } };
  // @ts-expect-error
  obj5 = { nested: { array: [{ bar: "1" }] } };
  obj5 = { nested: { array: [{ bar: 1 }] } };

  let obj6: DeepPick<ComplexNestedRequired, { nested: { tuple: true } }>;
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
  // @ts-expect-error
  obj6 = { nested: { tuple: ["1", 2, { good: true }] as const } };

  let obj7: DeepPick<ComplexNestedRequired, { nested: { set: true } }>;
  // @ts-expect-error
  obj7 = {};
  // @ts-expect-error
  obj7 = { nested: undefined };
  // @ts-expect-error
  obj7 = { nested: { set: undefined } };
  // @ts-expect-error
  obj7 = { nested: { set: new Set<number>() } };
  obj7 = { nested: { set: new Set<{ name: string }>() } };

  let obj8: DeepPick<ComplexNestedRequired, { nested: { map: true } }>;
  // @ts-expect-error
  obj8 = {};
  // @ts-expect-error
  obj8 = { nested: undefined };
  // @ts-expect-error
  obj8 = { nested: { map: undefined } };
  // @ts-expect-error
  obj8 = { nested: { map: new Map<number, boolean>() } };
  obj8 = { nested: { map: new Map<string, { name: string }>() } };

  let obj9: DeepPick<ComplexNestedRequired, { nested: { promise: true } }>;
  // @ts-expect-error
  obj9 = {};
  // @ts-expect-error
  obj9 = { nested: undefined };
  // @ts-expect-error
  obj9 = { nested: { promise: undefined } };
  // @ts-expect-error
  obj9 = { nested: { promise: new Promise<boolean>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ foo: string; bar: number }>(() => {}) } };
}

function testDeepPickInPartialObject() {
  let obj1: DeepPick<ComplexNestedPartial, {}>;
  obj1 = {};
  // can still assign anything that is not from {}
  obj1 = { simple: 1 };

  let obj2: DeepPick<ComplexNestedPartial, { simple: true }>;
  obj2 = {};
  obj2 = { simple: undefined };
  obj2 = { simple: 2 };

  let obj3: DeepPick<ComplexNestedPartial, { nested: { date: true } }>;
  obj3 = {};
  obj3 = { nested: undefined };
  obj3 = { nested: { date: undefined } };
  obj3 = { nested: { date: new Date() } };

  let obj4: DeepPick<ComplexNestedPartial, { nested: { func: true } }>;
  obj4 = {};
  obj4 = { nested: undefined };
  obj4 = { nested: { func: undefined } };
  obj4 = { nested: { func: () => "123" } };

  let obj5: DeepPick<ComplexNestedPartial, { nested: { array: true } }>;
  obj5 = {};
  obj5 = { nested: undefined };
  obj5 = { nested: { array: undefined } };
  obj5 = { nested: { array: [] } };
  // @ts-expect-error
  obj5 = { nested: { array: [] as const } };
  // @ts-expect-error
  obj5 = { nested: { array: ["1"] } };
  // @ts-expect-error
  obj5 = { nested: { array: [{ bar: "1" }] } };
  obj5 = { nested: { array: [{ bar: 1 }] } };

  let obj6: DeepPick<ComplexNestedPartial, { nested: { tuple: true } }>;
  obj6 = {};
  obj6 = { nested: undefined };
  obj6 = { nested: { tuple: undefined } };
  obj6 = { nested: { tuple: [] } };
  // @ts-expect-error
  obj6 = { nested: { tuple: [] as const } };
  obj6 = { nested: { tuple: ["1", 2, { good: true }] } };
  // @ts-expect-error
  obj6 = { nested: { tuple: ["1", 2, { good: true }] as const } };

  let obj7: DeepPick<ComplexNestedPartial, { nested: { set: true } }>;
  obj7 = {};
  obj7 = { nested: undefined };
  obj7 = { nested: { set: undefined } };
  // @ts-expect-error
  obj7 = { nested: { set: new Set<number>() } };
  obj7 = { nested: { set: new Set<{ name: string }>() } };

  let obj8: DeepPick<ComplexNestedPartial, { nested: { map: true } }>;
  obj8 = {};
  obj8 = { nested: undefined };
  obj8 = { nested: { map: undefined } };
  // @ts-expect-error
  obj8 = { nested: { map: new Map<number, boolean>() } };
  obj8 = { nested: { map: new Map<string, { name: string }>() } };

  let obj9: DeepPick<ComplexNestedPartial, { nested: { promise: true } }>;
  obj9 = {};
  obj9 = { nested: undefined };
  obj9 = { nested: { promise: undefined } };
  // @ts-expect-error
  obj9 = { nested: { promise: new Promise<boolean>(() => {}) } };
  obj9 = { nested: { promise: new Promise<{ foo: string; bar: number }>(() => {}) } };
}
