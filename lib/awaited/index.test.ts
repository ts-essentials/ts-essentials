import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { Awaited } from "..";

function testAwaitedType() {
  type t1 = Assert<IsExact<Awaited<Promise<number>>, number>>;
}
