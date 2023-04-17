import { NFTModel } from "@/hooks/useNfts";
import { Alert } from "react-native";
import { IPFS_URL } from "../constants";
import { fetchWithTimeout } from "./fetch";

const REG_MOBILE = /^1[23456789]\d{9}$/;
export const isMobile = (mobile: string) => REG_MOBILE.test(mobile);

const REG_NUMBER = /[^0-9]/gi;
export const number = (text: string) => {
  const value = text?.replace(REG_NUMBER, "");
  if (value === undefined || value === "") {
    return undefined;
  } else {
    return Number(value);
  }
};
//数字大小写,大于8位
const REG_PASSWORD = /(?=.*[0-9])(?=.*[a-zA-Z])/;
export const isPassword = (password: string) => {
  let arr=password.split('.')
  let str=arr.join('')
  if (REG_PASSWORD.test(str) == false) {
    return false;}
  else {
    if (hasEpx(str)) {
      return false;
    } else return true;
  }
};
export const replaceAll = (str: string, f: string, e: string) => {
  var reg = new RegExp(".", "g");
  var newstr = str.replace(reg, "a");
  return newstr;
};
//判断是否包含特殊字符串
export const hasEpx = (str: string) => {
  var p = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  if (p.test(str)) {
    return true;
  } else {
    return false;
  }
};

//数字大小写,大于8位
const REG_CHAINADDRESS = /^(0x)?[0-9a-fA-F]{40}$/;
export const isAddress = (address: string) => {return REG_CHAINADDRESS.test(address)};

const REG_PRIVATE = /^(0x)?[0-9a-fA-F]{64}$/;
export const isPrivateKey = (privateKey: string) => {return REG_PRIVATE.test(privateKey)};

export function normalizeHexAddress(address: string | Buffer): string {
  const addressString = typeof address === "object" && !("toLowerCase" in address) ? address.toString("hex") : address;
  const noPrefix = addressString.replace(/^0x/, "");
  const even = noPrefix.length % 2 === 0 ? noPrefix : `0${noPrefix}`;
  return `0x${Buffer.from(even, "hex").toString("hex")}`;
}



export function DomainParser(domainName:string) {
  var input = domainName;
  var modifyName = domainName;
  var b_error = false;
  var message = "";
  DomainParser.prototype.parse = function() {
    if (!input || input.length == 0) {
      failMessage('请填写域名，例如：***.com');
      return;
    }
    var labels = parseLabels();
    if (hasError()) {
      return;
    }
    // if (labels.length == 1) {
    //   failMessage('域名格式错误。请输入正确的域名格式，以“.”进行区分 ');
    //   return;
    // }
    // var topLabel = labels[labels.length - 1];
    // if (isDigitLabels(topLabel)) {
    //   failMessage("域名格式错误。请输入正确的域名格式，以“.”进行区分 ");
    //   return;
    // }
    // if (input.length > 255) {
    //   failMessage('域名过长。每标号不得超过63个字符。由多个标号组成的完整域名总共不超过255个字符。');
    //   return;
    // }
    var topLevel = parseTopLevel(labels);
    console.log(topLevel)
    //if (topLevel.labelIndex == 0) {
    if(!topLevel.recognized){
      failMessage(topLevel.name + '后缀的域名，不支持添加。');
      return;
    }
    var secondLevel = parseSecondLevel(labels, topLevel);
    if (secondLevel.labelIndex != 0 && topLevel.recognized) {
      modifyName = secondLevel.name + "." + topLevel.name;
    }
  }

  DomainParser.prototype.getModifyName = function() {
    return modifyName;
  }

  function hasError() {
    return b_error;
  }

  DomainParser.prototype.hasError = hasError;

  DomainParser.prototype.getMessage = function() {
    if (hasError()) {
      return message;
    } else {
      return null;
    }
  }

  function parseLabels() {
    var labels = new Array();
    var offset = 0;
    while (offset < input.length) {
      var label = parseLabel();
      if (!hasError() && label) {
        labels.push(label);
      } else {
        return;
      }
    }
    return labels;

    function parseLabel() {
      var labelArr = new Array();
      var start = offset;
      while (offset < input.length) {
        var ch = input.charAt(offset);
        var invalid = false;
        if (start == offset && !isLetterOrDigit(ch)) {
          invalid = true;
        } else if ((offset + 1 == input.length || input.charAt(offset + 1) == '.') && !isLetterOrDigit(ch)) {
          invalid = true;
        } else if (!isLabelChar(ch)) {
          invalid = true;
        }
        if (invalid) {
          failMessage('格式错误。域名一般由英文字母、汉字、阿拉伯数字、"-"组成，用“.”分隔，且每段不能以“.”、"-”开头和结尾');
          return;
        } else {
          labelArr.push(ch);
          offset++;
          if ((offset < input.length && input.charAt(offset) == '.') || (offset == input.length)) {
            if (offset < input.length && input.charAt(offset) == '.') {
              offset++;
            }
            if (labelArr.length > 63) {
              failMessage('域名过长。每标号不得超过63个字符。由多个标号组成的完整域名总共不超过255个字符。');
              return;
            }
            return labelArr.join("");
          }

        }
      }
    }
  }

  function isLabelChar(ch:string) {
    if (ch.charCodeAt(0) <= 127) {
      if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || (ch == '-')) {
        return true;
      } else {
        return false;
      }
    } else {
      if ((ch.charCodeAt(0) >= 0xFF00 && ch.charCodeAt(0) <= 0xFFEF) ||
        (ch.charCodeAt(0) >= 0x3000 && ch.charCodeAt(0) <= 0x303F)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  function isLetterOrDigit(ch:any) {
    if (ch.charCodeAt(0) <= 127) {
      if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) {
        return true;
      } else {
        return false;
      }
    } else {
      if ((ch.charCodeAt(0) >= 0xFF00 && ch.charCodeAt(0) <= 0xFFEF) ||
        (ch.charCodeAt(0) >= 0x3000 && ch.charCodeAt(0) <= 0x303F)
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  function isDigitLabels(label:any) {
    var i = 0;
    while (i < label.length) {
      var ch = label.charAt(i);
      if (!(ch >= '0' && ch <= '9')) {
        return false;
      }
      i++;
    }
    return true;
  }
  function parseTopLevel(labels:any) {
    var topLevelName = "";
    var lowTopLevelName = "";
    var topLevel;
    var index;
    if (labels.length >= 2) {
      topLevelName = labels[labels.length - 2] + "." + labels[labels.length - 1];
      lowTopLevelName = topLevelName.toLowerCase();
      for (index = 0; index < tow_top_level.length; index++) {
        if (lowTopLevelName == tow_top_level[index]) {
          topLevel = new TopLevel(topLevelName, 2, labels.length - 2, true);
          break;
        }
      }
    }
    if (!topLevel) {
      topLevelName = labels[labels.length - 1];
      lowTopLevelName = topLevelName.toLowerCase();
      for (index = 0; index < one_top_level.length; index++) {
        if (lowTopLevelName == one_top_level[index]) {
          topLevel = new TopLevel(topLevelName, 1, labels.length - 1, true);
          break;
        }
      }
    }
    if (!topLevel) {
      topLevelName = labels[labels.length - 1];
      topLevel = new TopLevel(topLevelName, 1, labels.length - 1, false);
    }
    return topLevel;
  }

  function TopLevel(name:string, labelCount:number, labelIndex:number, recognized:any) {
    return {name,labelCount,labelIndex,recognized};
  }

  function parseSecondLevel(labels:any, topLevel:any) {
    var secondLevel = new SecondLevel(labels[topLevel.labelIndex - 1], 1, topLevel.labelIndex - 1);
    return secondLevel;
  }

  function SecondLevel(name:string, labelCount:number, labelIndex:number) {
    return {name,labelCount,labelIndex};
  }

  function failMessage(msg:string) {
    message = msg;
    b_error = true;
  }

  var one_top_level = ['ac', 'ad', 'ae', 'aero', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq',
    'ar', 'arpa', 'as', 'asia', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd',
    'be', 'bf', 'bg', 'bh', 'bi', 'biz', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq',
    'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cat', 'cc', 'cd', 'cf',
    'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'com', 'coop', 'cr', 'cu',
    'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec',
    'edu', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm',
    'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm',
    'gn', 'gov', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm',
    'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'info', 'int',
    'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jobs', 'jp', 'ke',
    'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la',
    'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc',
    'md', 'me', 'mf', 'mg', 'mh', 'mil', 'mk', 'ml', 'mm', 'mn', 'mo',
    'mobi', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'museum', 'mv', 'mw',
    'mx', 'my', 'mz', 'na', 'name', 'nc', 'ne', 'net', 'nf', 'ng',
    'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'org', 'pa',
    'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'post', 'pr',
    'pro', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru',
    'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj',
    'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'ss', 'st', 'su', 'sv', 'sx',
    'sy', 'sz', 'tc', 'td', 'tel', 'tf', 'tg', 'th', 'tj', 'tk', 'tl',
    'tm', 'tn', 'to', 'tp', 'tr', 'travel', 'tt', 'tv', 'tw', 'tz',
    'ua', 'ug', 'uk', 'um', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg',
    'vi', 'vn', 'vu', 'wf', 'ws', '中国', '中國', '香港', '台湾', '台灣',
    '新加坡', 'xxx', 'ye', 'yt', 'za', 'zm', 'zw', 'zw', 'xn--fiqs8s',
    'xn--fiqz9s', 'xn--j6w193g', 'xn--kprw13d', 'xn--kpry57d',
    'xn--yfro4i67o', '公司', '网络', '網絡', 'xn--55qx5d', 'xn--io0a7i',
    'top','work','store','site','ltd','xyz','online','vip','art','cloud','wang','beer','link','tech',
    'ink','pub','red','biz','win','club','idv','live','shop','app','space','global','systems','firm',
    'today','life','love','one','icu',

  ];
  var tow_top_level = ['ac.cn', 'com.cn', 'edu.cn', 'gov.cn', 'mil.cn', 'net.cn', 'org.cn', 'bj.cn',
    'sh.cn', 'tj.cn', 'cq.cn', 'he.cn', 'sx.cn', 'nm.cn', 'ln.cn', 'jl.cn',
    'hl.cn', 'js.cn', 'zj.cn', 'ah.cn', 'fj.cn', 'jx.cn', 'sd.cn', 'ha.cn',
    'hb.cn', 'hn.cn', 'gd.cn', 'gx.cn', 'hi.cn', 'sc.cn', 'gz.cn', 'yn.cn',
    'xz.cn', 'sn.cn', 'gs.cn', 'qh.cn', 'nx.cn', 'xj.cn', 'tw.cn', 'hk.cn',
    'mo.cn', 'com.af', 'net.af', 'org.af', 'com.ag', 'net.ag', 'org.ag', 'co.at',
    'or.at', 'com.bi', 'edu.bi', 'info.bi', 'mo.bi', 'or.bi', 'org.bi', 'com.br',
    'net.br', 'org.br', 'co.bz', 'com.bz', 'net.bz', 'org.bz', 'co.cm', 'com.cm',
    'net.cm', 'com.co', 'net.co', 'nom.co', 'ar.com', 'br.com', 'cn.com', 'de.com',
    'eu.com', 'gb.com', 'gr.com', 'hu.com', 'jpn.com', 'kr.com', 'no.com',
    'ru.com', 'se.com', 'uk.com', 'us.com', 'za.com', 'com.de', 'co.dm', 'com.ec',
    'fin.ec', 'info.ec', 'med.ec', 'net.ec', 'pro.ec', 'com.es', 'nom.es',
    'org.es', 'co.gg', 'net.gg', 'org.gg', 'co.gl', 'com.gl', 'edu.gl', 'net.gl',
    'org.gl', 'com.gr', 'co.gy', 'com.gy', 'net.gy', 'com.hk', 'edu.hk', 'gov.hk',
    'idv.hk', 'net.hk', 'org.hk', 'com.hn', 'net.hn', 'org.hn', 'adult.ht', 'com.ht',
    'info.ht', 'net.ht', 'org.ht', 'org.il', 'co.in', 'firm.in', 'gen.in', 'ind.in',
    'net.in', 'org.in', 'bz.it', 'co.it', 'co.je', 'net.je', 'org.je', 'com.ki',
    'net.ki', 'org.ki', 'co.kr', 'ne.kr', 'or.kr', 'pe.kr', 're.kr', 'seoul.kr',
    'com.lc', 'net.lc', 'org.lc', 'co.mg', 'com.mg', 'net.mg', 'org.mg', 'ac.mu',
    'co.mu', 'com.mu', 'net.mu', 'org.mu', 'com.mx', 'gb.net', 'hu.net', 'jp.net',
    'se.net', 'uk.net', 'com.nf', 'net.nf', 'org.nf', 'co.nl', 'net.nz', 'org.nz',
    'ae.org', 'us.org', 'com.pe', 'net.pe', 'org.pe', 'com.ph', 'com.pk', 'net.pk',
    'org.pk', 'biz.pl', 'com.pl', 'info.pl', 'net.pl', 'org.pl', 'waw.pl', 'aaa.pro',
    'aca.pro', 'acct.pro', 'avocat.pro', 'bar.pro', 'cpa.pro', 'eng.pro', 'jur.pro',
    'law.pro', 'med.pro', 'recht.pro', 'com.ps', 'net.ps', 'org.ps', 'com.pt', 'edu.pt',
    'org.pt', 'com.ru', 'net.sb', 'org.sb', 'com.sc', 'net.sc', 'org.sc', 'com.sg',
    'com.so', 'net.so', 'org.so', 'club.tw', 'com.tw', 'ebiz.tw', 'game.tw', 'idv.tw',
    'org.tw', 'me.uk', 'org.uk', 'co.uz', 'com.uz', 'com.vc', 'net.vc', 'org.vc',
    'ac.vn', 'biz.vn', 'com.vn', 'edu.vn', 'gov.vn', 'health.vn', 'info.vn', 'int.vn',
    'name.vn', 'net.vn', 'org.vn', 'pro.vn'
  ];
}


/**
 * getNftimageUrl
 * @param el
 */
export async function getNftImageUrl(el: NFTModel) {
  // if (el.image_url) {
  //   return el.image_url;
  // } else if (el.extra_metadata.image_original_url?.indexOf("ipfs://") > -1) {
  //   return `${IPFS_URL}${el.extra_metadata.image_original_url.split("//")[1]}`;
  // } else if (el.extra_metadata.metadata_original_url) {
  //   const res = await (await fetchWithTimeout(el.extra_metadata.metadata_original_url)).json();
  //   return res.image_url;
  // }
  if (el.image_url) {
    return el.image_url;
  } else if (el.extra_metadata.image_original_url?.indexOf("ipfs://") > -1) {
    return `${IPFS_URL}${el.extra_metadata.image_original_url.split("//")[1]}`;
  } else if (el.extra_metadata.image_original_url) {
    return el.extra_metadata.image_original_url;
  } else if (el.extra_metadata.metadata_original_url) {
    const res = await (await fetchWithTimeout(el.extra_metadata.metadata_original_url)).json();
    return res.image_url;
  }
}