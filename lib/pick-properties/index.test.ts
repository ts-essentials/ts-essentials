import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { PickProperties } from "..";

function testPickProperties() {
  type cases = [
    Assert<IsExact<PickProperties<{}, never>, {}>>,
    Assert<IsExact<PickProperties<{ a: 1 }, never>, {}>>,
    Assert<IsExact<PickProperties<{ a?: 1 }, never>, {}>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, number>, { a: 1 }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, number | undefined>, { a: 1 }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, string>, {}>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, string | undefined>, { b?: "2" }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, boolean>, { c: false }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, boolean | undefined>, { c: false }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, undefined>, {}>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, boolean | string>, { c: false }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, number | boolean>, { a: 1; c: false }>>,
    Assert<IsExact<PickProperties<{ a: 1; b?: "2"; c: false }, number | string>, { a: 1 }>>,
    Assert<IsExact<PickProperties<{ a: string; b: number[] }, any[]>, { b: number[] }>>,
    Assert<IsExact<PickProperties<{ a: string; b: number }, any[]>, {}>>,
  ];
}
