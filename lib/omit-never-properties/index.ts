import { NonNever } from "../non-never";

export type OmitNeverProperties<Type extends {}> = NonNever<Type>;
