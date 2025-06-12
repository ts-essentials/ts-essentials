---
"ts-essentials": patch
---

Fix `DeepReadonly<Type>` & `DeepRequired<Type>` types when `Type` is an array containing rest element, like
`[string, ...number[]]`
