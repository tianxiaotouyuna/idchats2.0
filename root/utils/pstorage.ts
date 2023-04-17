//jeffyan

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Toast from "react-native-root-toast";
import { CONSTRACTABIKEYS } from "../constants";
import { UserService } from "../services";
import IMServiceManager from "./IMServiceManager";
import { toast } from "./system";
export default {
  async updateWallets(wallets_cache: any) {
    await AsyncStorage.setItem("wallets", JSON.stringify(wallets_cache));
  },
  //更新钱包余额
  async update_wallet_balance() {
    const wallets = await this.wallets();
    let wallets_with_balance = [];
    for (let index = 0; index < wallets.length; index++) {
      let newWallet = wallets[index];
      newWallet.balance = await UserService.getMainTokenWithChainId(newWallet.address, newWallet.chainId);
      wallets_with_balance.push(newWallet)
    }
    await AsyncStorage.setItem("wallets", JSON.stringify(wallets_with_balance));
  },

  //创建钱包
  async new_wallet(
    address: string,
    keyStore: string,
    name: string,
    pwd: string,
    privateKey: string,
    mnemonic: string,
    chainId?: number,
  ) {
    let initToken;
    let balance;
    if (chainId == 1) {
      initToken = [{
        coinToken: "0x7af963cf6d228e564e2a0aa0ddbf06210b38615d",
        abi: "",
        decimal: 18,
        coinName: "ETH",
        coinIcon: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
      }]
      balance = '0.00 ETH'
    }
    else if (chainId == 56) {
      initToken = [{
        coinToken: "0x242a1ff6ee06f2131b7924cacb74c7f9e3a5edc9",
        abi: CONSTRACTABIKEYS.BEP20ABI,
        decimal: 18,
        coinName: "BNB",
        coinIcon: "https://cn.etherscan.com/images/main/empty-token.png",
      }]
      balance = '0.00 BNB'
    }
    else if (chainId == 137) {
      initToken = [{
        coinToken: "0xcc42724c6683b7e57334c4e856f4c9965ed682bd",
        abi: "",
        decimal: 18,
        coinName: "MATIC",
        coinIcon: "https://cn.etherscan.com/images/main/empty-token.png",
      }]
      balance = '0.00 MATIC'
    }
    let new_wallet = {
      address: address,
      keyStore: keyStore,
      name: name,
      privateKey: privateKey,
      mnemonic: mnemonic,
      coinInfos: initToken,
      chainId: chainId,
      balance: balance
    };

    let ret_wallets = await AsyncStorage.getItem("wallets");

    let arr_wallets = [];

    if (ret_wallets) {
      arr_wallets = JSON.parse(ret_wallets);
    }

    for (var i = arr_wallets.length - 1; i >= 0; i--) {
      if (arr_wallets[i].address == address && arr_wallets[i].chainId == chainId) {
        return true;
      }
    }
    arr_wallets.push(new_wallet);

    await AsyncStorage.setItem("wallets", JSON.stringify(arr_wallets));
    console.log('钱包创建成功，钱包信息： \n' + JSON.stringify(arr_wallets))

    console.log("aaaaaaaa" + JSON.stringify(arr_wallets));
    this.update_wallet_balance()
    return new_wallet;
  },

  //所有钱包
  async wallets() {
    let ret_wallets = await AsyncStorage.getItem("wallets");

    let arr_wallets = [];

    if (ret_wallets) {
      arr_wallets = JSON.parse(ret_wallets);
    }
    console.log("wallets:===", arr_wallets);
    return arr_wallets;
  },
  //所有钱包
  async wallets_withChainID(chainId: number) {
    let ret_wallets = await AsyncStorage.getItem("wallets");

    let arr_wallets = [];
    let arr_wallets_chainId = [];

    if (ret_wallets) {
      arr_wallets = JSON.parse(ret_wallets);
    }
    for (var i = arr_wallets.length - 1; i >= 0; i--) {
      if (arr_wallets[i].chainId == chainId) {
        arr_wallets_chainId.push(arr_wallets[i]);
      }
    }

    console.log("wallets:===", arr_wallets_chainId);
    return arr_wallets_chainId;
  },
  //钱包
  async wallet(address: any) {
    let ret_wallets = await AsyncStorage.getItem("wallets");
    const chainId = IMServiceManager.getInstance().getChainId();

    let arr_wallets = [];
    // Alert.alert(JSON.stringify(ret_wallets))

    if (ret_wallets) {
      arr_wallets = JSON.parse(ret_wallets);
    }

    for (var i = arr_wallets.length - 1; i >= 0; i--) {
      if (arr_wallets[i].address == address && arr_wallets[i].chainId == chainId) {
        return arr_wallets[i];
      }
    }

    return null;
  },
  //钱包
  async coinNames(address: string) {
    let ret_wallets = await AsyncStorage.getItem("wallets");

    let arr_wallets = [];
    // Alert.alert(JSON.stringify(ret_wallets))

    if (ret_wallets) {
      arr_wallets = JSON.parse(ret_wallets);
    }


    for (var i = arr_wallets.length - 1; i >= 0; i--) {
      if (arr_wallets[i].address == address) {
        const coinInfos = arr_wallets[i]?.coinInfos;
        let coinNames = [];
        for (var i = coinInfos.length - 1; i >= 0; i--) {
          coinNames.push(coinInfos[i]?.coinName)
        }
        return coinNames;
      }
    }

  },
  //所有代币
  async assets() {
    let ret_assets = await AsyncStorage.getItem("assets");

    let arr_assets = [];

    if (ret_assets) {
      arr_assets = JSON.parse(ret_assets);
    }

    return arr_assets;
  },

  //初始化测试用代币
  async init_default_assets() {
    //await this.clear_wallets();

    let ret_assets = await AsyncStorage.getItem("assets");
    // if(ret_assets)
    // 	return ;
    let arr_assets = [];
    arr_assets.push({
      address: "ETH",
      abi: "",
      decimal: 18,
      name: "ETH",
      icon: "https://cn.etherscan.com/images/main/empty-token.png",
    });
    arr_assets.push({
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      abi: "",
      decimal: 18,
      name: "USDT(ERC-20)",
      icon: "https://cn.etherscan.com/token/images/tether_32.png",
    });
    arr_assets.push({
      address: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
      abi: "",
      decimal: 18,
      name: "HEX",
      icon: "https://cn.etherscan.com/token/images/hex_32.png",
    });
    arr_assets.push({
      address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
      abi: "",
      decimal: 18,
      name: "SAND",
      icon: "https://cn.etherscan.com/token/images/sand_32.png",
    });
    arr_assets.push({
      address: "0x3506424F91fD33084466F402d5D97f05F8e3b4AF",
      abi: "",
      decimal: 18,
      name: "chiliZ",
      icon: "https://cn.etherscan.com/token/images/chiliz_28.png",
    });
    arr_assets.push({
      address: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
      abi: "",
      decimal: 18,
      name: "Paxos Gold",
      icon: "https://cn.etherscan.com/token/images/paxosgold_32.png",
    });
    //arr_assets.push({address:"xxx2",abi:"aaaa",name:"ETH",icon:""});
    await AsyncStorage.setItem("assets", JSON.stringify(arr_assets));
  },

  //从钱包删除代币
  async del_asset_from_wallet(address: string, wallet_addr: string) {
    let ret_assets = await AsyncStorage.getItem(wallet_addr);

    let arr_assets = [];

    if (ret_assets) {
      arr_assets = JSON.parse(ret_assets);
    }

    for (var i = arr_assets.length - 1; i >= 0; i--) {
      if (arr_assets[i] == address) {
        arr_assets.splice(i, 1);
        break;
      }
    }

    await AsyncStorage.setItem(wallet_addr, JSON.stringify(arr_assets));
  },

  //取得代币
  async asset(address: string) {
    let ret_assets = await AsyncStorage.getItem("assets");
    let arr_assets = [];

    if (ret_assets) {
      arr_assets = JSON.parse(ret_assets);
    }
    for (var i = arr_assets.length - 1; i >= 0; i--) {
      if (arr_assets[i].address == address) {
        return arr_assets[i];
      }
    }

    return null;
  },

  //取得钱包里的所有代币
  async assets_for_wallet(wallet_addr: string) {
    let ret_assets = await AsyncStorage.getItem(wallet_addr);

    let arr_assets = [];

    if (ret_assets) {
      arr_assets = JSON.parse(ret_assets);
    }

    return arr_assets;
  },

  //删除钱包
  async del_walllet(address: string, chainId: number) {
    if (address == null || address.length == 0) return false;

    let ret_wallets = await AsyncStorage.getItem("wallets");

    let arr_wallets = [];

    if (ret_wallets) {
      arr_wallets = JSON.parse(ret_wallets);
    }

    let hasDelete = false;
    for (var i = arr_wallets.length - 1; i >= 0; i--) {
      if (arr_wallets[i]?.address.toLowerCase() == address.toLowerCase() && arr_wallets[i].chainId == chainId) {
        arr_wallets.splice(i, 1);
        await AsyncStorage.setItem("wallets", JSON.stringify(arr_wallets));
        console.log('aaaaaaaaaa=======删除的地址' + address)
        hasDelete = true
      }
    }
    return hasDelete;

  },

  //清除所有钱包
  async clear_wallets() {
    await AsyncStorage.setItem("wallets", JSON.stringify([]));
  },
  //清除所有钱包
  async update_wallets(update_wallets: any) {
    await AsyncStorage.setItem("wallets", JSON.stringify(update_wallets));
  },
  //钱包配置信息
  async set_walletConfig(data: {}) {
    try {
      await AsyncStorage.setItem("wallet_config", JSON.stringify(data));
      console.log("res" + "保存钱包配置成功");
    } catch (e) {
      Toast.show(JSON.stringify(e), { position: Toast.positions.CENTER })
      return e;
    }
  },

  //获取钱包配置信息
  async walletConfig() {
    try {
      const config = await AsyncStorage.getItem("wallet_config");
      console.log("res" + "获取钱包配置成功");
      return config;
    } catch (e) {
      Toast.show(JSON.stringify(e), { position: Toast.positions.CENTER })
      return e;
    }
  },

  //获取单个钱包,的地址本
  async oneAddressBooks(wallet_address: string) {
    let all_addressBooks = await AsyncStorage.getItem("all_addressBooks");
    if (!all_addressBooks) return [];
    else {
      for (var i = all_addressBooks.length - 1; i >= 0; i--) {
        if (all_addressBooks[i].address == wallet_address) {
          return all_addressBooks[i].data;
        }
      }
    }
  },
  //保存地址
  async saveWalletBook(wallet_address: string, book_address: string, beizhu: string) {
    let ret_all_addressBooks = await AsyncStorage.getItem("all_addressBooks");
    let arr_all_addressBooks = [];

    if (ret_all_addressBooks) {
      arr_all_addressBooks = JSON.parse(ret_all_addressBooks);
    }

    var new_one_AddressBooks = {};
    var new_all_addressBooks = new Array();
    if (!arr_all_addressBooks || arr_all_addressBooks.length == 0) {
      new_one_AddressBooks = {
        address: wallet_address,
        data: [{ address: book_address, beizhu: beizhu }],
      };
      new_all_addressBooks.push(new_one_AddressBooks);
    } else {
      for (var i = arr_all_addressBooks.length - 1; i >= 0; i--) {
        new_one_AddressBooks = arr_all_addressBooks[i];
        if (arr_all_addressBooks[i].address == wallet_address) {
          new_one_AddressBooks.data.push({
            address: book_address,
            beizhu: beizhu,
          });
        }
        new_all_addressBooks.push(new_one_AddressBooks);
      }
    }

    await AsyncStorage.setItem(
      "all_addressBooks",
      JSON.stringify(new_all_addressBooks)
    );

    console.log("all_addressBooks" + JSON.stringify(new_all_addressBooks));
  },
  //清除所有地址本
  async clear_books() {
    await AsyncStorage.setItem("all_addressBooks", JSON.stringify([]));
  },
  //地址本
  async get_books(wallet_address: string) {
    let ret_all_addressBooks = await AsyncStorage.getItem("all_addressBooks");
    let arr_all_addressBooks = [];

    if (ret_all_addressBooks) {
      arr_all_addressBooks = JSON.parse(ret_all_addressBooks);
    }

    var res_arr = [];

    for (var i = arr_all_addressBooks.length - 1; i >= 0; i--) {
      if (arr_all_addressBooks[i].address == wallet_address) {
        res_arr = arr_all_addressBooks[i].data
      }
    }
    return res_arr
  },
};
