import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { StrictExtract } from "../lib";
import { TsVersion } from "./ts-version";

function testStrictExtract() {
  interface Dog {
    type: "dog";
    woof(): void;
  }

  interface Cat {
    type: "cat";
    meow(): void;
  }

  interface Mouse {
    type: "mouse";
    squeak(): void;
  }

  type Animal = Dog | Cat | Mouse;

  type cases = [
    // @ts-expect-error
    StrictExtract<Animal, undefined>,
    Assert<IsExact<StrictExtract<Animal, never>, never>>,
    Assert<IsExact<StrictExtract<Animal, { type: undefined }>, never>>,
    Assert<IsExact<StrictExtract<Animal, { type: never }>, never>>,
    // @ts-expect-error
    StrictExtract<Animal, "dog">,
    Assert<IsExact<StrictExtract<Animal, { type: "dog" }>, Dog>>,
    // @ts-expect-error
    StrictExtract<Animal, "cat">,
    Assert<IsExact<StrictExtract<Animal, { type: "cat" }>, Cat>>,
    // @ts-expect-error
    StrictExtract<Animal, "mouse">,
    Assert<IsExact<StrictExtract<Animal, { type: "mouse" }>, Mouse>>,
    // @ts-expect-error
    StrictExtract<Animal, "cat" | "dog">,
    Assert<
      IsExact<
        StrictExtract<
          Animal,
          TsVersion extends "4.1" | "4.2" | "4.3" | "4.4" | "4.5"
            ? { type: "cat" | "dog" }
            : { type: "cat" } | { type: "dog" }
        >,
        Cat | Dog
      >
    >,
    Assert<IsExact<StrictExtract<Animal, { type: "cat" } | { type: "dog" }>, Cat | Dog>>,
    // @ts-expect-error
    StrictExtract<Animal, "cat" | "dog" | "mouse">,
    Assert<
      IsExact<
        StrictExtract<
          Animal,
          TsVersion extends "4.1" | "4.2" | "4.3" | "4.4" | "4.5"
            ? { type: "cat" | "dog" | "mouse" }
            : { type: "cat" } | { type: "dog" } | { type: "mouse" }
        >,
        Animal
      >
    >,
    Assert<IsExact<StrictExtract<Animal, { type: "cat" } | { type: "dog" } | { type: "mouse" }>, Animal>>,
  ];
}
