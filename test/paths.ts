import { AssertTrue as Assert, Has } from "conditional-type-checks";
import { Paths } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired, DiscriminatedUnionObject } from "./types";

type Assignable<TLeft, TRight> = TRight extends TLeft ? true : false;

type cases = [
  // required object
  Assert<Has<Paths<ComplexNestedRequired>, "simple">>,
  Assert<Has<Paths<ComplexNestedRequired>, "nested">>,
  Assert<Has<Paths<ComplexNestedRequired>, "nested.date">>,
  Assert<Has<Paths<ComplexNestedRequired>, "nested.func">>,
  Assert<Has<Paths<ComplexNestedRequired>, "nested.array">>,
  // @ts-expect-error: 0.1 cannot be used as key
  Assert<Assignable<Paths<ComplexNestedRequired>, "nested.array.0.1">>,
  Assert<Assignable<Paths<ComplexNestedRequired>, "nested.array.1">>,
  Assert<Has<Paths<ComplexNestedRequired>, `nested.array.${bigint}`>>,
  Assert<Has<Paths<ComplexNestedRequired>, `nested.array.${bigint}.bar`>>,
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
  // partial object
  Assert<Has<Paths<ComplexNestedPartial>, "simple">>,
  Assert<Has<Paths<ComplexNestedPartial>, "nested">>,
  Assert<Has<Paths<ComplexNestedPartial>, "nested.date">>,
  Assert<Has<Paths<ComplexNestedPartial>, "nested.func">>,
  Assert<Has<Paths<ComplexNestedPartial>, "nested.array">>,
  // @ts-expect-error: 0.1 cannot be used as key
  Assert<Assignable<Paths<ComplexNestedPartial>, "nested.array.0.1">>,
  Assert<Assignable<Paths<ComplexNestedPartial>, "nested.array.1">>,
  Assert<Has<Paths<ComplexNestedPartial>, `nested.array.${bigint}`>>,
  Assert<Has<Paths<ComplexNestedPartial>, `nested.array.${bigint}.bar`>>,
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
  // unions
  Assert<Has<Paths<DiscriminatedUnionObject>, "kind">>,
  Assert<Has<Paths<DiscriminatedUnionObject>, "radius">>,
  Assert<Has<Paths<DiscriminatedUnionObject>, "x">>,
  Assert<Has<Paths<DiscriminatedUnionObject>, "y">>,
];
