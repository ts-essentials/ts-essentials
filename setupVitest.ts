import { setup as attestSetup, teardown as attestTeardown } from "@arktype/attest";

export const setup = () =>
  attestSetup({
    tsVersions: "*",
  });

export const teardown = attestTeardown;
