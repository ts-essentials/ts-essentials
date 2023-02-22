declare const rawArgs: unique symbol;
type RawArgs = typeof rawArgs;

export interface Fn {
  [rawArgs]: unknown;
  args: this[RawArgs] extends infer args ? (args extends unknown[] ? args : never) : never;
  arg0: this[RawArgs] extends [infer arg, ...any] ? arg : never;
  arg1: this[RawArgs] extends [any, infer arg, ...any] ? arg : never;
  arg2: this[RawArgs] extends [any, any, infer arg, ...any] ? arg : never;
  arg3: this[RawArgs] extends [any, any, any, infer arg, ...any] ? arg : never;
  return: unknown;
}

export type Call<Func extends Fn, Arg> = (Func & {
  [rawArgs]: [Arg];
})["return"];
