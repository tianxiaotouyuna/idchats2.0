import "react-native-gesture-handler";
import { RootSiblingParent } from 'react-native-root-siblings';
import {  LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Drawer } from "./routes/Drawer";
import React from "react";
  const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <RootSiblingParent>
        <Provider store={store}>
          <Drawer />
        </Provider>
      </RootSiblingParent>
  )
};

export default App;
