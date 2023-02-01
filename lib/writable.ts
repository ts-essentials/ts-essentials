/** Make readonly object writable */
export type Writable<Type> = { -readonly [P in keyof Type]: Type[P] };
