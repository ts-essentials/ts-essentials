`NonUnion<Type>` returns `Type` when `Type` is not an union. Otherwise returns `never`

This is especially useful, when one of parameters can be a union:

```ts
type EventPayload = {
    start: { ms: number };
    stop: { reason: string };
    report: { crashed: boolean };
};

function dispatch<Type extends keyof EventPayload>(
    type: Type,
    data: EventPayload[Type]
): void;
function dispatch(type: string, data: unknown): void {
    console.log(type, data);
}

dispatch('start', { ms: 1 });
dispatch('stop', { reason: 'closed' });
dispatch('report', { crashed: true });

declare let type: keyof EventPayload;

// Allowed, but doesn't look right ❌
dispatch(type, { ms: 1 });
```

To prohibit such behaviour, you can apply `NonUnion` on `Type` in `dispatch` function:

```ts
function dispatch<Type extends keyof EventPayload>(
    type: NonUnion<Type>,
    //    ^^^^^^^^
    data: EventPayload[Type]
): void;
function dispatch(type: string, data: unknown): void {
    console.log(type, data);
}

dispatch('start', { ms: 1 });
dispatch('stop', { reason: 'closed' });
dispatch('report', { crashed: true });

// @ts-expect-error: Type '"start"' is not assignable to type 'never'
dispatch(type, { ms: 1 });
```

TS Playground - https://tsplay.dev/NlrGGW
