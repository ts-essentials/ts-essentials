import { Exact } from "../../exact";

export const isExact =
  <ExpectedShape>() =>
  <ActualShape>(x: Exact<ActualShape, ExpectedShape>) =>
    x as ExpectedShape;
