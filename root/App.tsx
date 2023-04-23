import "react-native-gesture-handler";
import { RootSiblingParent } from 'react-native-root-siblings';
import {  LogBox, NativeModules, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import React, { useMemo, useState } from "react";
import { Nav } from "./routes/Nav";
import { useTranslation } from "react-i18next";
import { CacheKeys } from "./constants";
import { Storage } from "./utils";
import pstorage from "./utils/pstorage";
  const App = () => {
  const { i18n } = useTranslation();
  const [wallets, setWallets] = useState(null);
  LogBox.ignoreAllLogs();
  const setlaunge = async () => {
    const laungueCode = await Storage.load(CacheKeys.LANGUNECOD);
    if (laungueCode == null) {
      const locale =
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale
          : NativeModules.I18nManager.localeIdentifier;
    }
    else {
    }
  }

  const setInitPage = async () => {
    const wallets = await pstorage.wallets();
    setWallets(wallets)
  }
  useMemo(() => {
    setlaunge()
  }, []);
  return (
      <RootSiblingParent>
        <Provider store={store}>
          <Nav  />
        </Provider>
      </RootSiblingParent>
  )
};

export default App;
