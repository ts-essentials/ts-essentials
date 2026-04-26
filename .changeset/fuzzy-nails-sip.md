---
"ts-essentials": patch
---

Fix `DeepPartial<Type>` when `Type` is an array containing rest element, like `[string, ...number[]]`
