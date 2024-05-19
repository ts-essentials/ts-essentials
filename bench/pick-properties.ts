// @ts-nocheck

import { bench } from "@arktype/attest";
import { PickProperties } from "../lib";

export const runPickPropertiesBenchmarks = (majorMinorVersion: string) => {
  bench("[PickProperties] picks nothing on empty object", () => {
    return {} as PickProperties<{}, never>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 0,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[PickProperties] picks one type on 6 properties in interface", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
    }

    return {} as PickProperties<UserInformation, Function>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 0,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[PickProperties] picks one type on 12 properties in interface", () => {
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

    return {} as PickProperties<UserInformation, Function>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 0,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[PickProperties] picks multiple types on 6 properties in interface", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
    }

    return {} as PickProperties<UserInformation, Date | string>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 0,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[PickProperties] picks multiple types on 12 properties in interface", () => {
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

    return {} as PickProperties<UserInformation, Date | string>;
  }).types([
    {
      "4.5": 0,
      "4.6": 0,
      "4.7": 0,
      "4.8": 0,
      "4.9": 0,
      "5.0": 0,
      "5.1": 0,
      "5.2": 0,
      "5.3": 0,
      "5.4": 0,
    }[majorMinorVersion],
    "instantiations",
  ]);
};
