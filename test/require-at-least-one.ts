import { AssertTrue, IsExact } from "conditional-type-checks";
import { RequireAtLeastOne } from "../lib";

type JsonFile = { type: "json" };
type YamlFile = { type: "yaml" };

type File = {
  readable: boolean;
  toJson: () => JsonFile;
  toYaml: () => YamlFile;
};

function testAssignability() {
  let expected: RequireAtLeastOne<File, "toJson" | "toYaml">;

  const toJson = () => ({ type: "json" } as const);
  const toYaml = () => ({ type: "yaml" } as const);

  expected = { readable: true, toJson };
  expected = { readable: true, toYaml };
  expected = { readable: true, toJson, toYaml };

  // @ts-expect-error: `readable` and either `toJson` or `toYaml` must be included
  expected = {};
  // @ts-expect-error: `toJson` or `toYaml` must be included
  expected = { readable: true };
  // @ts-expect-error: property 'readable' is missing
  expected = { toJson };
  // @ts-expect-error: property 'readable' is missing
  expected = { toYaml };
}

function testRequireAtLeastOne() {
  type assertions = [
    AssertTrue<IsExact<RequireAtLeastOne<any>, any>>,
    AssertTrue<IsExact<RequireAtLeastOne<any, "non-existing">, any>>,
    AssertTrue<IsExact<RequireAtLeastOne<any, any>, any>>,
    AssertTrue<IsExact<RequireAtLeastOne<never>, never>>,
    AssertTrue<IsExact<RequireAtLeastOne<never, "non-existing">, never>>,
    AssertTrue<IsExact<RequireAtLeastOne<never, any>, never>>,
    AssertTrue<IsExact<RequireAtLeastOne<{}>, never>>,
    AssertTrue<IsExact<RequireAtLeastOne<File, never>, never>>,
    AssertTrue<IsExact<RequireAtLeastOne<File, "readable">, File>>,
    AssertTrue<
      IsExact<
        RequireAtLeastOne<File, "toJson" | "toYaml">,
        (Required<Pick<File, "toJson">> | Required<Pick<File, "toYaml">>) & Omit<File, "toJson" | "toYaml">
      >
    >,
    AssertTrue<
      IsExact<
        RequireAtLeastOne<File, "toJson" | "toYaml" | "readable">,
        Required<Pick<File, "toJson">> | Required<Pick<File, "toYaml">> | Required<Pick<File, "readable">>
      >
    >,
    // No second type parameter means all keys
    AssertTrue<IsExact<RequireAtLeastOne<File>, RequireAtLeastOne<File, keyof File>>>,
  ];
}
