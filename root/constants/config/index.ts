export const AXIOSURL =
  process.env.REACT_APP_ENV === "production" ? "https://idchats.com" : process.env.REACT_APP_ENV === "test" ? "http://test1.idchats.com" : "http://192.168.100.99:10004";
export const AXIOSTIMEOUT = 60000;
export const ADMINURL =
  process.env.REACT_APP_ENV === "production" ? "https://idchats.com" : process.env.REACT_APP_ENV === "test" ? "http://test1.idchats.com" : "http://192.168.100.99:10002";
export const IMURL =
  process.env.REACT_APP_ENV === "production" ? "wss://idchats.com:11003" : process.env.REACT_APP_ENV === "test" ? "ws://test1.idchats.com:10003" : "ws://192.168.100.99:10003";
export const WEB3URL =
  process.env.REACT_APP_ENV === "production" ? "https://idchats.com" : process.env.REACT_APP_ENV === "test" ? "http://test1.idchats.com" : "http://192.168.100.11:9002";
export const THIRDURL =
  process.env.REACT_APP_ENV === "production" ? "https://idchats.com" : process.env.REACT_APP_ENV === "test" ? "http://test1.idchats.com" : "http://192.168.100.99:10030";

export const PICMESSAGETHUMOPTION = "?imageView2/1/w/200/h/200/rq/80";
export const LANGUAGE = "en";

export const getIMUrl = () => IMURL;
export const getAxiosUrl = () => AXIOSURL;
export const getAdminUrl = () => ADMINURL;
export const getWeb3Url = () => WEB3URL;
export const getLanguage = () => (localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng")! : LANGUAGE);
