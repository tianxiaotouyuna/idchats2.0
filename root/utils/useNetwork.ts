import { useAccount, useNetwork, useProvider, useSigner } from "wagmi";
import { useMemo } from "react";
import bnb_icon from "@/assets/images/setting/bnb_icon.png";
import eth_icon from "@/assets/images/setting/eth_icon.png";
import icon_matic_token from "@/assets/images/setting/icon_matic_token.png";
import icon_zksyn from "@/assets/images/chain/zksync.png";

import create_icon_arbitrum_one from "@/assets/images/chain/icon_arbitrum_one.svg";
import create_icon_bnb from "@/assets/images/chain/icon_bnb.svg";
import create_icon_eth from "@/assets/images/chain/icon_eth.svg";
import create_icon_optimism from "@/assets/images/chain/icon_optimism.svg";
import create_icon_polygon from "@/assets/images/chain/icon_polygon.svg";
import create_icon_zksync from "@/assets/images/chain/icon_zksync.svg";

import ido_icon_arbitrum_one from "@/assets/images/chain/ido_arbitrum one.svg";
import ido_icon_bnb from "@/assets/images/chain/ido_bnb.svg";
import ido_icon_eth from "@/assets/images/chain/ido_eth.svg";
import ido_icon_optimism from "@/assets/images/chain/ido_optimism.svg";
import ido_icon_polygon from "@/assets/images/chain/ido_polygon.svg";
import ido_icon_zksync from "@/assets/images/chain/ido_zksync.svg";

export function useActiveNetwork() {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const isWrongNetwork = (isConnected && !chain) || chain?.unsupported;

  // until wallet support switch network, we follow wallet chain instead of routing
  return useMemo(() => {
    let networkName: string | undefined;

    networkName = chain?.network;

    return {
      networkName,
      isWrongNetwork,
    };
  }, [chain?.network, isWrongNetwork]);
}

export const useActiveChainId = () => {
  const { chain } = useNetwork();
  const chainId = chain?.id;

  return {
    chainId,
    isWrongNetwork: chain?.unsupported ?? false,
  };
};

export const useProviderOrSigner = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId();
  const provider = useProvider({ chainId });
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();

  return useMemo(() => (withSignerIfPossible && address && isConnected && signer ? signer : provider), [address, isConnected, provider, signer, withSignerIfPossible]);
};

export const chainList = [
  {
    id: [56, 97],
    icon: bnb_icon,
    name: "BSC",
  },
  {
    id: [1, 5],
    icon: eth_icon,
    name: "Ethereum",
  },
  {
    id: [137, 80001],
    icon: icon_matic_token,
    name: "Polygon",
  },
  {
    id: [42161],
    icon: create_icon_arbitrum_one,
    name: "arbitrum",
  },
  {
    id: [10],
    icon: create_icon_optimism,
    name: "optimism",
  },
  {
    id: [324],
    icon: icon_zksyn,
    name: "Zsnyc",
  },
];
export const createChainList = [
  {
    id: [56, 97],
    icon: create_icon_bnb,
    name: "BSC",
  },
  {
    id: [1, 5],
    icon: create_icon_eth,
    name: "Ethereum",
  },
  {
    id: [137, 80001],
    icon: create_icon_polygon,
    name: "Polygon",
  },
  {
    id: [42161],
    icon: create_icon_arbitrum_one,
    name: "arbitrum",
  },
  {
    id: [10],
    icon: create_icon_optimism,
    name: "optimism",
  },
  {
    id: [324],
    icon: create_icon_zksync,
    name: "Zsnyc",
  },
];
export const idoChainList = [
  {
    id: [56, 97],
    icon: ido_icon_bnb,
    name: "BSC",
  },
  {
    id: [1, 5],
    icon: ido_icon_eth,
    name: "Ethereum",
  },
  {
    id: [137, 80001],
    icon: ido_icon_polygon,
    name: "Polygon",
  },
  {
    id: [42161],
    icon: ido_icon_arbitrum_one,
    name: "arbitrum",
  },
  {
    id: [10],
    icon: ido_icon_optimism,
    name: "optimism",
  },
  {
    id: [324],
    icon: ido_icon_zksync,
    name: "Zsnyc",
  },
];
export const useCurrentChain = (type: "normal" | "create" = "normal") => {
  const { chain } = useNetwork();
  const list = type === "normal" ? chainList : createChainList;
  return useMemo(() => {
    if (chain?.id) {
      const index = list.findIndex((i) => i.id.includes(chain?.id));
      if (index > -1) {
        return list[index];
      }
      return { id: "", icon: "", name: "" };
    }
    return { id: "", icon: "", name: "" };
  }, [chain?.id]);
};
export const getChainInfoByID = (chainID: number) => {
  const index = idoChainList.findIndex((i) => i.id.includes(chainID));
  if (index > -1) {
    return idoChainList[index];
  }
  return { id: "", icon: "", name: "" };
};
