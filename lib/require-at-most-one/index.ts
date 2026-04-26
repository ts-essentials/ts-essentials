import { AnyRecord } from "../any-record";
import { IsAny } from "../is-any";
import { StrictOmit } from "../strict-omit";

type _RequireAtMostOne<Type extends AnyRecord, Keys extends keyof Type> = {
  [Key in Keys]: Required<Pick<Type, Key>> & Partial<Record<Exclude<Keys, Key>, never>>;
}[Keys] &
  StrictOmit<Type, Keys>;

export type RequireAtMostOne<Type extends AnyRecord, Keys extends keyof Type = keyof Type> = IsAny<Type> extends true
  ? any
  : _RequireAtMostOne<Type, Keys>;
