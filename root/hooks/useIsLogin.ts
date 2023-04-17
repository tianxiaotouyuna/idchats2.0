import { useSelector } from "react-redux";

const useIsLogin = () => {
    const state = useSelector((state: any) => state.login);
    return state?.isLogin;
}

export default useIsLogin;