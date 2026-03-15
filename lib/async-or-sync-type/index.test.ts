import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { AsyncOrSyncType, AsyncOrSync } from "..";

function testAsyncOrSyncType() {
  type cases = [
    Assert<IsExact<AsyncOrSyncType<AsyncOrSync<number>>, number>>,
    Assert<IsExact<AsyncOrSyncType<AsyncOrSync<AsyncOrSync<number>>>, AsyncOrSync<number>>>,
  ];
}
