import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { OmitNeverProperties } from "../lib";

function testOmitNeverProperties() {
  type TypesMap = { foo: string; bar: number; xyz: undefined };

  type Mapped = {
    [K in keyof TypesMap]: TypesMap[K] extends undefined ? never : TypesMap[K];
  };

  type TestA = Assert<IsExact<keyof Mapped, "foo" | "bar" | "xyz">>;
  type TestB = Assert<IsExact<keyof OmitNeverProperties<Mapped>, "foo" | "bar">>;
}

function testUnions() {
  interface Circle {
    kind: "circle";
    radius: number;
    sideLength?: never;
  }

  interface Square {
    kind: "square";
    radius?: never;
    sideLength: number;
  }

  type Union = Circle | Square;
  type Shape = OmitNeverProperties<Circle | Square>;

  let union: Union;
  // @ts-expect-error: Property 'sideLength' is missing in type '{ kind: "square"; }' but required in type 'Square'
  union = { kind: "square" };
  // @ts-expect-error: Property 'sideLength' is missing in type '{ kind: "square"; radius: number; }' but required in type 'Square'
  union = { kind: "square", radius: 1 };
  union = { kind: "square", sideLength: 2 };
  // @ts-expect-error: Type 'number' is not assignable to type 'undefined'
  union = { kind: "square", radius: 1, sideLength: 2 };
  // @ts-expect-error: Property 'radius' is missing in type '{ kind: "circle"; }' but required in type 'Circle'
  union = { kind: "circle" };
  union = { kind: "circle", radius: 1 };
  // @ts-expect-error: Type '"circle"' is not assignable to type '"square"'
  union = { kind: "circle", sideLength: 2 };
  // @ts-expect-error: Type '"circle"' is not assignable to type '"square"'
  union = { kind: "circle", radius: 1, sideLength: 2 };

  let shape: Shape;
  shape = { kind: "square" };
  shape = { kind: "square", radius: 1 };
  shape = { kind: "square", sideLength: 2 };
  shape = { kind: "square", radius: 1, sideLength: 2 };
  shape = { kind: "circle" };
  shape = { kind: "circle", radius: 1 };
  shape = { kind: "circle", sideLength: 2 };
  shape = { kind: "circle", radius: 1, sideLength: 2 };
}
