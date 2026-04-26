---
"ts-essentials": patch
---

Fix `IsTuple<Type>` type when `Type` is a tuple with both optional elements and a rest element, like `[string?, ...number[]]`
