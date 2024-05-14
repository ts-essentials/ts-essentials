// @ts-nocheck

import { bench } from "@arktype/attest";

// Combinatorial template literals often result in expensive types- let's benchmark this one!
type makeComplexType<s extends string> = s extends `${infer head}${infer tail}`
  ? head | tail | makeComplexType<tail>
  : s;

bench("bench type", () => {
  return {} as makeComplexType<"defenestration">;
  // This is an inline snapshot that will be populated or compared when you run the file
}).types([169, "instantiations"]);

bench("bench runtime and type", () => {
  return {} as makeComplexType<"antidisestablishmentarianism">;
})
  // Average time it takes the function execute
  .mean([2, "ms"])
  // Seems like our type is O(n) with respect to the length of the input- not bad!
  .types([337, "instantiations"]);
