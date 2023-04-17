import "react-native-gesture-handler";
import { Nav } from "@/routes/Nav";
import { RootSiblingParent } from 'react-native-root-siblings';
import { Alert, LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";
import '@/utils/locales/index'
import storage from "./utils/pstorage";
import {  useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NativeModules, Platform } from 'react-native';
import { Storage } from "./utils";
import { CacheKeys } from "./constants";
import '../shim.js'
import 'text-encoding-polyfill'
import Joi from '@hapi/joi'
const App = () => {
  const [wallets, setWallets] = useState(null);
  const { i18n } = useTranslation();
  LogBox.ignoreAllLogs();

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

  const setInitPage = async () => {
    const wallets = await storage.wallets();
    setWallets(wallets)
  }
  useMemo(() => {
    setlaunge()
  }, []);

  return (
    wallets ?

      <RootSiblingParent>
        <Provider store={store}>
          <Nav initName={wallets.length ? 'Tab' : 'FirstPage'} />
        </Provider>
      </RootSiblingParent>
      : null
  )
};

export default App;
