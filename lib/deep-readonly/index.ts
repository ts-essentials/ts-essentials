import { AnyArray } from "../any-array";
import { CreateTypeOptions } from "../create-type-options";
import { IsNever } from "../is-never";
import { IsTuple } from "../is-tuple";
import { IsUnknown } from "../is-unknown";
import { Primitive } from "../primitive";

type DefaultDeepReadonlyOptions = {
  builtin: {
    date: false;
    error: true;
    regexp: false;
  };
};

type DeepReadonlyOptions = {
  builtin: {
    date: boolean;
    error: boolean;
    regexp: boolean;
  };
};

type ConditionalBuiltin<Options extends Required<DeepReadonlyOptions>> =
  | Primitive
  | Function
  | (Options["builtin"]["error"] extends false ? Error : never)
  | (Options["builtin"]["date"] extends false ? Date : never)
  | (Options["builtin"]["regexp"] extends false ? RegExp : never);

type DeepReadonlyObjectWithOptions<Type, Options extends Required<DeepReadonlyOptions>> = {
  readonly [Key in keyof Type]: Key extends typeof Symbol.iterator
    ? Type[Key] extends () => Iterator<infer IteratorType, infer Return, infer Next>
      ? () => Iterator<
          DeepReadonlyWithOptions<IteratorType, Options>,
          DeepReadonlyWithOptions<Return, Options>,
          DeepReadonlyWithOptions<Next, Options>
        >
      : DeepReadonlyWithOptions<Type[Key], Options>
    : DeepReadonlyWithOptions<Type[Key], Options>;
};

type DeepReadonlyWithOptions<
  Type,
  Options extends Required<DeepReadonlyOptions>,
> = Type extends ConditionalBuiltin<Options>
  ? Type
  : Type extends Map<infer Keys, infer Values>
  ? ReadonlyMap<DeepReadonlyWithOptions<Keys, Options>, DeepReadonlyWithOptions<Values, Options>>
  : Type extends ReadonlyMap<infer Keys, infer Values>
  ? ReadonlyMap<DeepReadonlyWithOptions<Keys, Options>, DeepReadonlyWithOptions<Values, Options>>
  : Type extends WeakMap<infer Keys, infer Values>
  ? WeakMap<DeepReadonlyWithOptions<Keys, Options>, DeepReadonlyWithOptions<Values, Options>>
  : Type extends Set<infer Values>
  ? ReadonlySet<DeepReadonlyWithOptions<Values, Options>>
  : Type extends ReadonlySet<infer Values>
  ? ReadonlySet<DeepReadonlyWithOptions<Values, Options>>
  : Type extends WeakSet<infer Values>
  ? WeakSet<DeepReadonlyWithOptions<Values, Options>>
  : Type extends Promise<infer Value>
  ? Promise<DeepReadonlyWithOptions<Value, Options>>
  : Type extends AnyArray<infer Values>
  ? IsNever<IsTuple<Type>> extends false
    ? DeepReadonlyObjectWithOptions<Type, Options>
    : ReadonlyArray<DeepReadonlyWithOptions<Values, Options>>
  : Type extends {}
  ? DeepReadonlyObjectWithOptions<Type, Options>
  : IsUnknown<Type> extends true
  ? unknown
  : Readonly<Type>;

export type DeepReadonly<
  Type,
  OverrideDeepReadonlyOptions extends { builtin?: Partial<DeepReadonlyOptions["builtin"]> } = {},
> = DeepReadonlyWithOptions<
  Type,
  {
    builtin: CreateTypeOptions<
      DeepReadonlyOptions["builtin"],
      OverrideDeepReadonlyOptions["builtin"] extends {} ? OverrideDeepReadonlyOptions["builtin"] : {},
      DefaultDeepReadonlyOptions["builtin"]
    >;
  }
>;
