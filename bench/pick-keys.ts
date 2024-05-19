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
      "4.5": 120,
      "4.6": 120,
      "4.7": 100,
      "4.8": 97,
      "4.9": 116,
      "5.0": 114,
      "5.1": 114,
      "5.2": 114,
      "5.3": 114,
      "5.4": 114,
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
      "4.5": 162,
      "4.6": 162,
      "4.7": 142,
      "4.8": 139,
      "4.9": 160,
      "5.0": 158,
      "5.1": 158,
      "5.2": 158,
      "5.3": 158,
      "5.4": 158,
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
      "4.5": 72,
      "4.6": 72,
      "4.7": 72,
      "4.8": 72,
      "4.9": 91,
      "5.0": 89,
      "5.1": 89,
      "5.2": 89,
      "5.3": 89,
      "5.4": 89,
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
      "4.5": 114,
      "4.6": 114,
      "4.7": 114,
      "4.8": 114,
      "4.9": 135,
      "5.0": 133,
      "5.1": 133,
      "5.2": 133,
      "5.3": 133,
      "5.4": 133,
    }[majorMinorVersion],
    "instantiations",
  ]);
};
