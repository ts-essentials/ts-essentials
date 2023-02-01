/** Similar to the builtin Extract, but checks the filter strictly */
export type StrictExtract<Type, Union extends Partial<Type>> = Extract<Type, Union>;
