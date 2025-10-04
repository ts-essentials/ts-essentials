import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { IsNever, NonUnion } from "../lib";

function testUnionMembers() {
  type assertions = [
    Assert<IsExact<NonUnion<any>, any>>,
    Assert<IsExact<NonUnion<unknown>, unknown>>,
    Assert<IsNever<NonUnion<never>>>,
    // primitives are not unions
    Assert<IsExact<NonUnion<string>, string>>,
    Assert<IsExact<NonUnion<number>, number>>,
    Assert<IsExact<NonUnion<null>, null>>,
    Assert<IsExact<NonUnion<undefined>, undefined>>,
    // objects, arrays and more complex types are not unions either
    Assert<IsExact<NonUnion<Date>, Date>>,
    Assert<IsExact<NonUnion<{}>, {}>>,
    Assert<IsExact<NonUnion<{ a: string }>, { a: string }>>,
    Assert<IsExact<NonUnion<string[]>, string[]>>,
    Assert<IsExact<NonUnion<Array<{ a: string }>>, Array<{ a: string }>>>,
    Assert<IsExact<NonUnion<Function>, Function>>,
    Assert<IsExact<NonUnion<() => void>, () => void>>,
    // unions are reduced to `never`
    Assert<IsNever<NonUnion<boolean>>>, // boolean is a union of `true | false`
    Assert<IsNever<NonUnion<string | number>>>,
    Assert<IsNever<NonUnion<{ a: string } | { b: number }>>>,
    Assert<IsNever<NonUnion<string | { a: string }>>>,
  ];
}

function testFunctionParameter() {
  type EventPayload = {
    start: { ms: number };
    stop: { reason: string };
    report: { crashed: boolean };
  };

  function dispatch1<Type extends keyof EventPayload>(type: Type, data: EventPayload[Type]): void;
  function dispatch1(type: string, data: unknown): void {
    console.log(type, data);
  }

  dispatch1("start", { ms: 1 });
  dispatch1("stop", { reason: "closed" });
  dispatch1("report", { crashed: true });

  const type = "" as keyof EventPayload;

  dispatch1(type, { ms: 1 });

  function dispatch2<Type extends keyof EventPayload>(type: NonUnion<Type>, data: EventPayload[Type]): void;
  function dispatch2(type: string, data: unknown): void {
    console.log(type, data);
  }

  dispatch2("start", { ms: 1 });
  dispatch2("stop", { reason: "closed" });
  dispatch2("report", { crashed: true });

  // @ts-expect-error: Type '"start"' is not assignable to type 'never'
  dispatch2(type, { ms: 1 });
}
