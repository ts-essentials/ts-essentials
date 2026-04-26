import { IsExact } from "../../is-exact";

export const isExact =
  <ExpectedShape>() =>
  <ActualShape>(x: IsExact<ActualShape, ExpectedShape>) =>
    x as ExpectedShape;
