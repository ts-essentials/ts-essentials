import { DeepPick } from "../lib";

function testGenericDeepPick() {
  type DeepPickId<T> = DeepPick<T, { admin: { id: never }; engineers: { id: never }[]; managers: { id: never }[] }>;

  type User = { id: string; right: "read" | "readwrite" };

  const rights: DeepPickId<{ admin: User; engineers: User[]; managers: User[] }> = {
    admin: { id: "admin_id" },
    engineers: [{ id: "engineer_id" }],
    managers: [{ id: "manager_id" }],
  };
}
