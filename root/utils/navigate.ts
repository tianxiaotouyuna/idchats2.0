import useRedux from "@/hooks/useRedux";
import { getFocusedRouteNameFromRoute, NavigationContainerRef, StackActions, TabActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert } from "react-native";
import { CacheKeys } from "../constants";
import { Route, Storage }  from "../utils";

export const navigationRef = React.createRef<NavigationContainerRef & StackNavigationProp<any>>();

export const navigate = async (name: string, params?: any) => {
        navigationRef.current?.navigate(name, params);
}
export const goBack = () => {
    navigationRef.current?.goBack();
}

export const pop = (count: number) => {
    navigationRef.current?.pop(count);
}

export const popToTop = () => {
    navigationRef.current?.popToTop();
}
export const selectTab = () => {
    navigationRef.current?.dispatch(TabActions.jumpTo('HomeRoute'))
}
