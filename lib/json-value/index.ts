import { JsonArray } from "../json-array";
import { JsonObject } from "../json-object";
import { JsonPrimitive } from "../json-primitive";

export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
