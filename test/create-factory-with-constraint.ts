import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { createFactoryWithConstraint } from "../lib";

function testCreateFactoryWithConstraint() {
  type ABC = { a: number; b: number; c: number };
  type BC = { b: number; c: number };
  type BC2 = { b: number; c: string };

  let bc2: BC2 = { b: 2, c: "3" };
  let bc4 = { b: 2, c: "3" } as const;

  const createAtLeastBC = createFactoryWithConstraint<BC>();

  // ABC extends BC
  const abc1 = createAtLeastBC({ a: 1, b: 2, c: 3 });
  const abc2 = createAtLeastBC({ a: 1, b: 2, c: 3 } as const);

  // BC extends BC
  const bc1 = createAtLeastBC({ b: 2, c: 3 });
  const bc3 = createAtLeastBC({ b: 2, c: 3 } as const);

  // C in BC2 isn't assignable to C from BC
  // @ts-expect-error has different structure from BC (c has different type)
  createAtLeastBC(bc2);
  // @ts-expect-error has different structure from BC (c has different type)
  createAtLeastBC(bc4);

  // C doesn't extend BC
  // @ts-expect-error has different structure from BC (missing property b)
  createAtLeastBC({ c: 3 });
  // @ts-expect-error has different structure from BC (missing property b)
  createAtLeastBC({ c: 3 } as const);

  type cases = [
    Assert<IsExact<typeof abc1, ABC>>,
    Assert<IsExact<typeof abc2, { readonly a: 1; readonly b: 2; readonly c: 3 }>>,
    Assert<IsExact<typeof bc1, BC>>,
    Assert<IsExact<typeof bc3, { readonly b: 2; readonly c: 3 }>>,
  ];
}
