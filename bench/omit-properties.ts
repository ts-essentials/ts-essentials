// @ts-nocheck

import { bench } from "@arktype/attest";
import { OmitProperties } from "../lib";

export const runOmitPropertiesBenchmarks = (majorMinorVersion: string) => {
  bench("[OmitProperties] removes nothing on empty object", () => {
    return {} as OmitProperties<{}, never>;
  }).types([
    {
      "4.5": 53,
      "4.6": 53,
      "4.7": 53,
      "4.8": 53,
      "4.9": 53,
      "5.0": 49,
      "5.1": 49,
      "5.2": 49,
      "5.3": 49,
      "5.4": 49,
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
      "4.5": 159,
      "4.6": 159,
      "4.7": 139,
      "4.8": 136,
      "4.9": 136,
      "5.0": 132,
      "5.1": 132,
      "5.2": 132,
      "5.3": 132,
      "5.4": 132,
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
      "4.5": 217,
      "4.6": 217,
      "4.7": 197,
      "4.8": 194,
      "4.9": 194,
      "5.0": 190,
      "5.1": 190,
      "5.2": 190,
      "5.3": 190,
      "5.4": 190,
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
      "4.5": 109,
      "4.6": 109,
      "4.7": 109,
      "4.8": 109,
      "4.9": 109,
      "5.0": 105,
      "5.1": 105,
      "5.2": 105,
      "5.3": 105,
      "5.4": 105,
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
      "4.5": 165,
      "4.6": 165,
      "4.7": 165,
      "4.8": 165,
      "4.9": 165,
      "5.0": 161,
      "5.1": 161,
      "5.2": 161,
      "5.3": 161,
      "5.4": 161,
    }[majorMinorVersion],
    "instantiations",
  ]);
};
