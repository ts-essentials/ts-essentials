import { AsyncOrSync } from "./async-or-sync";

export type AsyncOrSyncType<Type> = Type extends AsyncOrSync<infer PT> ? PT : never;
