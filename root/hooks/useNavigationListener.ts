import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

type NavigationListener = {
    onBeforeRemove?: () => void
    onBlur?: () => void
    onFocus?: () => void
    onState?: (e:any) => void
}

const useNavigationListener = (listener: NavigationListener, deps: React.DependencyList = []) => {
    const navigation = useNavigation();
    const { onBeforeRemove, onBlur, onFocus,onState } = listener;
    useEffect(() => {
        const navigationBeforeRemoveListener = navigation.addListener("beforeRemove", () => {
            onBeforeRemove?.();
        });
        const navigationBlurListener = navigation.addListener("blur", () => {
            onBlur?.();
        });
        const navigationFocusListener = navigation.addListener("focus", () => {
            onFocus?.();
        });
        const navigationStateListener = navigation.addListener("state", (e) => {
            onState?.(e);
        });
        return () => {
            navigationBeforeRemoveListener();
            navigationBlurListener();
            navigationFocusListener();
            navigationStateListener();
        }
    }, deps);

}

export default useNavigationListener;
