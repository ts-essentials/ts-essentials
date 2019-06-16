# Contributing

All contributions to `ts-essentials` are welcomed.

Do you have idea for a new type? Please, first submit github issue (or send me PM) and describe your proposal.

## Adding new types

* `lib/types.ts` — pure types, with 0 runtime overhead 
* `lib/functions.ts` — functions that incur _some_ runtime overhead

Please make sure to add new type to README (both menu and description). When providing description make sure to leave a resulting type in a comment like:

```typescript
type SimplifiedComplexObject = Omit<ComplexObject, "nested">;

// Result:
// {
//  simple: number
// }
```

When you're done with your changes use `yarn test:fix` to run `prettier` to reformat code and `tsc` to make sure that there are no compilation errors.

Thanks! 🙏🏻