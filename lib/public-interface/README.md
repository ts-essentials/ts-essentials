`PublicInterface<Type>` constructs a type containing only the public members of `Type`

```ts
declare class DatabaseConnection {
  private pool: Pool;
  query(sql: string): Promise<Row[]>;
  close(): Promise<void>;
}

const mockDb: PublicInterface<DatabaseConnection> = {
  query: vi.fn().mockResolvedValue([]),
  close: vi.fn(),
};
```

Because TypeScript's `keyof` already iterates only over public members, `private`, `protected`,
and `#`-prefixed fields are automatically excluded.

TS Playground - https://tsplay.dev/NdeVvm
<!-- TS Playground – https://tsplay.dev/mZAz1N -->
