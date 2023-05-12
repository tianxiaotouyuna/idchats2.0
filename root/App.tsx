import "react-native-gesture-handler";
import { RootSiblingParent } from 'react-native-root-siblings';
import { Alert, LogBox, NativeModules, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import React, { useMemo, useState } from "react";
import { Nav } from "./routes/Nav";
import { CacheKeys } from "./constants";
import { Storage } from "./utils";
import pstorage from "./utils/pstorage";
import i18n from "./utils/locales";
const App = () => {
  LogBox.ignoreAllLogs();
  const [wallets, setWallets] = useState(null);
  const setInitPage = async () => {
    const wallets = await pstorage.wallets();
    setWallets(wallets)
  }
  const setlaunge = async () => {
    const laungueCode = await Storage.load(CacheKeys.LANGUNECOD);
    if (laungueCode == null) {
      const locale =
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale
          : NativeModules.I18nManager.localeIdentifier;
      i18n.changeLanguage(locale == 'zh_CN' ? 'tw' : locale == 'en_US' ? 'en' : 'tw');
      await Storage.save(CacheKeys.LANGUNECOD, locale == 'zh_CN' ? 0 : locale == 'en_US' ? 1 : 0)
      setInitPage()
    }
    else {
      i18n.changeLanguage(laungueCode == 0 ? 'tw' : 'en');
      setInitPage()
    }
  }
  useMemo(() => {
    setlaunge()
  }, []);
  return (
    wallets ?
      <RootSiblingParent>
        <Provider store={store}>
          <Nav initName={wallets.length ? 'HomePage' : 'HomePage'} />
        </Provider>
      </RootSiblingParent>
      : null
  )
};

export default App