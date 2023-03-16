// A helper for `ReadonlyKeys` & `WritableKeys`
// This potentially abuses compiler some inconsistencies in checking type equality for generics,
// because normally `readonly` doesn't affect whether types are assignable.
// @see https://stackoverflow.com/a/52473108/1815209 with comments
export type IsEqualConsideringWritability<OriginalType, WritableType> = (<Type>() => Type extends OriginalType
  ? 1
  : 2) extends <Type>() => Type extends WritableType ? 1 : 2
  ? true
  : false;
