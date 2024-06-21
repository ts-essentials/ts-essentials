// @ts-nocheck

import { bench } from "@arktype/attest";
import { PickProperties } from "../lib";

export const runPickPropertiesBenchmarks = (majorMinorVersion: string) => {
  bench("[PickProperties] picks nothing on empty object", () => {
    return {} as PickProperties<{}, never>;
  }).types([
    {
      "4.5": 9,
      "4.6": 9,
      "4.7": 9,
      "4.8": 9,
      "4.9": 9,
      "5.0": 7,
      "5.1": 7,
      "5.2": 7,
      "5.3": 7,
      "5.4": 7,
      "5.5": 7,
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
      "4.5": 99,
      "4.6": 99,
      "4.7": 79,
      "4.8": 76,
      "4.9": 76,
      "5.0": 74,
      "5.1": 74,
      "5.2": 74,
      "5.3": 74,
      "5.4": 74,
      "5.5": 74,
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
      "4.5": 141,
      "4.6": 141,
      "4.7": 121,
      "4.8": 118,
      "4.9": 118,
      "5.0": 116,
      "5.1": 116,
      "5.2": 116,
      "5.3": 116,
      "5.4": 116,
      "5.5": 116,
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
      "4.5": 51,
      "4.6": 51,
      "4.7": 51,
      "4.8": 51,
      "4.9": 51,
      "5.0": 49,
      "5.1": 49,
      "5.2": 49,
      "5.3": 49,
      "5.4": 49,
      "5.5": 49,
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
      "4.5": 93,
      "4.6": 93,
      "4.7": 93,
      "4.8": 93,
      "4.9": 93,
      "5.0": 91,
      "5.1": 91,
      "5.2": 91,
      "5.3": 91,
      "5.4": 91,
      "5.5": 91,
    }[majorMinorVersion],
    "instantiations",
  ]);
};
