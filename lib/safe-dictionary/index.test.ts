import { AssertTrue as Assert, IsExact } from "conditional-type-checks";
import { SafeDictionary } from "..";

function testSafeDictionary() {
  type cases = [
    Assert<IsExact<SafeDictionary<number>, { [x: string]: number | undefined }>>,
    Assert<IsExact<Pick<SafeDictionary<number>, "foo">, { foo: number | undefined }>>,
    Assert<IsExact<SafeDictionary<number>["foo"], number | undefined>>,
    Assert<IsExact<SafeDictionary<boolean, number>[42], boolean | undefined>>,
  ];

  const testingSafeDictionary: SafeDictionary<number> = {};
  delete testingSafeDictionary.unexistingField;
  testingSafeDictionary.existingField = 1;
  delete testingSafeDictionary.existingField;

  // non exhaustiveness
  const safeDict: SafeDictionary<string, "A" | "B"> = { A: "OK" };
}
