interface ExtendedArray<T> extends Array<T> {}

export type ComplexNestedRequired = {
  simple: number;
  nested: {
    date: Date;
    func: () => string;
    array: { bar: number }[];
    readonlyArray: ReadonlyArray<{ bar: number }>;
    extendedArray: ExtendedArray<{ bar: number }>;
    tuple: [string, number, { good: boolean }];
    set: Set<{ name: string }>;
    map: Map<
      string,
      {
        name: string;
      }
    >;
    promise: Promise<{ foo: string; bar: number }>;
  };
};

export type ComplexNestedPartial = {
  simple?: number;
  nested?: {
    date?: Date;
    func?: () => string;
    array?: ({ bar?: number } | undefined)[];
    readonlyArray?: ReadonlyArray<{ bar?: number } | undefined>;
    extendedArray?: ExtendedArray<{ bar?: number } | undefined>;
    set?: Set<{ name?: string }>;
    tuple?: [string?, number?, { good?: boolean }?];
    map?: Map<
      string,
      {
        name?: string;
      }
    >;
    promise?: Promise<{ foo?: string; bar?: number }>;
  };
};

export type ComplexNestedReadonly = {
  readonly simple: number;
  readonly nested: {
    readonly date: Date;
    readonly func: () => string;
    readonly array: readonly { readonly bar: number }[];
    readonly readonlyArray: ReadonlyArray<{ readonly bar: number }>;
    readonly extendedArray: ReadonlyArray<{ readonly bar: number }>;
    readonly tuple: readonly [string, number, { readonly good: boolean }];
    readonly set: ReadonlySet<{
      readonly name: string;
    }>;
    readonly map: ReadonlyMap<
      string,
      {
        readonly name: string;
      }
    >;
    readonly promise: Promise<{ readonly foo: string; readonly bar: number }>;
  };
};
