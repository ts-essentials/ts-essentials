import { Call, Fn } from ".";
import { Builtin } from "../built-in";
import { IsTuple } from "../is-tuple";
import { IsUnknown } from "../is-unknown";

export interface BuiltinExtractor extends Fn {
  return: this["arg0"] extends Builtin ? this["arg0"] : never;
}

export interface MapExtractor extends Fn {
  return: this["arg0"] extends Map<infer Keys, infer Values> ? [Keys, Values] : never;
}

export interface ReadonlyMapExtractor extends Fn {
  return: this["arg0"] extends ReadonlyMap<infer Keys, infer Values> ? [Keys, Values] : never;
}

export interface WeakMapExtractor extends Fn {
  return: this["arg0"] extends WeakMap<infer Keys, infer Values> ? [Keys, Values] : never;
}

export interface SetExtractor extends Fn {
  return: this["arg0"] extends Set<infer Values> ? [Values] : never;
}

export interface ReadonlySetExtractor extends Fn {
  return: this["arg0"] extends ReadonlySet<infer Values> ? [Values] : never;
}

export interface WeakSetExtractor extends Fn {
  return: this["arg0"] extends WeakSet<infer Values> ? [Values] : never;
}

export interface TupleExtractor extends Fn {
  return: this["arg0"] extends IsTuple<this["arg0"]> ? [this["arg0"]] : never;
}

export interface ArrayExtractor extends Fn {
  return: this["arg0"] extends Array<any>
    ? Call<TupleExtractor, this["arg0"]> extends false
      ? [this["arg0"]]
      : never
    : never;
}

export interface PromiseExtractor extends Fn {
  return: this["arg0"] extends Promise<infer Value> ? [Value] : never;
}

export interface UnknownExtractor extends Fn {
  return: IsUnknown<this["arg0"]> extends true ? [this["arg0"]] : never;
}

export interface OtherwiseExtractor extends Fn {
  return: this["arg0"];
}

export type ExtractorMap = {
  builtin: BuiltinExtractor;
  map: MapExtractor;
  readonlyMap: ReadonlyMapExtractor;
  weakMap: WeakMapExtractor;
  set: SetExtractor;
  readonlySet: ReadonlySetExtractor;
  weakSet: WeakSetExtractor;
  tuple: TupleExtractor;
  array: ArrayExtractor;
  promise: PromiseExtractor;
  unknown: UnknownExtractor;
  otherwise: OtherwiseExtractor;
};

export type DeepExtractorBase = Record<keyof ExtractorMap, Fn>;

export type CreateDeepResolver<DeepResolver extends DeepExtractorBase> = DeepResolver;

export type GetExtractorKey<Extractor> = keyof {
  [Key in keyof ExtractorMap as ExtractorMap[Key] extends Extractor ? Key : never]: never;
};

export type DeepExtractors = [
  BuiltinExtractor,
  MapExtractor,
  ReadonlyMapExtractor,
  WeakMapExtractor,
  SetExtractor,
  ReadonlySetExtractor,
  WeakSetExtractor,
  TupleExtractor,
  ArrayExtractor,
  PromiseExtractor,
  UnknownExtractor,
  OtherwiseExtractor,
];
