---
"ts-essentials": patch
---

`Head<Type>` no longer includes an extraneous `| undefined` when instantiated with a union of empty and non-empty tuple, like `[] | [1, 2]`
