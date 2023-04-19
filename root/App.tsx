import "react-native-gesture-handler";
import { RootSiblingParent } from 'react-native-root-siblings';
import { Animated, LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Drawer } from "./routes/Drawer";
import React, { useState } from "react";
export const AnimatedContext = React.createContext(void 0);
const App = () => {
  LogBox.ignoreAllLogs();
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  return (
    <AnimatedContext.Provider value={animatedValue}>
      <RootSiblingParent>
        <Provider store={store}>
          <Drawer />
        </Provider>
      </RootSiblingParent>
    </AnimatedContext.Provider>
  )
};

export default App;
