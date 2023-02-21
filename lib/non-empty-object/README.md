`NonEmptyObject<Object>` returns `Object` when `Object` has at least one key. Otherwise returns `never`

```ts
const createNonEmptyObject = <TObject extends Record<string, unknown>>(obj: NonEmptyObject<TObject>) => obj;

// error: Argument of type '{}' is not assignable to parameter of type 'never'
const emptyObject = createNonEmptyObject({});
//                                       ^^

const nonEmptyObject = createNonEmptyObject({ age: 29 });
//    ^? { age: number }
```

It's handy to use it with `PickProperties` and `OmitProperties`

```ts
interface UserInformation {
  birthday: Date;
  email: string;
  id: string;
  name: string;
  happyBirthday: () => void;
  hello: () => void;
}

type NumericUserFields = NonEmptyObject<PickProperties<UserInformation, number>>;
//   ^? never

type SpecificUserFields = NonEmptyObject<OmitProperties<UserInformation, Date | Primitive>>;
//   ^? { happyBirthday: () => void; hello: () => void; }
```

TS Playground – https://tsplay.dev/w1EaXw
