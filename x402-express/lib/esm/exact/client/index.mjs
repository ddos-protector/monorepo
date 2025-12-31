import {
  ExactSvmScheme
} from "../../chunk-PNSAJQCF.mjs";
import {
  NETWORKS
} from "../../chunk-WWACQNRQ.mjs";
import {
  ExactSvmSchemeV1
} from "../../chunk-EEA7DKZI.mjs";
import "../../chunk-3CEIVWNN.mjs";
import "../../chunk-IKSTWKEM.mjs";

// src/exact/client/register.ts
function registerExactSvmScheme(client, config) {
  if (config.networks && config.networks.length > 0) {
    config.networks.forEach((network) => {
      client.register(network, new ExactSvmScheme(config.signer));
    });
  } else {
    client.register("solana:*", new ExactSvmScheme(config.signer));
  }
  NETWORKS.forEach((network) => {
    client.registerV1(network, new ExactSvmSchemeV1(config.signer));
  });
  if (config.policies) {
    config.policies.forEach((policy) => {
      client.registerPolicy(policy);
    });
  }
  return client;
}
export {
  ExactSvmScheme,
  registerExactSvmScheme
};
//# sourceMappingURL=index.mjs.map