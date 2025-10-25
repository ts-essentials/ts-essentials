import { IsExact } from "../is-exact";

/**
 * @deprecated `Exact` will be removed in v11.0. Use `IsExact<TValue,TShape>`
 */
export type Exact<TValue, TShape> = IsExact<TValue, TShape>;
