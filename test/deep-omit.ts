import { DeepOmit } from "../lib";

function testGenericDeepOmit() {
  type DeepOmitId<T> = DeepOmit<T, { admin: { id: never }; engineers: { id: never }[]; managers: { id: never }[] }>;

  type User = { id: string; right: "read" | "readwrite" };

  const rights: DeepOmitId<{ admin: User; engineers: User[]; managers: User[] }> = {
    admin: { right: "readwrite" },
    engineers: [{ right: "read" }],
    managers: [{ right: "read" }],
  };
}
