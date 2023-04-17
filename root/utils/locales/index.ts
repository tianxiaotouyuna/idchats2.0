import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 自編語言包
import en from './languages/enUS.json'
import zh from './languages/zhCN.json'
import tw from './languages/twCN.json'

const resources = {
    en: {
        translation: en
    },
    zh: {
        translation: zh
    },
    tw: {
        translation: tw
    }
}

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3', // 对安卓进行兼容
        resources,
        fallbackLng: 'en ', // 默认语言，也是设置语言时设置了不存在的语言时使用的
        interpolation: {
            escapeValue: false
        }
    }, (err) => {
        // Alert.alert(JSON.stringify(i18n.language))
        // 錯誤
        if (err) throw err;
    });


export default i18n;

