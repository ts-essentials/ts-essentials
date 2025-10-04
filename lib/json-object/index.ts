import { JsonValue } from "../json-value";

// TODO: optional (non-undefined) properties are acceptable

export type JsonObject = {
  [Key in string]: JsonValue;
};
