export type AnyThisFunction<ThisType, Args extends any[] = any[], ReturnType = any> = (
  this: ThisType,
  ...args: Args
) => ReturnType;
