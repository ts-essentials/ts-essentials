import { OptionalKeys } from "../optional-keys";

export type MarkOptional<Type, Keys extends keyof Type> = Type extends Type
  ? Partial<Type> & Required<Pick<Type, Exclude<keyof Type, Keys | OptionalKeys<Type & object>>>>
  : never;
