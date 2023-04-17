import { useCallback, useEffect, useState } from "react";
import { getEnsListApi } from "../api/third";
import { delThirdPlatformApi } from "../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function useEns(address: string) {
  const [list, setList] = useState<string[]>([]);
  const selfInfo = useSelector((state: RootState) => state.user.selfInfo);
  const checkEnsOwner = useCallback(
    async (domains: string[]) => {
      if (!selfInfo.ensDomain) {
        return true;
      }
      const isOwner = domains.includes(selfInfo.ensDomain || "");
      if (!isOwner && selfInfo.ensDomain) {
        await delThirdPlatformApi("ensDomain");
      }
    },
    [selfInfo.ensDomain]
  );
  const getEnsList = useCallback(async () => {
    const res = await getEnsListApi(address as string);
    if (res.data?.data?.domains.length > 0) {
      const l = res.data.data.domains.map((i: { name: string }) => i.name);
      setList(l);
      checkEnsOwner(l);
    }else{
      checkEnsOwner([]);
    }

  }, [address]);

  useEffect(() => {
    getEnsList();
  }, [getEnsList]);

  return {
    list,
    getEnsList,
  };
}
