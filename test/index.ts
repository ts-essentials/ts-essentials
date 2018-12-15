import { IsExactType as IsExact, AssertTrue as Assert } from "conditional-type-checks";
import { DeepReadonly  } from "../lib"

function testDeepReadonly () {
  type Basic = {
    a: number[][]
    nested: {
      a: 1,
    }
    readonlyAlready: ReadonlyArray<number>
  }[]

  type Expected = ReadonlyArray<{
    readonly a: ReadonlyArray<ReadonlyArray<number>>
    readonly nested: {
      readonly a: 1,
    }
    readonly readonlyAlready: ReadonlyArray<number>
  }>

  type Test = Assert<IsExact<DeepReadonly<Basic>, Expected>>;
}

