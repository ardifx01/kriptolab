import { PinataSDK } from "pinata-web3";

import { PINATA_GATEWAY, PINATA_JWT } from "@/constants";

export const pinata = new PinataSDK({
  pinataJwt: `${PINATA_JWT}`,
  pinataGateway: `${PINATA_GATEWAY}`,
});
