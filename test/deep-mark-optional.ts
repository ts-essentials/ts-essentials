import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepRequired, DeepMarkOptional, Paths, DeepNullable } from "../lib";

function testWithDeepRequired() {
  type Teacher = { address: { postcode: string; city: string } };

  type P0 = DeepMarkOptional<DeepRequired<Teacher>, never>;
  type P1 = DeepMarkOptional<DeepRequired<Teacher>, "address" | "address.city">;
  type P2 = DeepMarkOptional<DeepRequired<Teacher>, "address.city">;
  type P3 = DeepMarkOptional<DeepRequired<Teacher>, "address">;
  type P4 = DeepMarkOptional<DeepRequired<Teacher>, Paths<Teacher>>;

  type cases = [
    Assert<IsExact<P0, { address: { postcode: string; city: string } }>>,
    Assert<IsExact<P1, { address?: { postcode: string; city?: string } }>>,
    Assert<IsExact<P2, { address: { postcode: string; city?: string } }>>,
    Assert<IsExact<P3, { address?: { postcode: string; city: string } }>>,
    Assert<IsExact<P4, { address?: { postcode?: string; city?: string } }>>,
  ];
}

function testWithDeepRequiredAndDeepNullable() {
  type Teacher = { address: { postcode: string; city: string } };

  type P0 = DeepMarkOptional<DeepRequired<DeepNullable<Teacher>>, never>;
  type P1 = DeepMarkOptional<DeepRequired<DeepNullable<Teacher>>, "address" | "address.city">;
  type P2 = DeepMarkOptional<DeepRequired<DeepNullable<Teacher>>, "address.city">;
  type P3 = DeepMarkOptional<DeepRequired<DeepNullable<Teacher>>, "address">;
  type P4 = DeepMarkOptional<DeepRequired<DeepNullable<Teacher>>, Paths<Teacher>>;

  type cases = [
    Assert<IsExact<P0, { address: { postcode: string | null; city: string | null } }>>,
    Assert<IsExact<P1, { address?: { postcode: string | null; city?: string | null } }>>,
    Assert<IsExact<P2, { address: { postcode: string | null; city?: string | null } }>>,
    Assert<IsExact<P3, { address?: { postcode: string | null; city: string | null } }>>,
    Assert<IsExact<P4, { address?: { postcode?: string | null; city?: string | null } }>>,
  ];
}

function testWithUnions() {
  type Teacher = { address: { postcode: string } | { city: string } };

  type P0 = DeepMarkOptional<Teacher, never>;
  type P1 = DeepMarkOptional<Teacher, "address.postcode">;

  type cases = [
    Assert<IsExact<P0, Teacher>>,
    Assert<IsExact<P1, { address: { postcode?: string } | { city: string } }>>,
  ];
}

function preserveNullOnObjects() {
  type Teacher = {
    address: {
      postcode: string;
    } | null;
  };

  type P0 = DeepMarkOptional<Teacher, "address">;
  type P1 = DeepMarkOptional<Teacher, "address.postcode">;
  // @ts-expect-error: non-existing path
  type P2 = DeepMarkOptional<Teacher, "address.postcode1">;

  type cases = [
    Assert<IsExact<P0, { address?: { postcode: string } | null }>>,
    Assert<IsExact<P1, { address: { postcode?: string } | null }>>,
    Assert<IsExact<P2, Teacher>>,
  ];
}

function testRecursiveLimitations() {
  type ObjectOfDepth<
    Depth extends number,
    Accumulator extends any[] = [],
    Result extends object = {},
  > = Accumulator["length"] extends Depth
    ? Result
    : Partial<Record<`l${Accumulator["length"]}`, ObjectOfDepth<Depth, [...Accumulator, 0], Result>>>;

  type O4 = DeepMarkOptional<ObjectOfDepth<5>, "l0.l1.l2.l3.l4">;
  type O5 = DeepMarkOptional<ObjectOfDepth<6>, "l0.l1.l2.l3.l4.l5">;
  type O6 = DeepMarkOptional<ObjectOfDepth<7>, "l0.l1.l2.l3.l4.l5.l6">;
  type O7 = DeepMarkOptional<ObjectOfDepth<8>, "l0.l1.l2.l3.l4.l5.l6.l7">;
  // @ts-expect-error: `depth: 8` is excluded by `Paths`
  type O8 = DeepMarkOptional<ObjectOfDepth<9>, "l0.l1.l2.l3.l4.l5.l6.l7.l8">;

  type cases = [
    Assert<IsExact<O4, { l0?: { l1?: { l2?: { l3?: { l4?: {} } } } } }>>,
    Assert<IsExact<O5, { l0?: { l1?: { l2?: { l3?: { l4?: { l5?: {} } } } } } }>>,
    Assert<IsExact<O6, { l0?: { l1?: { l2?: { l3?: { l4?: { l5?: { l6?: {} } } } } } } }>>,
    Assert<IsExact<O7, { l0?: { l1?: { l2?: { l3?: { l4?: { l5?: { l6?: { l7?: {} } } } } } } } }>>,
  ];
}
