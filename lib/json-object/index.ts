import { JsonValue } from "../json-value";

export type JsonObject = {
  [Key in string]: JsonValue;
} & {
  // optional (non-undefined) properties are acceptable
  [Key in string]?: JsonValue;
};
