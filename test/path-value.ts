import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { PathValue } from "../lib";
import { ComplexNestedPartial, ComplexNestedRequired } from "./types";

function testTypes() {
  type cases = [
    // required object
    Assert<IsExact<PathValue<ComplexNestedRequired, "simple">, number>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.date">, Date>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.func">, () => string>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.array">, { bar: number }[]>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.array.0">, { bar: number } | undefined>>,
    // @ts-expect-error: 0.1 cannot be used as key
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.array.0.1">, { bar: number }>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.array.10">, { bar: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.array.100">, { bar: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.array.1000">, { bar: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.array.10000">, { bar: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.array.100000">, { bar: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, `nested.array.0.bar`>, number | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.tuple.0">, string>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.tuple.1">, number>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.tuple.2">, { good: boolean }>>,
    // @ts-expect-error: key '3' does NOT exist in tuple
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.tuple.3">, { good: boolean }>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.tuple.2.good">, boolean>>,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.set">, Set<{ name: string }>>>,
    Assert<
      IsExact<
        PathValue<ComplexNestedRequired, "nested.map">,
        Map<
          string,
          {
            name: string;
          }
        >
      >
    >,
    Assert<IsExact<PathValue<ComplexNestedRequired, "nested.promise">, Promise<{ foo: string; bar: number }>>>,
    // partial object
    Assert<IsExact<PathValue<ComplexNestedPartial, "simple">, number | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.date">, Date | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.func">, (() => string) | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array">, ({ bar?: number } | undefined)[] | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array.0">, { bar?: number } | undefined>>,
    // @ts-expect-error: 0.1 is not a valid key
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array.0.1">, { bar?: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array.10">, { bar?: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array.100">, { bar?: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array.1000">, { bar?: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array.10000">, { bar?: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array.100000">, { bar?: number } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.array.0.bar">, number | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.tuple.0">, string | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.tuple.1">, number | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.tuple.2">, { good?: boolean } | undefined>>,
    // @ts-expect-error: key '3' does NOT exist in tuple
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.tuple.3">, { good?: boolean } | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.tuple.2.good">, boolean | undefined>>,
    Assert<IsExact<PathValue<ComplexNestedPartial, "nested.set">, Set<{ name?: string }> | undefined>>,
    Assert<
      IsExact<
        PathValue<ComplexNestedPartial, "nested.map">,
        | Map<
            string,
            {
              name?: string;
            }
          >
        | undefined
      >
    >,
    Assert<
      IsExact<PathValue<ComplexNestedPartial, "nested.promise">, Promise<{ foo?: string; bar?: number }> | undefined>
    >,
  ];
}

function testInterfacesAtOneLevel() {
  interface Company {
    name: string;
    employees: { name: string }[];
  }

  function get<Type, StringPath extends string>(obj: Type, path: `${StringPath}`): PathValue<Type, StringPath>;
  function get<Type>(obj: Type, path: string) {
    const keys = (path as string).split(".") as (keyof Type)[];

    return keys.reduce((acc, key) => acc?.[key] as unknown as Type, obj);
  }

  const company = {} as Company;

  const companyName = get(company, "name");
  const companyEmployees = get(company, "employees");
  const companyEmployee = get(company, "employees.0");
  const companyEmployeeName = get(company, "employees.0.name");

  type cases = [
    Assert<IsExact<PathValue<Company, `name`>, string>>,
    Assert<IsExact<PathValue<Company, `employees`>, { name: string }[]>>,
    Assert<IsExact<PathValue<Company, `employees.0`>, { name: string } | undefined>>,
    Assert<IsExact<PathValue<Company, `employees.0.name`>, string | undefined>>,
    Assert<IsExact<typeof companyName, string>>,
    Assert<IsExact<typeof companyEmployees, { name: string }[]>>,
    Assert<IsExact<typeof companyEmployee, { name: string } | undefined>>,
    Assert<IsExact<typeof companyEmployeeName, string | undefined>>,
  ];
}

function testInterfacesAtMultipleLevels() {
  interface Employee {
    name: string;
  }

  interface Company {
    name: string;
    employees: Employee[];
  }

  function get<Type, StringPath extends string>(obj: Type, path: `${StringPath}`): PathValue<Type, StringPath>;
  function get<Type>(obj: Type, path: string) {
    const keys = (path as string).split(".") as (keyof Type)[];

    return keys.reduce((acc, key) => acc?.[key] as unknown as Type, obj);
  }

  const company = {} as Company;

  const companyName = get(company, "name");
  const companyEmployees = get(company, "employees");
  const companyEmployee = get(company, "employees.0");
  const companyEmployeeName = get(company, "employees.0.name");

  type cases = [
    Assert<IsExact<PathValue<Company, `name`>, string>>,
    Assert<IsExact<PathValue<Company, `employees`>, Employee[]>>,
    Assert<IsExact<PathValue<Company, `employees.0`>, Employee | undefined>>,
    Assert<IsExact<PathValue<Company, `employees.0.name`>, string | undefined>>,
    Assert<IsExact<typeof companyName, string>>,
    Assert<IsExact<typeof companyEmployees, Employee[]>>,
    Assert<IsExact<typeof companyEmployee, Employee | undefined>>,
    Assert<IsExact<typeof companyEmployeeName, string | undefined>>,
  ];
}
