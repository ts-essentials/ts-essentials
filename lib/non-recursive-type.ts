import { Builtin } from "./built-in";

// Prevent inference of non-recursive type methods, e.g. Promise.then, Map.get, etc
export type NonRecursiveType = Builtin | Promise<unknown> | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>;
