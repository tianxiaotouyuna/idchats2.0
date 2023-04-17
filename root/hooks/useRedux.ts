import { useDispatch, useSelector } from "react-redux";

const useRedux = () => {

    const dispatch = useDispatch();

    // 用户信息
    const {communities,needReloadCommunityList,needReloadMyTop,needReloadIntroduce,needReloadMyNftList,needReloadAssetsList,chainId,tokensInfo,useTokenName,unitCode,laungueCode,selectWallet,token,userinfo,walletPwd,imIns,chatList,wallet,needReloadContact,needReloadChatList,needReloadAllByImStatus,imUserInfo,mnemonic,needReloadChatDetail} = useSelector((state: any) => ({ ...state }));
    const isLogin = !!userinfo?.tel;

    // 发送事件
    const sendReduxAction = async (type: string, data?: any) => {
       await dispatch({ type, payload: data });
    }

    return { 
        sendReduxAction, 
        communities, 
        userinfo, 
        isLogin,
        imIns,
        chatList,
        wallet,
        needReloadMyTop,
        needReloadContact,
        needReloadChatList,
        needReloadIntroduce,
        needReloadMyNftList,
        needReloadAssetsList,
        needReloadAllByImStatus,
        mnemonic,
        imUserInfo,
        walletPwd,
        needReloadChatDetail,
        token,
        selectWallet,
        laungueCode,
        unitCode,
        useTokenName,
        tokensInfo,
        needReloadCommunityList,
        chainId
     }

}

export default useRedux;
