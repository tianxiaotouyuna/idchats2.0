import { pxToSp } from "@/utils/system";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { assign } from "lodash";
import { useEffect } from "react";

const DEFAULT_NAVIGATION_OPTIONS: StackNavigationOptions = {
    headerStyle: {
        backgroundColor: "#ffffff",
    },
    headerTintColor: "#000000",
    headerBackTitleVisible: false,
    headerTitleStyle: { fontSize: pxToSp(32) }
}

const useNavigationOptions = (options?: Partial<StackNavigationOptions>) => {

    const navigation = useNavigation();
    /**
     * 这里使用useEffect
     * 解决：Cannot update a component from inside the function body of a different component.
     */
    useEffect(() => {
        options = assign({}, DEFAULT_NAVIGATION_OPTIONS, options);
        navigation.setOptions(options);
    }, [navigation])

    /** 更新标题 */
    const updateTitle = (title: string) => {
        navigation.setOptions({ title });
    }

    return { updateTitle }

}

export default useNavigationOptions;
