// @ts-nocheck

import { bench } from "@arktype/attest";
import { OmitProperties } from "../lib";

export const runOmitPropertiesBenchmarks = (majorMinorVersion: string) => {
  bench("[OmitProperties] removes nothing on empty object", () => {
    return {} as OmitProperties<{}, never>;
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

  bench("[OmitProperties] removes one type on 6 properties in interface", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
    }

    return {} as OmitProperties<UserInformation, Function>;
  }).types([
    {
      "4.5": 101,
      "4.6": 101,
      "4.7": 81,
      "4.8": 78,
      "4.9": 78,
      "5.0": 76,
      "5.1": 76,
      "5.2": 76,
      "5.3": 76,
      "5.4": 76,
      "5.5": 76,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[OmitProperties] removes one type on 12 properties in interface", () => {
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

    return {} as OmitProperties<UserInformation, Function>;
  }).types([
    {
      "4.5": 145,
      "4.6": 145,
      "4.7": 125,
      "4.8": 122,
      "4.9": 122,
      "5.0": 120,
      "5.1": 120,
      "5.2": 120,
      "5.3": 120,
      "5.4": 120,
      "5.5": 120,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[OmitProperties] removes multiple types on 6 properties in interface", () => {
    interface UserInformation {
      birthday: Date;
      email: string;
      id: string;
      name: string;
      happyBirthday: () => void;
      hello: () => void;
    }

    return {} as OmitProperties<UserInformation, Date | string>;
  }).types([
    {
      "4.5": 49,
      "4.6": 49,
      "4.7": 49,
      "4.8": 49,
      "4.9": 49,
      "5.0": 47,
      "5.1": 47,
      "5.2": 47,
      "5.3": 47,
      "5.4": 47,
      "5.5": 47,
    }[majorMinorVersion],
    "instantiations",
  ]);

  bench("[OmitProperties] removes multiple types on 12 properties in interface", () => {
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

    return {} as OmitProperties<UserInformation, Date | string>;
  }).types([
    {
      "4.5": 89,
      "4.6": 89,
      "4.7": 89,
      "4.8": 89,
      "4.9": 89,
      "5.0": 87,
      "5.1": 87,
      "5.2": 87,
      "5.3": 87,
      "5.4": 87,
      "5.5": 87,
    }[majorMinorVersion],
    "instantiations",
  ]);
};
