import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { PublicInterface } from "..";

function testPlainObject() {
  interface Shape {
    area: number;
    perimeter?: number;
  }

  type cases = [
    Assert<IsExact<PublicInterface<{ a: number }>, { a: number }>>,
    Assert<IsExact<PublicInterface<Shape>, { area: number; perimeter?: number }>>,
  ];
}

function testClass() {
  class AllPublic {
    a: number = 0;
    b?: string;
  }

  class WithPrivate {
    private _secret: string = "";
    name: string = "";
  }

  class WithProtected {
    protected _internal: number = 0;
    value: string = "";
  }

  class OnlyPrivate {
    private _a: number = 0;
    protected _b: string = "";
  }

  class WithHashPrivate {
    #secret: string = "";
    name: string = "";
  }

  type cases = [
    Assert<IsExact<PublicInterface<AllPublic>, { a: number; b?: string }>>,
    Assert<IsExact<PublicInterface<WithPrivate>, { name: string }>>,
    Assert<IsExact<PublicInterface<WithProtected>, { value: string }>>,
    Assert<IsExact<PublicInterface<OnlyPrivate>, {}>>,
    Assert<IsExact<PublicInterface<WithHashPrivate>, { name: string }>>,
  ];
}

class DatabaseConnection {
  private pool: string = "";
  async query(_sql: string): Promise<unknown[]> {
    return [];
  }
  async close(): Promise<void> {}
}

function testAssignability() {
  let connection = {} as DatabaseConnection;
  let publicConnection = {} as PublicInterface<DatabaseConnection>;

  // class instance is assignable to its public interface
  publicConnection = connection;

  // @ts-expect-error: PublicInterface<T> is not assignable to T — private members are missing
  connection = publicConnection;

  // plain object without private members is assignable to PublicInterface<T> (core use case)
  publicConnection = { query: async () => [], close: async () => {} };
}
