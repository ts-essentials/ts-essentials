/** Useful as a return type in interfaces or abstract classes with missing implementation */
export type AsyncOrSync<Type> = PromiseLike<Type> | Type;
