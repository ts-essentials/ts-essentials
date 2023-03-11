type Join<TKey, TPath> = TKey extends string | number
  ? TPath extends string | number
    ? `${TKey}${"" extends TPath ? "" : "."}${TPath}`
    : never
  : never;

type PreviousIndexMapping = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

type Paths<TObject, TDepth extends number = 10> = [TDepth] extends [never]
  ? never
  : TObject extends object
  ? {
      [TKey in keyof TObject]-?: TKey extends string | number
        ? `${TKey}` | Join<TKey, Paths<TObject[TKey], PreviousIndexMapping[TDepth]>>
        : never;
    }[keyof TObject]
  : "";

export { Paths };
