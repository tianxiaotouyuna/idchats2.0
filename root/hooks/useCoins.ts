import { useEffect, useState } from "react";
import { CoinType } from "@/constants/config/coins";
import useRedux from "./useRedux";
import { CommonService } from "../services";

export default function useCoins() {
  const [remoteCoins, setRemoteCoins] = useState<CoinType[]>([]);
  const { chainId } = useRedux();
  const fetchCoins = async () => {
    const res = await CommonService.getCoins(chainId || 1);
    if (res?.data?.length > 0) {
      const list: CoinType[] = [];
      res.data.forEach((i: any) => {
        const obj: CoinType = {
          symbol: i.coinSymbol,
          name: i.coinName,
          decimals: i.coinDecimals,
          chainID: i.coinChainid,
          isNative: false,
          noIcon: !i.coinIcon,
          icon: i.coinIadcon,
          address: i.coinToken,
        };
        list.push(obj);
      });
      setRemoteCoins(list);
    }
  };
  useEffect(()=>{
    fetchCoins()
  },[])
  return {
    fetchCoins,
    remoteCoins,
  };
}
