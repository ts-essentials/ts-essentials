`AnyThisFunction<ThisType, Args?, ReturnType?>` matches a function with an explicit `this` type `ThisType`,
arguments type `Args` (`any[]` by default) and return type `ReturnType` (`any` by default).

Use it to describe a function that reads from a typed receiver.

```ts
import type { AnyThisFunction } from "ts-essentials";

type Format = AnyThisFunction<{ value: number }, [precision: number], string>;

const format: Format = function (precision) {
  return this.value.toFixed(precision);
};

format.call({ value: 1.234 }, 2); // "1.23"
```

[Try the example in the TypeScript Playground](https://www.typescriptlang.org/play?strict=true#code/KYDwDg9gTgLgBDAnmYcCCA7RAVAFgSwGcAxAVwwGMZ8IMAePI7ZYAGnSgHNC5QZgMAEx4BDLAG0AunAC8cMYinsASsBikoGZilnysAPl0AKAFBwEBQgC44jQtrZm4AOlciu1jtxMBKWYdV1TQcAbhMTJB1iaABbEXg5TBxLMkpqWjoAbzgANxEAG1JgGwxSGIAjYCg4AF92cTAoYAoiGgwSssqoSXZCGCh8DE59MJMKWj64ADNY+JtoqDiE6fIqNrgjRubW2j9MpyagjAsiZzzC4GcYCGJ8EGBBTaaWwjafMJrRmcX45woC-JGbLnIo2ACMzgATABmAAstXYkPecAA9Ci4AAiCEwjEmIA)
