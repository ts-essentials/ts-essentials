import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Writable } from "..";

function testWritable() {
  type cases = [
    Assert<IsExact<Writable<{}>, {}>>,
    Assert<IsExact<Writable<{ readonly a: number }>, { a: number }>>,
    Assert<IsExact<Writable<{ a: number }>, { a: number }>>,
    Assert<IsExact<Writable<[1, 2, 3]>, [1, 2, 3]>>,
    Assert<IsExact<Writable<readonly [1, 2, 3]>, [1, 2, 3]>>,
    Assert<IsExact<Writable<number[]>, number[]>>,
    Assert<IsExact<Writable<readonly number[]>, number[]>>,
  ];
}
