import { IsFullyWritable } from "../is-fully-writable";
import { IsTuple } from "../is-tuple";

export type ReadonlyKeys<Type extends object> = Type extends unknown
  ? keyof {
      [Key in keyof Type as IsFullyWritable<Pick<Type, Key>> extends true ? never : Key]: any;
    } &
      (Type extends ReadonlyArray<any> ? (Type extends IsTuple<Type> ? `${number}` : number) : unknown)
  : never;
