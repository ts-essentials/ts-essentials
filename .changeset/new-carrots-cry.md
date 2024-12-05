---
"ts-essentials": patch
---

`Tail<Type>` now works with readonly arrays and also correctly returns the tail for tuples with all optional members.
Additionally, it now acts as an identity for non-tuple arrays, i.e., it returns `Type` when `Type` is a non-tuple array,
such as `string[]`, `number[]`, etc.
