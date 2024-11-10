import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepPartial, DeepMarkRequired, Paths, DeepNullable } from "../lib";

function testWithDeepPartial() {
  type Teacher = { address: { postcode: string; city: string } };

  type P0 = DeepMarkRequired<DeepPartial<Teacher>, never>;
  type P1 = DeepMarkRequired<DeepPartial<Teacher>, "address" | "address.city">;
  type P2 = DeepMarkRequired<DeepPartial<Teacher>, "address.city">;
  type P3 = DeepMarkRequired<DeepPartial<Teacher>, "address">;
  type P4 = DeepMarkRequired<DeepPartial<Teacher>, Paths<Teacher>>;

  type cases = [
    Assert<IsExact<P0, { address?: { postcode?: string; city?: string } }>>,
    Assert<IsExact<P1, { address: { postcode?: string; city: string } }>>,
    Assert<IsExact<P2, { address?: { postcode?: string; city: string } }>>,
    Assert<IsExact<P3, { address: { postcode?: string; city?: string } }>>,
    Assert<IsExact<P4, Teacher>>,
  ];
}

function testWithDeepPartialAndDeepNullable() {
  type Teacher = { address: { postcode: string; city: string } };

  type P0 = DeepMarkRequired<DeepPartial<DeepNullable<Teacher>>, never>;
  type P1 = DeepMarkRequired<DeepPartial<DeepNullable<Teacher>>, "address" | "address.city">;
  type P2 = DeepMarkRequired<DeepPartial<DeepNullable<Teacher>>, "address.city">;
  type P3 = DeepMarkRequired<DeepPartial<DeepNullable<Teacher>>, "address">;
  type P4 = DeepMarkRequired<DeepPartial<DeepNullable<Teacher>>, Paths<Teacher>>;

  type cases = [
    Assert<IsExact<P0, { address?: { postcode?: string | null; city?: string | null } }>>,
    Assert<IsExact<P1, { address: { postcode?: string | null; city: string | null } }>>,
    Assert<IsExact<P2, { address?: { postcode?: string | null; city: string | null } }>>,
    Assert<IsExact<P3, { address: { postcode?: string | null; city?: string | null } }>>,
    Assert<IsExact<P4, DeepNullable<Teacher>>>,
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

  type O4 = DeepMarkRequired<ObjectOfDepth<5>, "l0.l1.l2.l3.l4">;
  type O5 = DeepMarkRequired<ObjectOfDepth<6>, "l0.l1.l2.l3.l4.l5">;
  type O6 = DeepMarkRequired<ObjectOfDepth<7>, "l0.l1.l2.l3.l4.l5.l6">;
  type O7 = DeepMarkRequired<ObjectOfDepth<8>, "l0.l1.l2.l3.l4.l5.l6.l7">;
  // @ts-expect-error: `depth: 8` is excluded by `Paths`
  type O8 = DeepMarkRequired<ObjectOfDepth<9>, "l0.l1.l2.l3.l4.l5.l6.l7.l8">;

  type cases = [
    Assert<IsExact<O4, { l0?: { l1?: { l2?: { l3?: { l4: {} } } } } }>>,
    Assert<IsExact<O5, { l0?: { l1?: { l2?: { l3?: { l4?: { l5: {} } } } } } }>>,
    Assert<IsExact<O6, { l0?: { l1?: { l2?: { l3?: { l4?: { l5?: { l6: {} } } } } } } }>>,
    Assert<IsExact<O7, { l0?: { l1?: { l2?: { l3?: { l4?: { l5?: { l6?: { l7: {} } } } } } } } }>>,
  ];
}
