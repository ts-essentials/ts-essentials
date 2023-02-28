`new UnreachableCaseError(value)` matches runtime class instance type that helps check exhaustiveness for `value`

```ts
type LogOptions =
  | { action: "openBlogPage"; data: { startTime: number } }
  | { action: "likeVideo"; data: { videoSrc: string } }
  | { action: "closeBlogPage"; data: { readingTime: number } };

const log = (options: LogOptions) => {
  switch (options.action) {
    case "openBlogPage":
      console.log(`Opened blog page within ${options.data.startTime}s`);
      return;
    case "likeVideo":
      console.log(`Like video with src "${options.data.videoSrc}"`);
      return;
    case "closeBlogPage":
      console.log(`Closed blog page, user was reading it for ${options.data.readingTime}s`);
      return;
    default:
      throw new UnreachableCaseError(options);
    //                               ^? never
  }
};
```

It means that when `value` isn't `never` (e.g. `unlikeVideo` action is added into `LogOptions`)

```ts
type LogOptions =
  | { action: "openBlogPage"; data: { startTime: number } }
  | { action: "likeVideo"; data: { videoSrc: string } }
  | { action: "unlikeVideo"; data: { videoSrc: string } } // added
  | { action: "closeBlogPage"; data: { readingTime: number } };
```

`UnreachableCaseError` in `log` shows TypeScript error:

```ts
const log = (options: LogOptions) => {
  switch (options.action) {
    case "openBlogPage":
      console.log(`Opened blog page within ${options.data.startTime}s`);
      return;
    case "likeVideo":
      console.log(`Like video with src "${options.data.videoSrc}"`);
      return;
    case "closeBlogPage":
      console.log(`Closed blog page, user was reading it for ${options.data.readingTime}s`);
      return;
    default:
      // error: Argument of type '{ action: "unlikeVideo"; data: { videoSrc: string; }; }' is not assignable to parameter of type 'never'.
      throw new UnreachableCaseError(options);
    //                               ^^^^^^^
    //                               ^? never
  }
};
```

TS Playground – https://tsplay.dev/WzG14w
