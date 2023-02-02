import { Exact } from "../exact";

export const isExact =
  <Expected>() =>
  <Type>(value: Exact<Type, Expected>): Expected => {
    return value;
  };
