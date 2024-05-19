// @ts-nocheck

import { bench } from "@arktype/attest";
import { PickKeys } from "../lib";

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
  // TypeScript 4.5 baseline
}).types([165, "instantiations"]);

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
  // TypeScript 4.5 baseline
}).types([213, "instantiations"]);

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
  // TypeScript 4.5 baseline
}).types([123, "instantiations"]);

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
  // TypeScript 4.5 baseline
}).types([177, "instantiations"]);
