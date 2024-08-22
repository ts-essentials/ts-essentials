import { AssertTrue as Assert, Has } from "conditional-type-checks";
import { Paths } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired, DiscriminatedUnionObject } from "./types";

type Assignable<TLeft, TRight> = TRight extends TLeft ? true : false;

function testRequiredObject() {
  type cases = [
    Assert<Has<Paths<ComplexNestedRequired>, "simple">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.date">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.func">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.array">>,
    // It allows float number access
    Assert<Assignable<Paths<ComplexNestedRequired>, "nested.array.0.1">>,
    Assert<Assignable<Paths<ComplexNestedRequired>, "nested.array.1">>,
    Assert<Has<Paths<ComplexNestedRequired>, `nested.array.${number}`>>,
    Assert<Has<Paths<ComplexNestedRequired>, `nested.array.${number}.bar`>>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.tuple">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.tuple.0">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.tuple.1">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.tuple.2">>,
    // @ts-expect-error: key '3' does NOT exist in tuple
    Assert<Has<Paths<ComplexNestedRequired>, "nested.tuple.3">>,
    // @ts-expect-error: key 'good' does NOT exist for string
    Assert<Has<Paths<ComplexNestedRequired>, "nested.tuple.0.good">>,
    // @ts-expect-error: key 'good' does NOT exist for number
    Assert<Has<Paths<ComplexNestedRequired>, "nested.tuple.1.good">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.tuple.2.good">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.set">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.map">>,
    Assert<Has<Paths<ComplexNestedRequired>, "nested.promise">>,
  ];
}

function testPartialObject() {
  type cases = [
    Assert<Has<Paths<ComplexNestedPartial>, "simple">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.date">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.func">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.array">>,
    // It allows float number access
    Assert<Assignable<Paths<ComplexNestedPartial>, "nested.array.0.1">>,
    Assert<Assignable<Paths<ComplexNestedPartial>, "nested.array.1">>,
    Assert<Has<Paths<ComplexNestedPartial>, `nested.array.${number}`>>,
    Assert<Has<Paths<ComplexNestedPartial>, `nested.array.${number}.bar`>>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.tuple">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.tuple.0">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.tuple.1">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.tuple.2">>,
    // @ts-expect-error: key '3' does NOT exist in tuple
    Assert<Has<Paths<ComplexNestedPartial>, "nested.tuple.3">>,
    // @ts-expect-error: key 'good' does NOT exist for string
    Assert<Has<Paths<ComplexNestedPartial>, "nested.tuple.0.good">>,
    // @ts-expect-error: key 'good' does NOT exist for number
    Assert<Has<Paths<ComplexNestedPartial>, "nested.tuple.1.good">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.tuple.2.good">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.set">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.map">>,
    Assert<Has<Paths<ComplexNestedPartial>, "nested.promise">>,
  ];
}

function testUnions() {
  type cases = [
    Assert<Has<Paths<DiscriminatedUnionObject>, "kind">>,
    Assert<Has<Paths<DiscriminatedUnionObject>, "radius">>,
    Assert<Has<Paths<DiscriminatedUnionObject>, "x">>,
    Assert<Has<Paths<DiscriminatedUnionObject>, "y">>,
  ];
}

function testDepth0() {
  type Paths0<Type> = Paths<Type, { depth: 0 }>;

  type cases = [
    Assert<Has<Paths0<ComplexNestedRequired>, "simple">>,
    Assert<Has<Paths0<ComplexNestedRequired>, "nested">>,
    // @ts-expect-error: `depth: 1` is excluded from paths
    Assert<Has<Paths0<ComplexNestedRequired>, "nested.date">>,
    Assert<Has<Paths0<ComplexNestedPartial>, "simple">>,
    Assert<Has<Paths0<ComplexNestedPartial>, "nested">>,
    // @ts-expect-error: `depth: 1` is excluded from paths
    Assert<Has<Paths0<ComplexNestedPartial>, "nested.date">>,
  ];
}

function testDepth1() {
  type Paths1<Type> = Paths<Type, { depth: 1 }>;

  type cases = [
    Assert<Has<Paths1<ComplexNestedRequired>, "simple">>,
    Assert<Has<Paths1<ComplexNestedRequired>, "nested">>,
    Assert<Has<Paths1<ComplexNestedRequired>, "nested.date">>,
    // @ts-expect-error: `depth: 2` is excluded from paths
    Assert<Has<Paths1<ComplexNestedRequired>, "nested.tuple.0">>,
    Assert<Has<Paths1<ComplexNestedPartial>, "simple">>,
    Assert<Has<Paths1<ComplexNestedPartial>, "nested">>,
    Assert<Has<Paths1<ComplexNestedPartial>, "nested.date">>,
    // @ts-expect-error: `depth: 2` is excluded from paths
    Assert<Has<Paths1<ComplexNestedPartial>, "nested.tuple.0">>,
  ];
}

function testDepth2() {
  type Paths2<Type> = Paths<Type, { depth: 2 }>;

  type cases = [
    Assert<Has<Paths2<ComplexNestedRequired>, "simple">>,
    Assert<Has<Paths2<ComplexNestedRequired>, "nested">>,
    Assert<Has<Paths2<ComplexNestedRequired>, "nested.date">>,
    Assert<Has<Paths2<ComplexNestedRequired>, "nested.tuple.0">>,
    // @ts-expect-error: `depth: 3` is excluded from paths
    Assert<Has<Paths2<ComplexNestedPartial>, `nested.array.${number}.bar`>>,
    Assert<Has<Paths2<ComplexNestedPartial>, "simple">>,
    Assert<Has<Paths2<ComplexNestedPartial>, "nested">>,
    Assert<Has<Paths2<ComplexNestedPartial>, "nested.date">>,
    Assert<Has<Paths2<ComplexNestedPartial>, "nested.tuple.0">>,
    // @ts-expect-error: `depth: 3` is excluded from paths
    Assert<Has<Paths2<ComplexNestedPartial>, "nested.tuple.2.good">>,
  ];
}

function testCircularReferences() {
  type ObjectA = {
    b: ObjectB;
  };

  type ObjectB = {
    a: ObjectA;
  };

  type cases = [
    Assert<Has<Paths<ObjectA>, "b">>,
    Assert<Has<Paths<ObjectA>, "b.a">>,
    Assert<Has<Paths<ObjectA>, "b.a.b">>,
    Assert<Has<Paths<ObjectA>, "b.a.b.a">>,
    Assert<Has<Paths<ObjectA>, "b.a.b.a.b">>,
    Assert<Has<Paths<ObjectA>, "b.a.b.a.b.a">>,
    Assert<Has<Paths<ObjectA>, "b.a.b.a.b.a.b">>,
    Assert<Has<Paths<ObjectA>, "b.a.b.a.b.a.b.a">>,
    // @ts-expect-error: `depth: 8` is excluded from paths by default
    Assert<Has<Paths<ObjectA>, "b.a.b.a.b.a.b.a.b">>,
    Assert<Has<Paths<ObjectB>, "a">>,
    Assert<Has<Paths<ObjectB>, "a.b">>,
    Assert<Has<Paths<ObjectB>, "a.b.a">>,
    Assert<Has<Paths<ObjectB>, "a.b.a.b">>,
    Assert<Has<Paths<ObjectB>, "a.b.a.b.a">>,
    Assert<Has<Paths<ObjectB>, "a.b.a.b.a.b">>,
    Assert<Has<Paths<ObjectB>, "a.b.a.b.a.b.a">>,
    Assert<Has<Paths<ObjectB>, "a.b.a.b.a.b.a.b">>,
    // @ts-expect-error: `depth: 8` is excluded from paths by default
    Assert<Has<Paths<ObjectB>, "a.b.a.b.a.b.a.b.a">>,
  ];
}
