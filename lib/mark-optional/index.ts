import { OptionalKeys } from "../optional-keys";

export type MarkOptional<Type, Keys extends keyof Type> = Type extends Type
  ? Partial<Type> & Required<Omit<Type, Keys | OptionalKeys<Type>>>
  : never;
