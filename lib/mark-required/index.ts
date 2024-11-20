import { Prettify } from "../prettify";

export type MarkRequired<Type, Keys extends keyof Type> = Type extends Type
  ? Prettify<Type & Required<Pick<Type, Keys>>>
  : never;
