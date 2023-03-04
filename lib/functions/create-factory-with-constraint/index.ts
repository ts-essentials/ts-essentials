export const createFactoryWithConstraint =
  <Constraint>() =>
  <Value extends Constraint>(value: Value): Value =>
    value;
