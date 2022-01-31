import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Get } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";

type cases = [
  // required object
  Assert<IsExact<Get<ComplexNestedRequired, "simple">, number>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.date">, Date>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.func">, () => string>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.array">, { bar: number }[]>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.array.0">, { bar: number } | undefined>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.array.0.bar">, number | undefined>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.tuple.0">, string>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.tuple.1">, number>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.tuple.2">, { good: boolean }>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.tuple.2.good">, boolean>>,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.set">, Set<{ name: string }>>>,
  Assert<
    IsExact<
      Get<ComplexNestedRequired, "nested.map">,
      Map<
        string,
        {
          name: string;
        }
      >
    >
  >,
  Assert<IsExact<Get<ComplexNestedRequired, "nested.promise">, Promise<{ foo: string; bar: number }>>>,
  // partial object
  Assert<IsExact<Get<ComplexNestedPartial, "simple">, number | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.date">, Date | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.func">, (() => string) | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.array">, ({ bar?: number } | undefined)[] | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.array.0">, { bar?: number } | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.array.0.bar">, number | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.tuple.0">, string | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.tuple.1">, number | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.tuple.2">, { good?: boolean } | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.tuple.2.good">, boolean | undefined>>,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.set">, Set<{ name?: string }> | undefined>>,
  Assert<
    IsExact<
      Get<ComplexNestedPartial, "nested.map">,
      | Map<
          string,
          {
            name?: string;
          }
        >
      | undefined
    >
  >,
  Assert<IsExact<Get<ComplexNestedPartial, "nested.promise">, Promise<{ foo?: string; bar?: number }> | undefined>>,
];
