import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { DeepPartial, DeepMarkRequired } from "../lib";

function testDeepMarkRequired() {
  type Teacher = {
    name: string;
    gender: "M" | "F"; // etc
    address: {
      postcode: string;
      city: string;
      street: string;
      apt: string;
    };
  };

  type MaybeTeacher = DeepPartial<Teacher>;

  type cases = [
    Assert<
      IsExact<
        DeepMarkRequired<MaybeTeacher, "address" | "address.city">,
        {
          name?: string;
          gender?: "M" | "F"; // etc
          address: {
            postcode?: string;
            city: string;
            street?: string;
            apt?: string;
          };
        }
      >
    >,
    Assert<
      IsExact<
        DeepMarkRequired<MaybeTeacher, "address.city">,
        {
          name?: string;
          gender?: "M" | "F"; // etc
          address?: {
            postcode?: string;
            city: string;
            street?: string;
            apt?: string;
          };
        }
      >
    >,
  ];
}
