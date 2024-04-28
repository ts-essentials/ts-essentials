`NonEmptyArray<Type>` matches array with at least one element of type `Type`

```ts
// error: Type '[]' is not assignable to type 'NonEmptyArray<number>'.
//   Source has 0 element(s) but target requires 1.
const noElements: NonEmptyArray<number> = [];
//                                        ^^
const oneElement: NonEmptyArray<number> = [1];
const twoElements: NonEmptyArray<number> = [1, 2];
```

It's handy to apply `NonEmptyArray` in rest parameters in a function

```ts
interface State {
  payload: Record<string, unknown>;
  previous?: State;
  timestamp: number;
}

declare let state: State;

const applyMiddleware = (...middlewares: NonEmptyArray<(state: State) => State>): void => {
  for (const middleware of middlewares) {
    state = middleware(state);
  }
};

// error: Expected at least 1 arguments, but got 0.
applyMiddleware();
// ^^^^^^^^^^^^^^

applyMiddleware((state) => state);

applyMiddleware(
  (state) => ({ ...state, payload: { ...state.payload, enabled: Math.random() >= 0.5 } }),
  (state) => ({ ...state, timestamp: Date.now() }),
);
```

TS Playground – https://tsplay.dev/WJA1gm
