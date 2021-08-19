export type ComplexNestedRequired = {
  simple: number;
  nested: {
    date: Date;
    func: () => string;
    array: { bar: number }[];
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
