`MarkRequired<Type, Keys>` constructs a type by picking all properties from type `Type` where properties `Keys` are set
as required

```ts
declare class User {
  id: number;
  posts?: Post[];
  photos?: Photo[];
}

type UserWithPosts = MarkRequired<User, "posts">;
//   ^? { id: number; posts: Post[]; photos?: Photo[] }
```

A real-life example: when selecting an object with its related entities from ORM

```ts
declare const dataSource: DataSource;

const userRepository = dataSource.getRepository(User);

async function getUserWithPosts(id: number): Promise<UserWithPosts> {
  return userRepository.findOneOrFail({ where: { id }, relations: ["posts"] }) as Promise<UserWithPosts>;
}
```

TS Playground – https://tsplay.dev/Wvqy4m
