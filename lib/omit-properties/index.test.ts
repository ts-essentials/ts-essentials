import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { OmitProperties } from "..";

function testOmitProperties() {
  type cases = [
    Assert<IsExact<OmitProperties<{}, never>, {}>>,
    Assert<IsExact<OmitProperties<{ a: 1 }, never>, { a: 1 }>>,
    Assert<IsExact<OmitProperties<{ a?: 1 }, never>, { a?: 1 }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, number>, { b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, number | undefined>, { b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, string>, { a: 1; b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, string | undefined>, { a: 1; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, boolean>, { a: 1; b?: "2" }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, boolean | undefined>, { a: 1; b?: "2" }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, undefined>, { a: 1; b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, boolean | string>, { a: 1; b?: "2" }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, number | boolean>, { b?: "2" }>>,
    Assert<IsExact<OmitProperties<{ a: 1; b?: "2"; c: false }, number | string>, { b?: "2"; c: false }>>,
    Assert<IsExact<OmitProperties<{ a: string; b: number[] }, any[]>, { a: string }>>,
    Assert<IsExact<OmitProperties<{ a: string; b: number }, any[]>, { a: string; b: number }>>,
  ];
}
