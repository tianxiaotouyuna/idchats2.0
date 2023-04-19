import { createStackNavigator } from "@react-navigation/stack";
import { Route } from "../utils";
import React, { FunctionComponent, useState } from 'react'
import Tab from "./Tab";
import FirstPage from "@/pages/GuidePage/FirstPage/FirstPage";
import Communication from "@/pages/Communication/Communication";
import Community from "@/pages/Community/Community";
import Swap from "@/pages/Swap/Swap";
import Discover from "@/pages/Discover/Discover";
import My from "@/pages/My/My";
import ChatDetail from "@/pages/Communication/Message/ChatDetail/ChatDetail";
import Bill from "@/pages/My/Bill/Bill";
import Merchant from "@/pages/My/Merchant/Merchant";
import AssetsContainer from "@/pages/My/AssetsContainer/AssetsContainer";
import Followers from "@/pages/My/Followers/Followers";
import Likes from "@/pages/My/Likes/Likes";
import SetLaungue from "@/pages/My/EditInfo/Setup/SetLanguage/SetLaungue";
import AddAccount from "@/pages/GuidePage/FirstPage/AddAccount/AddAccount";
import InsertWallet from "@/pages/GuidePage/FirstPage/AddAccount/SetPassword/InsertWallet/InsertWallet";
import CreateWallet from "@/pages/GuidePage/FirstPage/AddAccount/SetPassword/CreateWallet/CreateWallet";
import SetPassword from "@/pages/GuidePage/FirstPage/AddAccount/SetPassword/SetPassword";
import MnemonicVerify from "@/pages/GuidePage/FirstPage/AddAccount/SetPassword/CreateWallet/MnemonicVerify/MnemonicVerify";
import UnlockWallet from "@/pages/GuidePage/FirstPage/UnlockWallet/UnlockWallet";
import { Message } from "react-native-gifted-chat";
import List from "@/pages/Communication/List/List";
import { useRoute } from "@react-navigation/native";
import SearchPage from "@/pages/Communication/SearchPage/SearchPage";
import PersonPage from "@/pages/Communication/Message/ChatDetail/PersonPage/PersonPage";
import Store from "@/pages/Discover/Store/Store";
import HomePage from "@/pages/Community/HomePage/HomePage";
import HotPage from "@/pages/Community/HotPage/HotPage";
import AntiSpam from "@/pages/My/AntiSpam/AntiSpam";
import Contour from "@/pages/My/Contour/Contour";
import ProjectInfo from "@/pages/Discover/DappSquare/ProjectInfo/ProjectInfo";
import EditInfo from "@/pages/My/EditInfo/EditInfo";
import ChangeTel from "@/pages/My/EditInfo/AssociatePhone/ChangeTel/ChangeTel";
import DomainSetting from "@/pages/My/EditInfo/DomainSetting/DomainSetting";
import BindSocial from "@/pages/My/EditInfo/BindSocial/BindSocial";
import WalletCashier from "@/pages/My/WalletCashier/WalletCashier";
import Scanner from "@/pages/My/Scanner/Scanner";
import WalletTransler from "@/pages/My/WalletTransler/WalletTransler";
import MyNfts from "@/pages/My/MyNfts/MyNfts";
import WalletDetail from "@/pages/My/WalletDetail/WalletDetail";
import AssociateNewPhone from "@/pages/My/EditInfo/AssociatePhone/AssociateNewPhone/AssociateNewPhone";
import AssociateOldPhone from "@/pages/My/EditInfo/AssociatePhone/AssociateOldPhone/AssociateOldPhone";
import VertityCurrentPhone from "@/pages/My/EditInfo/AssociatePhone/AssociateOldPhone/VertityCurrentPhone/VertityCurrentPhone";
import SetNewPhone from "@/pages/My/EditInfo/AssociatePhone/AssociateOldPhone/VertityCurrentPhone/SetNewPhone/SetNewPhone";
import Setup from "@/pages/My/EditInfo/Setup/Setup";
import AboutUs from "@/pages/My/EditInfo/AboutUs/AboutUs";
import WalletManger from "@/pages/My/EditInfo/WalletManger/WalletManger";
import SetLanguage from "@/pages/My/EditInfo/Setup/SetLanguage/SetLaungue";
import NftDetail from "@/pages/My/MyNfts/NftDetail/NftDetail";
import WalletManagerPop from "@/components/WalletManagerPop/WalletManagerPop";
import UserAgreement from "@/pages/My/EditInfo/UserAgreement/UserAgreement";
import ExportSecert from "@/pages/My/EditInfo/Setup/ExportSecert/ExportSecert";
import ExportMnemonic from "@/pages/My/EditInfo/Setup/ExportMnemonic/ExportMnemonic";
import ExportKeyStore from "@/pages/My/EditInfo/Setup/ExportKeyStore/ExportKeyStore";
import BackUpMnemonic from "@/pages/My/EditInfo/Setup/ExportMnemonic/BackUpMnemonic/BackUpMnemonic";
import VerifyMnemonic from "@/pages/My/EditInfo/Setup/ExportMnemonic/BackUpMnemonic/VerifyMnemonic/VerifyMnemonic";
import CurrencyUnit from "@/pages/My/EditInfo/Setup/CurrencyUnit/CurrencyUnit";
import NftTransfer from "@/pages/My/MyNfts/NftDetail/NftTransfer/NftTransfer";
import AddAddress from "@/pages/My/Bill/AddAddress/AddAddress";
import SetIntroduction from "@/pages/My/WalletDetail/SetIntroduction/SetIntroduction";
import CommunityRules from "@/pages/Community/CommunityRules/CommunityRules";
import GroupChatPage from "@/pages/Community/HomePage/GroupChatPage/GroupChatPage";
import CommunitySettings from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/CommunitySettings";
import MemberList from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/MemberList/MemberList";
import CreateCommunity from "@/pages/Community/CreateCommunity/CreateCommunity";
import CommunityInformation from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/CommunityInformation/CommunityInformation";
import CreateIDO from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/CreateIDO/CreateIDO";
import CreateIDO2 from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/CreateIDO/CreateIDO2/CreateIDO2";
import EmailLogin from "@/pages/GuidePage/EmailLogin/EmailLogin";
import EmailRegister from "@/pages/GuidePage/EmailLogin/EmailRegister/EmailRegister";
import EmailForget from "@/pages/GuidePage/EmailLogin/EmailForget/EmailForget";
import EmailForget2 from "@/pages/GuidePage/EmailLogin/EmailForget/EmailForget2/EmailForget2";
import MailboxSettings from "@/pages/My/EditInfo/MailboxSettings/MailboxSettings";
import EmailChange from "@/pages/My/EditInfo/MailboxSettings/EmailChange/EmailChange";
import CreateSubChannel from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/CreateSubChannel/CreateSubChannel";
import HisCommunities from "@/pages/Communication/Message/ChatDetail/PersonPage/HisCommunities/HisCommunities";
import Approve from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/CreateIDO/CreateIDO2/Approve/Approve";
import SetCount from "@/pages/Community/HomePage/GroupChatPage/CommunitySettings/CreateIDO/CreateIDO2/Approve/SetCount/SetCount";
import ParticipateIdo from "@/pages/Community/HomePage/GroupChatPage/ParticipateIdo/ParticipateIdo";
import IdoDetail from "@/pages/Community/HomePage/GroupChatPage/ParticipateIdo/IdoDetail/IdoDetail";
import CountSet from "@/pages/Community/HomePage/GroupChatPage/ParticipateIdo/IdoDetail/CountSet/CountSet";
import HomePageSec from "@/pages/HomePage/HomePageSec";
const ScreenStack = createStackNavigator();

const Screen: FunctionComponent = (props) => {
    const initName: string = useRoute().params?.initName ?? {};
    const render = () => {
        return (
            <ScreenStack.Navigator initialRouteName={initName}>
                <ScreenStack.Screen name={Route.SCREEN.Tab} component={Tab} options={{
                    headerShown: false
                }} />
                <ScreenStack.Screen name={Route.SCREEN.FirstPage} component={FirstPage} options={{
                    headerShown: false
                }} />
                <ScreenStack.Screen name={Route.SCREEN.Communication} component={Communication} />
                <ScreenStack.Screen name={Route.SCREEN.Community} component={Community} />
                <ScreenStack.Screen name={Route.SCREEN.Swap} component={Swap} />
                <ScreenStack.Screen name={Route.SCREEN.Discover} component={Discover} />
                <ScreenStack.Screen name={Route.SCREEN.My} component={My} />
                <ScreenStack.Screen name={Route.SCREEN.ChatDetail} component={ChatDetail}  />
                <ScreenStack.Screen name={Route.SCREEN.Bill} component={Bill} />
                <ScreenStack.Screen name={Route.SCREEN.MyNfts} component={MyNfts} />
                <ScreenStack.Screen name={Route.SCREEN.Merchant} component={Merchant} />
                <ScreenStack.Screen name={Route.SCREEN.AssetsContainer} component={AssetsContainer} />
                <ScreenStack.Screen name={Route.SCREEN.Setup} component={Setup} options={{
                    headerShown: true
                }} />
                <ScreenStack.Screen name={Route.SCREEN.SearchPage} component={SearchPage} />
                <ScreenStack.Screen name={Route.SCREEN.Followers} component={Followers} />
                <ScreenStack.Screen name={Route.SCREEN.Likes} component={Likes} />
                <ScreenStack.Screen name={Route.SCREEN.SetLaungue} component={SetLaungue} />
                <ScreenStack.Screen name={Route.SCREEN.AddAccount} component={AddAccount} />
                <ScreenStack.Screen name={Route.SCREEN.InsertWallet} component={InsertWallet} />
                <ScreenStack.Screen name={Route.SCREEN.CreateWallet} component={CreateWallet} />
                <ScreenStack.Screen name={Route.SCREEN.SetPassword} component={SetPassword} />
                <ScreenStack.Screen name={Route.SCREEN.MnemonicVerify} component={MnemonicVerify} />
                <ScreenStack.Screen name={Route.SCREEN.UnlockWallet} component={UnlockWallet} />
                <ScreenStack.Screen name={Route.SCREEN.Message} component={Message} />
                <ScreenStack.Screen name={Route.SCREEN.List} component={List} />
                <ScreenStack.Screen name={Route.SCREEN.PersonPage} component={PersonPage} />
                <ScreenStack.Screen name={Route.SCREEN.Store} component={Store} />
                <ScreenStack.Screen name={Route.SCREEN.HomePage} component={HomePage} />
                <ScreenStack.Screen name={Route.SCREEN.HotPage} component={HotPage} />
                <ScreenStack.Screen name={Route.SCREEN.AntiSpam} component={AntiSpam} />
                <ScreenStack.Screen name={Route.SCREEN.Contour} component={Contour} />
                <ScreenStack.Screen name={Route.SCREEN.ProjectInfo} component={ProjectInfo} />
                <ScreenStack.Screen name={Route.SCREEN.EditInfo} component={EditInfo} />
                <ScreenStack.Screen name={Route.SCREEN.ChangeTel} component={ChangeTel} />
                <ScreenStack.Screen name={Route.SCREEN.DomainSetting} component={DomainSetting} />
                <ScreenStack.Screen name={Route.SCREEN.BindSocial} component={BindSocial} />
                <ScreenStack.Screen name={Route.SCREEN.WalletCashier} component={WalletCashier} />
                <ScreenStack.Screen name={Route.SCREEN.Scanner} component={Scanner} />
                <ScreenStack.Screen name={Route.SCREEN.WalletTransler} component={WalletTransler} />
                <ScreenStack.Screen name={Route.SCREEN.WalletDetail} component={WalletDetail} />
                <ScreenStack.Screen name={Route.SCREEN.AssociateNewPhone} component={AssociateNewPhone} />
                <ScreenStack.Screen name={Route.SCREEN.AssociateOldPhone} component={AssociateOldPhone} />
                <ScreenStack.Screen name={Route.SCREEN.VertityCurrentPhone} component={VertityCurrentPhone} />
                <ScreenStack.Screen name={Route.SCREEN.SetNewPhone} component={SetNewPhone} />
                <ScreenStack.Screen name={Route.SCREEN.AboutUs} component={AboutUs} />
                <ScreenStack.Screen name={Route.SCREEN.WalletManger} component={WalletManger} />
                <ScreenStack.Screen name={Route.SCREEN.SetLanguage} component={SetLanguage} />
                <ScreenStack.Screen name={Route.SCREEN.NftDetail} component={NftDetail} />
                <ScreenStack.Screen name={Route.SCREEN.WalletManagerPop} component={WalletManagerPop} />
                <ScreenStack.Screen name={Route.SCREEN.UserAgreement} component={UserAgreement} />
                <ScreenStack.Screen name={Route.SCREEN.ExportSecert} component={ExportSecert} />
                <ScreenStack.Screen name={Route.SCREEN.ExportKeyStore} component={ExportKeyStore} />
                <ScreenStack.Screen name={Route.SCREEN.ExportMnemonic} component={ExportMnemonic} />
                <ScreenStack.Screen name={Route.SCREEN.BackUpMnemonic} component={BackUpMnemonic} />
                <ScreenStack.Screen name={Route.SCREEN.VerifyMnemonic} component={VerifyMnemonic} />
                <ScreenStack.Screen name={Route.SCREEN.CurrencyUnit} component={CurrencyUnit} />
                <ScreenStack.Screen name={Route.SCREEN.NftTransfer} component={NftTransfer} />
                <ScreenStack.Screen name={Route.SCREEN.AddAddress} component={AddAddress} />
                <ScreenStack.Screen name={Route.SCREEN.SetIntroduction} component={SetIntroduction} />
                <ScreenStack.Screen name={Route.SCREEN.CommunityRules} component={CommunityRules} />
                <ScreenStack.Screen name={Route.SCREEN.GroupChatPage} component={GroupChatPage} />
                <ScreenStack.Screen name={Route.SCREEN.CommunitySettings} component={CommunitySettings} />
                <ScreenStack.Screen name={Route.SCREEN.MemberList} component={MemberList} />
                <ScreenStack.Screen name={Route.SCREEN.CreateCommunity} component={CreateCommunity} />
                <ScreenStack.Screen name={Route.SCREEN.CommunityInformation} component={CommunityInformation} />
                <ScreenStack.Screen name={Route.SCREEN.CreateIDO} component={CreateIDO} />
                <ScreenStack.Screen name={Route.SCREEN.CreateIDO2} component={CreateIDO2} />
                <ScreenStack.Screen name={Route.SCREEN.EmailLogin} component={EmailLogin} />
                <ScreenStack.Screen name={Route.SCREEN.EmailRegister} component={EmailRegister} />
                <ScreenStack.Screen name={Route.SCREEN.EmailForget} component={EmailForget} />
                <ScreenStack.Screen name={Route.SCREEN.EmailForget2} component={EmailForget2} />
                <ScreenStack.Screen name={Route.SCREEN.MailboxSettings} component={MailboxSettings} />
                <ScreenStack.Screen name={Route.SCREEN.EmailChange} component={EmailChange} />
                <ScreenStack.Screen name={Route.SCREEN.CreateSubChannel} component={CreateSubChannel} />
                <ScreenStack.Screen name={Route.SCREEN.HisCommunities} component={HisCommunities} />
                <ScreenStack.Screen name={Route.SCREEN.Approve} component={Approve} />
                <ScreenStack.Screen name={Route.SCREEN.SetCount} component={SetCount} />
                <ScreenStack.Screen name={Route.SCREEN.ParticipateIdo} component={ParticipateIdo} />
                <ScreenStack.Screen name={Route.SCREEN.IdoDetail} component={IdoDetail} />
                <ScreenStack.Screen name={Route.SCREEN.CountSet} component={CountSet} />
                <ScreenStack.Screen name={Route.SCREEN.HomePageSec} component={HomePageSec} />
            </ScreenStack.Navigator>
        )
    }
    return (
        render()
    )
}

export default Screen