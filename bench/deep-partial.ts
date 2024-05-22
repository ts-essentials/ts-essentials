// @ts-nocheck

import { bench } from "@arktype/attest";
import { DeepPartial } from "../lib";

export const runDeepPartialBenchmarks = (majorMinorVersion: string) => {
  bench("[DeepPartial] makes 6 properties on 1 level partial", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
    }

    return {} as DeepPartial<UserInformation>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 117,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[DeepPartial] makes 12 properties on 1 level partial", () => {
    interface UserInformation {
      birthday1: Date;
      email1: string;
      id1: string;
      name1: string;
      happyBirthday1: () => void;
      hello1: () => void;
      birthday2: Date;
      email2: string;
      id2: string;
      name2: string;
      happyBirthday2: () => void;
      hello2: () => void;
    }

    return {} as PickKeys<UserInformation, Function>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 117,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[DeepPartial] makes 6 properties on 2 levels partial", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
      level2: {
        birthday: Date;
        email: string;
        id: string;
        name: string;
        happyBirthday: () => void;
        hello: () => void;
      };
    }

    return {} as DeepPartial<UserInformation>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 117,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[DeepPartial] makes 12 properties on 2 levels partial", () => {
    interface UserInformation {
      birthday1: Date;
      email1: string;
      id1: string;
      name1: string;
      happyBirthday1: () => void;
      hello1: () => void;
      birthday2: Date;
      email2: string;
      id2: string;
      name2: string;
      happyBirthday2: () => void;
      hello2: () => void;
      level2: {
        birthday1: Date;
        email1: string;
        id1: string;
        name1: string;
        happyBirthday1: () => void;
        hello1: () => void;
        birthday2: Date;
        email2: string;
        id2: string;
        name2: string;
        happyBirthday2: () => void;
        hello2: () => void;
      };
    }

    return {} as PickKeys<UserInformation, Function>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 117,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[DeepPartial] makes 6 properties on 3 levels partial", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
      level2: {
        birthday: Date;
        email: string;
        id: string;
        name: string;
        happyBirthday: () => void;
        hello: () => void;
        level3: {
          birthday: Date;
          email: string;
          id: string;
          name: string;
          happyBirthday: () => void;
          hello: () => void;
        };
      };
    }

    return {} as DeepPartial<UserInformation>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 117,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[DeepPartial] makes 12 properties on 3 levels partial", () => {
    interface UserInformation {
      birthday1: Date;
      email1: string;
      id1: string;
      name1: string;
      happyBirthday1: () => void;
      hello1: () => void;
      birthday2: Date;
      email2: string;
      id2: string;
      name2: string;
      happyBirthday2: () => void;
      hello2: () => void;
      level2: {
        birthday1: Date;
        email1: string;
        id1: string;
        name1: string;
        happyBirthday1: () => void;
        hello1: () => void;
        birthday2: Date;
        email2: string;
        id2: string;
        name2: string;
        happyBirthday2: () => void;
        hello2: () => void;
        level3: {
          birthday1: Date;
          email1: string;
          id1: string;
          name1: string;
          happyBirthday1: () => void;
          hello1: () => void;
          birthday2: Date;
          email2: string;
          id2: string;
          name2: string;
          happyBirthday2: () => void;
          hello2: () => void;
        };
      };
    }

    return {} as PickKeys<UserInformation, Function>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 117,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);
};
