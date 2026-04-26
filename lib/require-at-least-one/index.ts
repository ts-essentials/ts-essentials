import { AnyRecord } from "../any-record";
import { IsAny } from "../is-any";
import { StrictOmit } from "../strict-omit";

type _RequireAtLeastOne<Type extends AnyRecord, Keys extends keyof Type> = {
  [Key in Keys]: Required<Pick<Type, Key>>;
}[Keys] &
  StrictOmit<Type, Keys>;

export type RequireAtLeastOne<Type extends AnyRecord, Keys extends keyof Type = keyof Type> = IsAny<Type> extends true
  ? any
  : _RequireAtLeastOne<Type, Keys>;
