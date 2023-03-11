`UnionToIntersection<Union>` constructs a intersection type from union type `Union`

```ts
type LogMetadata = {
  openBlogPage: { startTime: number };
  likeVideo: { videoSrc: string };
  closeBlogPage: { readingTime: number };
};

type AllMetadata = UnionToIntersection<LogMetadata[keyof LogMetadata]>;
//   ^? { startTime: number; videoSrc: string; readingTime: number; }
```

It's handy to convert a mapped type to an overloaded function

```ts
type LogFunction = UnionToIntersection<
  { [Action in keyof LogMetadata]: (action: Action, metadata: LogMetadata[Action]) => void }[keyof LogMetadata]
>;

const log: LogFunction = (action, metadata) => {
  // implementation
};
```

It validates function overload parameters:

```ts
log("openBlogPage", { startTime: 1000 });

// error: No overload matches this call.
//   Overload 1 of 3, '(action: "openBlogPage", metadata: { startTime: number; }): void', gave the following error.
//     Argument of type '"likeVideo"' is not assignable to parameter of type '"openBlogPage"'.
//   Overload 2 of 3, '(action: "likeVideo", metadata: { videoSrc: string; }): void', gave the following error.
//     Argument of type '{ startTime: number; }' is not assignable to parameter of type '{ videoSrc: string; }'.
//       Object literal may only specify known properties, and 'startTime' does not exist in type '{ videoSrc: string; }'.
//   Overload 3 of 3, '(action: "closeBlogPage", metadata: { readingTime: number; }): void', gave the following error.
//     Argument of type '"likeVideo"' is not assignable to parameter of type '"closeBlogPage"'
log("likeVideo", { startTime: 1000 });
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// error: No overload matches this call.
//   Overload 1 of 3, '(action: "openBlogPage", metadata: { startTime: number; }): void', gave the following error.
//     Argument of type '{ readingTime: number; }' is not assignable to parameter of type '{ startTime: number; }'.
//       Object literal may only specify known properties, and 'readingTime' does not exist in type '{ startTime: number; }'.
//   Overload 2 of 3, '(action: "likeVideo", metadata: { videoSrc: string; }): void', gave the following error.
//     Argument of type '"openBlogPage"' is not assignable to parameter of type '"likeVideo"'.
//   Overload 3 of 3, '(action: "closeBlogPage", metadata: { readingTime: number; }): void', gave the following error.
//     Argument of type '"openBlogPage"' is not assignable to parameter of type '"closeBlogPage"'
log("openBlogPage", { readingTime: 1000 });
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

TS Playground – https://tsplay.dev/NBJ6nN
