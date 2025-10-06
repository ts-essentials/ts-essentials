import { AssertTrue, IsExact } from "conditional-type-checks";
import { RequireAtMostOne } from "../lib";

type JsonFile = { type: "json" };
type YamlFile = { type: "yaml" };

type File = {
  readable: boolean;
  toJson: () => JsonFile;
  toYaml: () => YamlFile;
};

function testAssignability() {
  let expected: RequireAtMostOne<File, "toJson" | "toYaml">;

  const toJson = () => ({ type: "json" } as const);
  const toYaml = () => ({ type: "yaml" } as const);

  expected = { readable: true, toJson };
  expected = { readable: true, toYaml };
  // @ts-expect-error: only one of `toJson` or `toYaml` can be included
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

function testRequireAtMostOne() {
  type A = RequireAtMostOne<File, "toJson" | "toYaml" | "readable">;

  type assertions = [
    AssertTrue<IsExact<RequireAtMostOne<any>, any>>,
    AssertTrue<IsExact<RequireAtMostOne<any, "non-existing">, any>>,
    AssertTrue<IsExact<RequireAtMostOne<any, any>, any>>,
    AssertTrue<IsExact<RequireAtMostOne<never>, never>>,
    AssertTrue<IsExact<RequireAtMostOne<never, "non-existing">, never>>,
    AssertTrue<IsExact<RequireAtMostOne<never, any>, never>>,
    AssertTrue<IsExact<RequireAtMostOne<{}>, never>>,
    AssertTrue<IsExact<RequireAtMostOne<File, never>, never>>,
    AssertTrue<IsExact<RequireAtMostOne<File, "readable">, File>>,
    AssertTrue<
      IsExact<
        RequireAtMostOne<File, "toJson" | "toYaml">,
        (
          | (Required<Pick<File, "toJson">> & { toYaml?: never })
          | (Required<Pick<File, "toYaml">> & { toJson?: never })
        ) &
          Omit<File, "toJson" | "toYaml">
      >
    >,
    AssertTrue<
      IsExact<
        RequireAtMostOne<File, "toJson" | "toYaml" | "readable">,
        | (Required<Pick<File, "toJson">> & { toYaml?: never; readable?: never })
        | (Required<Pick<File, "toYaml">> & { toJson?: never; readable?: never })
        | (Required<Pick<File, "readable">> & { toJson?: never; toYaml?: never })
      >
    >,
    // No second type parameter means all keys
    AssertTrue<IsExact<RequireAtMostOne<File>, RequireAtMostOne<File, keyof File>>>,
  ];
}
