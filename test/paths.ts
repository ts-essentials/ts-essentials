import { AssertTrue as Assert, Has } from "conditional-type-checks";
import { Paths } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired, DiscriminatedUnionObject } from "./types";

type Assignable<TLeft, TRight> = TRight extends TLeft ? true : false;

function testRequiredObject() {
  type R = Paths<ComplexNestedRequired>;

  type cases = [
    Assert<Has<R, "simple">>,
    Assert<Has<R, "nested">>,
    Assert<Has<R, "nested.date">>,
    Assert<Has<R, "nested.func">>,
    Assert<Has<R, "nested.array">>,
    // It allows float number access
    Assert<Assignable<R, "nested.array.0.1">>,
    Assert<Assignable<R, "nested.array.1">>,
    Assert<Has<R, `nested.array.${number}`>>,
    Assert<Has<R, `nested.array.${number}.bar`>>,
    Assert<Has<R, "nested.tuple">>,
    Assert<Has<R, "nested.tuple.0">>,
    Assert<Has<R, "nested.tuple.1">>,
    Assert<Has<R, "nested.tuple.2">>,
    // @ts-expect-error: key '3' does NOT exist in tuple
    Assert<Has<R, "nested.tuple.3">>,
    // @ts-expect-error: key 'good' does NOT exist for string
    Assert<Has<R, "nested.tuple.0.good">>,
    // @ts-expect-error: key 'good' does NOT exist for number
    Assert<Has<R, "nested.tuple.1.good">>,
    Assert<Has<R, "nested.tuple.2.good">>,
    Assert<Has<R, "nested.set">>,
    Assert<Has<R, "nested.map">>,
    Assert<Has<R, "nested.promise">>,
  ];
}

function testPartialObject() {
  type P = Paths<ComplexNestedPartial>;

  type cases = [
    Assert<Has<P, "simple">>,
    Assert<Has<P, "nested">>,
    Assert<Has<P, "nested.date">>,
    Assert<Has<P, "nested.func">>,
    Assert<Has<P, "nested.array">>,
    // It allows float number access
    Assert<Assignable<P, "nested.array.0.1">>,
    Assert<Assignable<P, "nested.array.1">>,
    Assert<Has<P, `nested.array.${number}`>>,
    Assert<Has<P, `nested.array.${number}.bar`>>,
    Assert<Has<P, "nested.tuple">>,
    Assert<Has<P, "nested.tuple.0">>,
    Assert<Has<P, "nested.tuple.1">>,
    Assert<Has<P, "nested.tuple.2">>,
    // @ts-expect-error: key '3' does NOT exist in tuple
    Assert<Has<P, "nested.tuple.3">>,
    // @ts-expect-error: key 'good' does NOT exist for string
    Assert<Has<P, "nested.tuple.0.good">>,
    // @ts-expect-error: key 'good' does NOT exist for number
    Assert<Has<P, "nested.tuple.1.good">>,
    Assert<Has<P, "nested.tuple.2.good">>,
    Assert<Has<P, "nested.set">>,
    Assert<Has<P, "nested.map">>,
    Assert<Has<P, "nested.promise">>,
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

function testCircularReferences() {
  type ObjectA = {
    b: ObjectB;
  };

  type ObjectB = {
    a: ObjectA;
  };

  type A = Paths<ObjectA>;
  type B = Paths<ObjectB>;

  type cases = [
    Assert<Has<A, "b">>,
    Assert<Has<A, "b.a">>,
    Assert<Has<A, "b.a.b">>,
    Assert<Has<A, "b.a.b.a">>,
    Assert<Has<A, "b.a.b.a.b">>,
    Assert<Has<A, "b.a.b.a.b.a">>,
    Assert<Has<A, "b.a.b.a.b.a.b">>,
    Assert<Has<A, "b.a.b.a.b.a.b.a">>,
    // @ts-expect-error: `depth: 8` is excluded from paths by default
    Assert<Has<A, "b.a.b.a.b.a.b.a.b">>,
    // @ts-expect-error: `depth: 8` is excluded from paths by default
    Assert<Assignable<A, "b.a.b.a.b.a.b.a.b">>,
    Assert<Has<B, "a">>,
    Assert<Has<B, "a.b">>,
    Assert<Has<B, "a.b.a">>,
    Assert<Has<B, "a.b.a.b">>,
    Assert<Has<B, "a.b.a.b.a">>,
    Assert<Has<B, "a.b.a.b.a.b">>,
    Assert<Has<B, "a.b.a.b.a.b.a">>,
    Assert<Has<B, "a.b.a.b.a.b.a.b">>,
    // @ts-expect-error: `depth: 8` is excluded from paths by default
    Assert<Has<B, "a.b.a.b.a.b.a.b.a">>,
    // @ts-expect-error: `depth: 8` is excluded from paths by default
    Assert<Assignable<B, "a.b.a.b.a.b.a.b.a">>,
  ];
}

function testDepth0() {
  type Paths0<Type> = Paths<Type, { depth: 0 }>;

  type R = Paths0<ComplexNestedRequired>;
  type P = Paths0<ComplexNestedPartial>;

  type cases = [
    Assert<Has<R, "simple">>,
    Assert<Has<R, "nested">>,
    // @ts-expect-error: `depth: 1` is excluded from paths
    Assert<Has<R, "nested.date">>,
    // @ts-expect-error: `depth: 1` is excluded from paths
    Assert<Assignable<R, "nested.date">>,
    Assert<Has<P, "simple">>,
    Assert<Has<P, "nested">>,
    // @ts-expect-error: `depth: 1` is excluded from paths
    Assert<Has<P, "nested.date">>,
    // @ts-expect-error: `depth: 1` is excluded from paths
    Assert<Assignable<P, "nested.date">>,
  ];
}

function testDepth1() {
  type Paths1<Type> = Paths<Type, { depth: 1 }>;

  type R = Paths1<ComplexNestedRequired>;
  type P = Paths1<ComplexNestedPartial>;

  type cases = [
    Assert<Has<R, "simple">>,
    Assert<Has<R, "nested">>,
    Assert<Has<R, "nested.date">>,
    // @ts-expect-error: `depth: 2` is excluded from paths
    Assert<Has<R, "nested.tuple.0">>,
    // @ts-expect-error: `depth: 2` is excluded from paths
    Assert<Assignable<R, "nested.tuple.0">>,
    Assert<Has<P, "simple">>,
    Assert<Has<P, "nested">>,
    Assert<Has<P, "nested.date">>,
    // @ts-expect-error: `depth: 2` is excluded from paths
    Assert<Has<P, "nested.tuple.0">>,
    // @ts-expect-error: `depth: 2` is excluded from paths
    Assert<Assignable<P, "nested.tuple.0">>,
  ];
}

function testDepth2() {
  type Paths2<Type> = Paths<Type, { depth: 2 }>;

  type R = Paths2<ComplexNestedRequired>;
  type P = Paths2<ComplexNestedPartial>;

  type cases = [
    Assert<Has<R, "simple">>,
    Assert<Has<R, "nested">>,
    Assert<Has<R, "nested.date">>,
    Assert<Has<R, "nested.tuple.0">>,
    // @ts-expect-error: `depth: 3` is excluded from paths
    Assert<Has<R, `nested.array.${number}.bar`>>,
    // @ts-expect-error: `depth: 3` is excluded from paths
    Assert<Assignable<R, `nested.array.${number}.bar`>>,
    Assert<Has<P, "simple">>,
    Assert<Has<P, "nested">>,
    Assert<Has<P, "nested.date">>,
    Assert<Has<P, "nested.tuple.0">>,
    // @ts-expect-error: `depth: 3` is excluded from paths
    Assert<Has<P, "nested.tuple.2.good">>,
    // @ts-expect-error: `depth: 3` is excluded from paths
    Assert<Assignable<P, "nested.tuple.2.good">>,
  ];
}

/**
 * Configuration allows wildcard accessors for array indices.
 */
function testAnyArrayIndexAccessor() {
  type With = Paths<ComplexNestedRequired, { anyArrayIndexAccessor: "*" }>;
  type Without = Paths<ComplexNestedRequired>;

  type cases_with_any_accessor = [
    Assert<Has<With, "nested.array.*">>,
    Assert<Has<With, "nested.array.*.bar">>,
    Assert<Has<With, `nested.array.${number}`>>,
    Assert<Has<With, `nested.array.${number}.bar`>>,
    Assert<Has<With, "nested.tuple.0">>,
    Assert<Has<With, "nested.tuple.2.good">>,
    // @ts-expect-error: tuples should not be wildcard-able
    Assert<Has<With, "nested.tuple.*">>,
    // @ts-expect-error: tuples should not be wildcard-able
    Assert<Has<With, "nested.tuple.*.good">>,
  ];

  type cases_without_any_accessor = [
    // @ts-expect-error: anyArrayIndexAccessor is not configured
    Assert<Has<Without, "nested.array.*">>,
    // @ts-expect-error: anyArrayIndexAccessor is not configured
    Assert<Has<Without, "nested.array.*.bar">>,
  ];
}
