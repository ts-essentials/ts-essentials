import { DeepOmit } from "../lib";
import { complexNestedRequired, complexNestedUndefined } from "./const";
import { TsVersion } from "./ts-version";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";

function testDeepOmitInRequiredObject() {
  let obj1: DeepOmit<ComplexNestedRequired, {}>;
  obj1 = complexNestedRequired;
  // @ts-expect-error missed nested
  obj1 = { simple: complexNestedRequired.simple };

  let obj2: DeepOmit<ComplexNestedRequired, { simple: true }>;
  // @ts-expect-error
  obj2 = {};
  // @ts-expect-error
  obj2 = { nested: undefined };
  obj2 = {
    // @ts-expect-error
    nested: complexNestedUndefined.nested,
  };
  obj2 = { nested: complexNestedRequired.nested };

  let obj2_1: DeepOmit<ComplexNestedRequired, { simple: never }>;
  // @ts-expect-error
  obj2_1 = {};
  // @ts-expect-error
  obj2_1 = { nested: undefined };
  obj2_1 = {
    // @ts-expect-error
    nested: complexNestedUndefined.nested,
  };
  obj2_1 = { nested: complexNestedRequired.nested };

  {
    const {
      nested: { date, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj3: DeepOmit<ComplexNestedRequired, { nested: { date: true } }>;
    // @ts-expect-error
    obj3 = {};
    // @ts-expect-error
    obj3 = { simple: undefined };
    // @ts-expect-error
    obj3 = { nested: undefined };
    // @ts-expect-error
    obj3 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj3 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj3 = { simple: complexNestedRequired.simple, nested: undefined };
    obj3 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { date, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj3_1: DeepOmit<ComplexNestedRequired, { nested: { date: never } }>;
    // @ts-expect-error
    obj3_1 = {};
    // @ts-expect-error
    obj3_1 = { simple: undefined };
    // @ts-expect-error
    obj3_1 = { nested: undefined };
    // @ts-expect-error
    obj3_1 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj3_1 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj3_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj3_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { func, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj4: DeepOmit<ComplexNestedRequired, { nested: { func: true } }>;
    // @ts-expect-error
    obj4 = {};
    // @ts-expect-error
    obj4 = { simple: undefined };
    // @ts-expect-error
    obj4 = { nested: undefined };
    // @ts-expect-error
    obj4 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj4 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj4 = { simple: complexNestedRequired.simple, nested: undefined };
    obj4 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { func, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj4_1: DeepOmit<ComplexNestedRequired, { nested: { func: never } }>;
    // @ts-expect-error
    obj4_1 = {};
    // @ts-expect-error
    obj4_1 = { simple: undefined };
    // @ts-expect-error
    obj4_1 = { nested: undefined };
    // @ts-expect-error
    obj4_1 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj4_1 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj4_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj4_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { array, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj5: DeepOmit<ComplexNestedRequired, { nested: { array: true } }>;
    // @ts-expect-error
    obj5 = {};
    // @ts-expect-error
    obj5 = { simple: undefined };
    // @ts-expect-error
    obj5 = { nested: undefined };
    // @ts-expect-error
    obj5 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj5 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj5 = { simple: complexNestedRequired.simple, nested: undefined };
    obj5 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { array, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj5_1: DeepOmit<ComplexNestedRequired, { nested: { array: never } }>;
    // @ts-expect-error
    obj5_1 = {};
    // @ts-expect-error
    obj5_1 = { simple: undefined };
    // @ts-expect-error
    obj5_1 = { nested: undefined };
    // @ts-expect-error
    obj5_1 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj5_1 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj5_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj5_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { tuple, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj6: DeepOmit<ComplexNestedRequired, { nested: { tuple: true } }>;
    // @ts-expect-error
    obj6 = {};
    // @ts-expect-error
    obj6 = { simple: undefined };
    // @ts-expect-error
    obj6 = { nested: undefined };
    // @ts-expect-error
    obj6 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj6 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj6 = { simple: complexNestedRequired.simple, nested: undefined };
    obj6 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { tuple, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj6_1: DeepOmit<ComplexNestedRequired, { nested: { tuple: never } }>;
    // @ts-expect-error
    obj6_1 = {};
    // @ts-expect-error
    obj6_1 = { simple: undefined };
    // @ts-expect-error
    obj6_1 = { nested: undefined };
    // @ts-expect-error
    obj6_1 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj6_1 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj6_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj6_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { set, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj7: DeepOmit<ComplexNestedRequired, { nested: { set: true } }>;
    // @ts-expect-error
    obj7 = {};
    // @ts-expect-error
    obj7 = { simple: undefined };
    // @ts-expect-error
    obj7 = { nested: undefined };
    // @ts-expect-error
    obj7 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj7 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj7 = { simple: complexNestedRequired.simple, nested: undefined };
    obj7 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { set, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj7_1: DeepOmit<ComplexNestedRequired, { nested: { set: never } }>;
    // @ts-expect-error
    obj7_1 = {};
    // @ts-expect-error
    obj7_1 = { simple: undefined };
    // @ts-expect-error
    obj7_1 = { nested: undefined };
    // @ts-expect-error
    obj7_1 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj7_1 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj7_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj7_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { map, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj8: DeepOmit<ComplexNestedRequired, { nested: { map: true } }>;
    // @ts-expect-error
    obj8 = {};
    // @ts-expect-error
    obj8 = { simple: undefined };
    // @ts-expect-error
    obj8 = { nested: undefined };
    // @ts-expect-error
    obj8 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj8 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj8 = { simple: complexNestedRequired.simple, nested: undefined };
    obj8 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { map, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj8_1: DeepOmit<ComplexNestedRequired, { nested: { map: never } }>;
    // @ts-expect-error
    obj8_1 = {};
    // @ts-expect-error
    obj8_1 = { simple: undefined };
    // @ts-expect-error
    obj8_1 = { nested: undefined };
    // @ts-expect-error
    obj8_1 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj8_1 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj8_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj8_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { promise, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj9: DeepOmit<ComplexNestedRequired, { nested: { promise: true } }>;
    // @ts-expect-error
    obj9 = {};
    // @ts-expect-error
    obj9 = { simple: undefined };
    // @ts-expect-error
    obj9 = { nested: undefined };
    // @ts-expect-error
    obj9 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj9 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj9 = { simple: complexNestedRequired.simple, nested: undefined };
    obj9 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { promise, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj9_1: DeepOmit<ComplexNestedRequired, { nested: { promise: never } }>;
    // @ts-expect-error
    obj9_1 = {};
    // @ts-expect-error
    obj9_1 = { simple: undefined };
    // @ts-expect-error
    obj9_1 = { nested: undefined };
    // @ts-expect-error
    obj9_1 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj9_1 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj9_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj9_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { date, array, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj10: DeepOmit<ComplexNestedRequired, { nested: { date: true; array: true } }>;
    // @ts-expect-error
    obj10 = {};
    // @ts-expect-error
    obj10 = { simple: undefined };
    // @ts-expect-error
    obj10 = { nested: undefined };
    // @ts-expect-error
    obj10 = { simple: undefined, nested: undefined };
    // @ts-expect-error
    obj10 = { simple: undefined, nested: complexNestedRequiredNested };
    // @ts-expect-error
    obj10 = { simple: complexNestedRequired.simple, nested: undefined };
    obj10 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }
}

function testDeepOmitInPartialObject() {
  let obj1: DeepOmit<ComplexNestedPartial, {}>;
  obj1 = complexNestedRequired;
  obj1 = { simple: complexNestedRequired.simple };

  let obj2: DeepOmit<ComplexNestedPartial, { simple: true }>;
  obj2 = {};
  obj2 = { nested: undefined };
  obj2 = {
    nested: complexNestedUndefined.nested,
  };
  obj2 = { nested: complexNestedRequired.nested };

  let obj2_1: DeepOmit<ComplexNestedPartial, { simple: never }>;
  obj2_1 = {};
  obj2_1 = { nested: undefined };
  obj2_1 = {
    nested: complexNestedUndefined.nested,
  };
  obj2_1 = { nested: complexNestedRequired.nested };

  {
    const {
      nested: { date, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj3: DeepOmit<ComplexNestedPartial, { nested: { date: true } }>;
    obj3 = {};
    obj3 = { simple: undefined };
    obj3 = { nested: undefined };
    obj3 = { simple: undefined, nested: undefined };
    obj3 = { simple: undefined, nested: complexNestedRequiredNested };
    obj3 = { simple: complexNestedRequired.simple, nested: undefined };
    obj3 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { date, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj3_1: DeepOmit<ComplexNestedPartial, { nested: { date: never } }>;
    obj3_1 = {};
    obj3_1 = { simple: undefined };
    obj3_1 = { nested: undefined };
    obj3_1 = { simple: undefined, nested: undefined };
    obj3_1 = { simple: undefined, nested: complexNestedRequiredNested };
    obj3_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj3_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { func, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj4: DeepOmit<ComplexNestedPartial, { nested: { func: true } }>;
    obj4 = {};
    obj4 = { simple: undefined };
    obj4 = { nested: undefined };
    obj4 = { simple: undefined, nested: undefined };
    obj4 = { simple: undefined, nested: complexNestedRequiredNested };
    obj4 = { simple: complexNestedRequired.simple, nested: undefined };
    obj4 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { func, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj4_1: DeepOmit<ComplexNestedPartial, { nested: { func: never } }>;
    obj4_1 = {};
    obj4_1 = { simple: undefined };
    obj4_1 = { nested: undefined };
    obj4_1 = { simple: undefined, nested: undefined };
    obj4_1 = { simple: undefined, nested: complexNestedRequiredNested };
    obj4_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj4_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { array, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj5: DeepOmit<ComplexNestedPartial, { nested: { array: true } }>;
    obj5 = {};
    obj5 = { simple: undefined };
    obj5 = { nested: undefined };
    obj5 = { simple: undefined, nested: undefined };
    obj5 = { simple: undefined, nested: complexNestedRequiredNested };
    obj5 = { simple: complexNestedRequired.simple, nested: undefined };
    obj5 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { array, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj5_1: DeepOmit<ComplexNestedPartial, { nested: { array: never } }>;
    obj5_1 = {};
    obj5_1 = { simple: undefined };
    obj5_1 = { nested: undefined };
    obj5_1 = { simple: undefined, nested: undefined };
    obj5_1 = { simple: undefined, nested: complexNestedRequiredNested };
    obj5_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj5_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { tuple, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj6: DeepOmit<ComplexNestedPartial, { nested: { tuple: true } }>;
    obj6 = {};
    obj6 = { simple: undefined };
    obj6 = { nested: undefined };
    obj6 = { simple: undefined, nested: undefined };
    obj6 = { simple: undefined, nested: complexNestedRequiredNested };
    obj6 = { simple: complexNestedRequired.simple, nested: undefined };
    obj6 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { tuple, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj6_1: DeepOmit<ComplexNestedPartial, { nested: { tuple: never } }>;
    obj6_1 = {};
    obj6_1 = { simple: undefined };
    obj6_1 = { nested: undefined };
    obj6_1 = { simple: undefined, nested: undefined };
    obj6_1 = { simple: undefined, nested: complexNestedRequiredNested };
    obj6_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj6_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { set, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj7: DeepOmit<ComplexNestedPartial, { nested: { set: true } }>;
    obj7 = {};
    obj7 = { simple: undefined };
    obj7 = { nested: undefined };
    obj7 = { simple: undefined, nested: undefined };
    obj7 = { simple: undefined, nested: complexNestedRequiredNested };
    obj7 = { simple: complexNestedRequired.simple, nested: undefined };
    obj7 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { set, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj7_1: DeepOmit<ComplexNestedPartial, { nested: { set: never } }>;
    obj7_1 = {};
    obj7_1 = { simple: undefined };
    obj7_1 = { nested: undefined };
    obj7_1 = { simple: undefined, nested: undefined };
    obj7_1 = { simple: undefined, nested: complexNestedRequiredNested };
    obj7_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj7_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { map, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj8: DeepOmit<ComplexNestedPartial, { nested: { map: true } }>;
    obj8 = {};
    obj8 = { simple: undefined };
    obj8 = { nested: undefined };
    obj8 = { simple: undefined, nested: undefined };
    obj8 = { simple: undefined, nested: complexNestedRequiredNested };
    obj8 = { simple: complexNestedRequired.simple, nested: undefined };
    obj8 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { map, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj8_1: DeepOmit<ComplexNestedPartial, { nested: { map: never } }>;
    obj8_1 = {};
    obj8_1 = { simple: undefined };
    obj8_1 = { nested: undefined };
    obj8_1 = { simple: undefined, nested: undefined };
    obj8_1 = { simple: undefined, nested: complexNestedRequiredNested };
    obj8_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj8_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { promise, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj9: DeepOmit<ComplexNestedPartial, { nested: { promise: true } }>;
    obj9 = {};
    obj9 = { simple: undefined };
    obj9 = { nested: undefined };
    obj9 = { simple: undefined, nested: undefined };
    obj9 = { simple: undefined, nested: complexNestedRequiredNested };
    obj9 = { simple: complexNestedRequired.simple, nested: undefined };
    obj9 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { promise, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj9_1: DeepOmit<ComplexNestedPartial, { nested: { promise: never } }>;
    obj9_1 = {};
    obj9_1 = { simple: undefined };
    obj9_1 = { nested: undefined };
    obj9_1 = { simple: undefined, nested: undefined };
    obj9_1 = { simple: undefined, nested: complexNestedRequiredNested };
    obj9_1 = { simple: complexNestedRequired.simple, nested: undefined };
    obj9_1 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    const {
      nested: { date, array, ...complexNestedRequiredNested },
    } = complexNestedRequired;

    let obj10: DeepOmit<ComplexNestedPartial, { nested: { date: true; array: true } }>;
    obj10 = {};
    obj10 = { simple: undefined };
    obj10 = { nested: undefined };
    obj10 = { simple: undefined, nested: undefined };
    obj10 = { simple: undefined, nested: complexNestedRequiredNested };
    obj10 = { simple: complexNestedRequired.simple, nested: undefined };
    obj10 = { simple: complexNestedRequired.simple, nested: complexNestedRequiredNested };
  }

  {
    type MapType = Map<
      string,
      {
        name: string;
        age: number;
      }
    >;

    // @ts-expect-error ❌ Type 'number' is not assignable to type 'string'
    let map: DeepOmit<MapType, Map<number, { age: true }>>;
  }

  {
    type MapType = Map<
      string,
      {
        name: string;
        age: number;
      }
    >;

    let map: DeepOmit<MapType, Map<string, { name: true }>>;

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

    // @ts-expect-error ❌  Type 'number' is not assignable to type 'string'
    let map: DeepOmit<MapType, ReadonlyMap<number, { age: true }>>;
  }

  {
    type MapType = ReadonlyMap<
      string,
      {
        name: string;
        age: number;
      }
    >;

    let map: DeepOmit<MapType, ReadonlyMap<string, { name: true }>>;

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

    let map: DeepOmit<
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

    let map: DeepOmit<MapType, WeakMap<{ a: string }, { name: true }>>;

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

    let set: DeepOmit<SetType, Set<{ name: true }>>;

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

    let set: DeepOmit<ReadonlySetType, ReadonlySet<{ name: true }>>;

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

    let set: DeepOmit<WeakSetType, WeakSet<{ name: true }>>;

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

    let arr: DeepOmit<ArrayType, Array<{ name: true }>>;

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

    let promise: DeepOmit<PromiseType, Promise<{ name: true }>>;

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
