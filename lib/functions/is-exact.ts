import { Exact } from "../exact";

export const isExact =
  <Expected>() =>
  <Actual>(actual: Exact<Actual, Expected>): Expected => {
    return actual;
  };
