import { assign } from "lodash";
import { useEffect } from "react";
import { StatusBar, StatusBarProps } from "react-native";
import { System } from "../utils";
import useNavigationListener from "./useNavigationListener";

const DEFAULT_STATUS_BAR: Required<StatusBarProps> = {
    barStyle: "dark-content",
    backgroundColor: "#ffffff",
    translucent: true,
    hidden: false,
    animated: false,
    networkActivityIndicatorVisible: true,
    showHideTransition: "fade",
}

const useStatusBar = (options?: StatusBarProps) => {

    useNavigationListener({
        onFocus: () => {
            const props = assign({}, DEFAULT_STATUS_BAR, options);
            props.barStyle !== null && StatusBar.setBarStyle(props.barStyle, props.animated);
            StatusBar.setHidden(props.hidden, props.showHideTransition !== null ? props.showHideTransition : "fade");
            if (System.isAndroid) {
                StatusBar.setTranslucent(props.translucent);
                StatusBar.setBackgroundColor(props.backgroundColor, props.animated);
            }
        }
    }, [options])

}

export default useStatusBar;
