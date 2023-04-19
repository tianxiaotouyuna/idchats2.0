import { NavigationContainerRef, TabActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

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
    navigationRef.current?.dispatch(TabActions.jumpTo('HomePage'))
}
