import { Builtin } from "../built-in";
import { IsAny } from "../is-any";
import { IsNever } from "../is-never";
import { CreateTypeOptions } from "../create-type-options";
import { ValueOf } from "../value-of";

type Pathable = string | number;

// Prevent inference of non-recursive type methods, e.g. Promise.then, Map.get, etc
type NonRecursiveType = Builtin | Promise<unknown> | ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>;

type DefaultRecursivePathsOptions = {
  depth: [];
};

/**
 * @param depth This option counts the number of recursive calls in
 * `RecursivePathsOptions['depth']['length']`. Used in combination with
 * `PathsOptions['depth']`
 */
type RecursivePathsOptions = {
  depth: any[];
};

/**
 * @param depth By default, the depth option is set to 7. It should cover the
 * majority of use cases. If by any chance it doesn't fit you, feel free to
 * increase the value. However, this may increase the chance of getting
 * `Type instantiation is excessively deep and possibly infinite` error.
 */
type DefaultPathsOptions = {
  depth: 7;
};

/**
 * @param depth This option restricts the depth of the paths lookup and removes `Type
 * instantiation is excessively deep and possibly infinite` errors for
 * potentially infinite types.
 */
type PathsOptions = {
  depth: number;
};

type Append<Tuple extends any[]> = [...Tuple, 0];

type RecursivePaths<
  Type,
  UserOptions extends Required<PathsOptions>,
  CallOptions extends RecursivePathsOptions,
> = IsNever<keyof Type> extends true
  ? never
  : // `NonNullable` removes `undefined` when partial properties exist in object
    NonNullable<
      ValueOf<{
        [Key in keyof Type]: Key extends Pathable
          ?
              | `${Key}`
              | (CallOptions["depth"]["length"] extends UserOptions["depth"]
                  ? // Stop at the configured depth
                    never
                  : Type[Key] extends infer Value
                  ? Value extends Value
                    ? // Avoid calling `UnsafePaths` to keep `CallOptions` locally
                      HasParsablePath<Value> extends true
                      ? RecursivePaths<
                          Value,
                          UserOptions,
                          {
                            depth: Append<CallOptions["depth"]>;
                          }
                        > extends infer Rest
                        ? IsNever<Rest> extends true
                          ? never
                          : `${Key}.${Rest & string}`
                        : never
                      : never
                    : never
                  : never)
          : never;
      }>
    >;

type HasParsablePath<Type> = Type extends NonRecursiveType
  ? false
  : IsAny<Type> extends true
  ? false
  : Type extends object
  ? true
  : false;

type UnsafePaths<Type, Options extends Required<PathsOptions>> = Type extends Type
  ? HasParsablePath<Type> extends true
    ? RecursivePaths<Type, Options, DefaultRecursivePathsOptions>
    : never
  : never;

export type Paths<Type, OverridePathOptions extends Partial<PathsOptions> = {}> = UnsafePaths<
  Type,
  CreateTypeOptions<PathsOptions, OverridePathOptions, DefaultPathsOptions>
>;
