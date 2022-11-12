import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { NonEmptyObject } from "../lib";

function testNonEmptyObject() {
  type ObjectWithKeys = { foo: string; bar: number; xyz: undefined };
  type EmptyObject = {};

  type Cases = [
    Assert<IsExact<NonEmptyObject<ObjectWithKeys>, ObjectWithKeys>>,
    Assert<IsExact<NonEmptyObject<EmptyObject>, never>>,
    // Works with Wrapper Object Types
    Assert<IsExact<NonEmptyObject<String>, String>>,
    Assert<IsExact<NonEmptyObject<Number>, Number>>,
    Assert<IsExact<NonEmptyObject<Boolean>, Boolean>>,
    //   @ts-expect-error
    Assert<IsExact<NonEmptyObject<string>, string>>, // Will Not work as T is a Primitive
    // @ts-expect-error
    Assert<IsExact<NonEmptyObject<number>, number>>, // Will Not work as T is a Primitive
    // @ts-expect-error
    Assert<IsExact<NonEmptyObject<undefined>, number>>, // Will Not work as T is a Primitive
  ];
}
