// @ts-nocheck

import { bench } from "@arktype/attest";
import { PickKeys } from "../lib";

export const runPickKeysBenchmarks = (majorMinorVersion: string) => {
  bench("[PickKeys] picks one type on 6 properties in interface", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
    }

    return {} as PickKeys<UserInformation, Function>;
  }).types([
    {
      "4.5": 165,
      "4.6": 165,
      "4.7": 145,
      "4.8": 133,
      "4.9": 133,
      "5.0": 129,
      "5.1": 129,
      "5.2": 129,
      "5.3": 129,
      "5.4": 129,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[PickKeys] picks one type on 12 properties in interface", () => {
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
      "4.5": 213,
      "4.6": 213,
      "4.7": 193,
      "4.8": 181,
      "4.9": 181,
      "5.0": 177,
      "5.1": 177,
      "5.2": 177,
      "5.3": 177,
      "5.4": 177,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[PickKeys] picks multiple types on 6 properties in interface", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
    }

    return {} as PickKeys<UserInformation, Date | string>;
  }).types([
    {
      "4.5": 123,
      "4.6": 123,
      "4.7": 123,
      "4.8": 114,
      "4.9": 114,
      "5.0": 110,
      "5.1": 110,
      "5.2": 110,
      "5.3": 110,
      "5.4": 110,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[PickKeys] picks multiple types on 12 properties in interface", () => {
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

    return {} as PickKeys<UserInformation, Date | string>;
  }).types([
    {
      "4.5": 177,
      "4.6": 177,
      "4.7": 177,
      "4.8": 168,
      "4.9": 168,
      "5.0": 164,
      "5.1": 164,
      "5.2": 164,
      "5.3": 164,
      "5.4": 164,
    }[majorMinorVersion],
    "instantiations",
  ]);
};
