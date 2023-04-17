import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, Modal, Platform } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { isIOS, pxToDp, readFile, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import { useHeaderHeight } from "@react-navigation/stack";
import WebView from "react-native-webview";
import useRedux from "@/hooks/useRedux";

const UserAgreement: FunctionComponent = (props) => {
  const headerHeight = useHeaderHeight();
  const { laungueCode } = useRedux();
  // 拿到i18n
  const { i18n, t } = useTranslation();
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      title: t('my.userAgreement'),
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });

  // const getPath = () => {
  //   if (isIOS) {
  //     return laungueCode ? './html_en.html' : './html_tw.html'
  //   }
  //   else {
  //     return laungueCode ? 'file:///android_asset/html_en.html' : 'file:///android_asset/html_tw.html'
  //   }
  // }
  return (
    <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight + UIELEMENTS.PADDING_TOP }]}>
      <WebView
        style={{ width: '100%', backgroundColor: 'transparent' }}

        originWhitelist={['*']}

        allowFileAccess={true}
        // source={{ uri: getPath() }}
        source={{ html: laungueCode ? HTML2 : HTML }}
        javaScriptEnabled={true}

        decelerationRate='normal'

        scrollEnabled={true}

        useWebKit={true}

        mediaPlaybackRequiresUserAction={true}

        mixedContentMode='compatibility'

        allowingReadAccessToURL='*'

      />
    </View>
  );
}

const HTML2 = `
<meta name="viewport" content="initial-scale=1.0" />
<html>
<head>
	<title></title>
</head>
  <body text="#fff">
<div data-docx-has-block-data="false" data-page-id="YFQPdX9c9oz74Qxsb2Kc8ypDn6g">
<div class="ace-line ace-line old-record-id-YFQPdX9c9oz74Qxsb2Kc8ypDn6g"><strong>Terms of Service</strong></div>

<div class="ace-line ace-line old-record-id-JqsAdGSW0oCQOIxOcdyconIPnCg">《IDChats labs Terms of Service》</div>

<div class="ace-line ace-line old-record-id-Sc0WdOwQuocGEixOYlUcg17SnSf">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-UuucdEKG2o60kExo7MwctKENn5e">Dear User,</div>

<div class="ace-line ace-line old-record-id-UaoYd4kYmoS0igxSynSc7JTInvf">&nbsp;&nbsp;Thank you for choosing IDChats labs. This IDChats labs Terms of Service (&ldquo;Agreement&rdquo;) is made between you (&ldquo;you&rdquo; or &ldquo;User&rdquo;) and IDChats labs Foundation Ltd. (&ldquo;TPF&rdquo; or &ldquo;we&rdquo;) and is legally binding between you and TPF.</div>

<div class="ace-line ace-line old-record-id-DOWmdca24owci2xsZJwc1bCknHd">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-F2gqdYMYIoCaWQxCSF7chfO5n2d">&nbsp;&nbsp;TPF hereby reminds you that you must carefully read the full content of this Agreement and other documents mentioned in this Agreement before using IDChats labs (&ldquo;IDChats labs&rdquo; or &ldquo;App&rdquo;). Particularly, you must carefully read the section of &ldquo;Disclaimer and Limitation of Liability&rdquo; and other sections which are displayed in bold. You must make sure that you fully understand the whole Agreement and evaluate the risks of using IDChats labs on your own. In addition, IDChats labs can be downloaded on mobile application platforms, including but not limited to Google Play and App Store.</div>

<div class="ace-line ace-line old-record-id-AQe8dm8WooscCaxcrKIc4w1jnGU">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-W8OcdAKKKoaKKIxx3y2cDheKnfR">&nbsp;&nbsp;I. Confirmation and Acceptance of this Agreement</div>

<div class="ace-line ace-line old-record-id-NQOedA6A8oYuWyxQxXAciZBgnnf">&nbsp;&nbsp;1.1 You understand that this Agreement and other relevant documents apply to IDChats labs and the Decentralized Applications (&ldquo;DApps&rdquo;) which are developed and owned independently by TPF on IDChats labs (and excluding DApps developed by third parties).</div>

<div class="ace-line ace-line old-record-id-I8SydYeEaoamYoxSAKucWKKcnCe">&nbsp;&nbsp;1.2 After you download IDChats labs and start to create or import wallet, you are deemed as having read and accepted this Agreement, which shall cause this Agreement to become effective and legally binding on both you and TPF immediately.</div>

<div class="ace-line ace-line old-record-id-Y2AAdYOOyo8wsixSSoncwJR1nzz">&nbsp;&nbsp;1.3 TPF may, at its sole discretion, modify or replace this Agreement at any time. The modified Agreement will automatically take effect once it is posted on IDChats labs and you will not be notified separately. If you do not agree with the modifications, you shall cease to use IDChats labs immediately. Use of IDChats labs by you after any modification to this Agreement constitutes your acceptance of this Agreement as modified.</div>

<div class="ace-line ace-line old-record-id-PaScdGkO6ogoqmxmUq6cmFVhnEh">&nbsp;&nbsp;1.4 If you are under 18 years old or you are a person of no capacity for civil acts or a person of limited capacity for civil acts, please use IDChats labs under the guidance of your parents or guardians.</div>

<div class="ace-line ace-line old-record-id-YOMidK2SKoYmiCxM177cMjGLn9e">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-FACMdA60mos0sixIdZEcFR98nme">&nbsp;&nbsp;II. Definition</div>

<div class="ace-line ace-line old-record-id-ASawdOaUgocu0Ox41Gjc7nSRnlf">&nbsp;&nbsp;2.2 User: a) a User must be a natural person who possesses full capacity for civil acts; b) if you are under 18 years old, please use IDChats labs under the guidance of your parents or guardians. If any person of no capacity for civil acts conducts any transactions on IDChats labs or any person of limited capacity for civil acts conducts any transaction which does not commensurate his/her civil rights or act capacity, the parents or guardians of the User shall be liable for the consequences of such transactions.</div>

<div class="ace-line ace-line old-record-id-MQKEdyOIwo6KSixmKdJcr8zwnHe">&nbsp;&nbsp;2.3 Excluded Person: a) except for natural persons, persons who have the legal and consciousness ability to conclude this Agreement; or b) users who are prohibited, restricted, unauthorized or unqualified to use the service (as defined in this Agreement) ) in any form or method (in whole or in part) due to this Agreement, laws, regulatory requirements, or the provisions of the jurisdiction applicable to the user. For the avoidance of doubt, Chinese Users are also regarded as &quot;Excluded Person&quot;. 2.4 Terms:</div>

<div class="ace-line ace-line old-record-id-OoMIdgSIuocOM8x8t6AcPHrJnOf">&nbsp;&nbsp;a) Create or import wallet: Using IDChats labs to create or import wallet after you accept this Agreement.</div>

<div class="ace-line ace-line old-record-id-WgQMdQu4IoM0ccxWIX4cd2pdn8c">&nbsp;&nbsp;b) Wallet Password: The password you set when you create the wallet. The Wallet Password will be used to encrypt and protect your Private Key. IDChats labs, as a decentralized application, will not store your Wallet Password on our servers, nor will your Wallet Password be stored in your own mobile devices. If you lose or forget your Wallet Password, you will have to reset the Wallet Password with your Private Key or Mnemonic Words.</div>

<div class="ace-line ace-line old-record-id-VosYd0A8iomciUxKMsxc1uvyntf">&nbsp;&nbsp;Reminder: It is recommended that Users follow the relevant steps for the information prompts involved in the IDChats labs operating interface.</div>

<div class="ace-line ace-line old-record-id-WKA0digSqoK282xQlxLct2knnPe">&nbsp;&nbsp;c) Specific Users: Users who should cooperate with TPF and disclose Personal Information in order to comply with the laws, regulations and policies of Singapore.</div>

<div class="ace-line ace-line old-record-id-OgomdGC2so22wIx63dhcBhMnnGe">&nbsp;&nbsp;d) Private Key: Consists of 256 random bits. Private Key is the core for the User to hold and use the Tokens.</div>

<div class="ace-line ace-line old-record-id-ZykcdUOYko6kSqxCaz6cmJConLh">&nbsp;&nbsp;e) Public Key: Public key is derived from the Private Key based on cryptography and is used to generate wallet addresses. A wallet address is a public address for reception of Tokens.</div>

<div class="ace-line ace-line old-record-id-EUCud0oG8oIYucx2Fenckrdvnzg">&nbsp;&nbsp;f) Mnemonic Words: Consists of 12 (or 15/18/21/24) words which are randomly generated, and it is based on BIP39, the industry standard of blockchain. It is a human readable format of words to back up your Private Key for recovery.</div>

<div class="ace-line ace-line old-record-id-KUyEd6oueoIm2cxkVXIcuat9nNb">&nbsp;&nbsp;g) Keystore: A file that is encrypted by Private Key or Mnemonic Words and protected by the User&rsquo;s Wallet Password. Keystore is stored only in Users&rsquo; mobile device and will not be synchronized to TPF servers.</div>

<div class="ace-line ace-line old-record-id-XSqWdMOIAoQEMAx0GaDcafxBnjc">&nbsp;&nbsp;h) Tokens: The tokens which are supported by IDChats labs currently, including but not limited to ETH, EOS and so on.</div>

<div class="ace-line ace-line old-record-id-W6MWdCsoaoy62Yx2jnScagVCnke">&nbsp;&nbsp;i) Materials: Contents in the columns of &ldquo;News&rdquo;, etc. on IDChats labs. The Materials are TPF&rsquo; proprietary properties. User shall not reproduce or distribute the materials without TPF&rsquo; permission and authorization.</div>

<div class="ace-line ace-line old-record-id-Qo6udgQwUouCiqxYPzmccSaQnek">&nbsp;&nbsp;j) Personal Information: Means information recorded in electronic or any other form which may identify a natural person when used alone or in combination with other information, including but not limited to name, date of birth, identification card number, personal biological identification information, address, telephone number, bank card number, email address, wallet address, mobile device information, operation record, transaction record, but excluding Wallet Password, Private Key, Mnemonic Words and Keystore.</div>

<div class="ace-line ace-line old-record-id-WeMyd4UqgoAEoAxELbFcHy0bnOe">&nbsp;&nbsp;k) PRC: The People&rsquo;s Republic of China, including Hong Kong, Macau and Taiwan.</div>

<div class="ace-line ace-line old-record-id-Mq0Adwegwo28Y2xO00jcNkw1nde">&nbsp;&nbsp;l) Third-party services: Products and services provided by third parties such as third-party DApps, third-party DeFi, third-party smart contracts, third-party open source agreements, third-party web pages, third-party hardware wallets, third-party online web wallets, third-party exchanges, etc.</div>

<div class="ace-line ace-line old-record-id-JCMkdQkieogUAIxYBBhcOOTBnZc">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-G8e0dioKioA28oxKOPacHXI0nBc">&nbsp;&nbsp;III. Services</div>

<div class="ace-line ace-line old-record-id-UAkEd8WqgoeSMOxyGcTc0XySnZc">&nbsp;&nbsp;3.1 Create or import wallet. You may use IDChats labs to create a new wallet or import wallets generated by other wallet application. You may only import wallets with Tokens which are supported by IDChats labs.</div>

<div class="ace-line ace-line old-record-id-PwSYdEgGioa6ekxQmJncxWnTndb">&nbsp;&nbsp;3.2 Transfer and receive Tokens. You may manage your digital Tokens by using the transfer and reception functions of IDChats labs, i.e., you may revise the blockchain ledger by signing with your Private Key. Tokens Transfer means the payer transfer the Token to the blockchain address of the payee. The actual transfer of Tokens happens on the blockchain system (instead of on IDChats labs).</div>

<div class="ace-line ace-line old-record-id-QgESdAaYmo4siExw7uYcdL1WnMg">&nbsp;&nbsp;3.3 Observe the market. You may use IDChats labs to observe the market of the Tokens supported by IDChats labs. The quotation of each Token is captured by IDChats labs from corresponding exchange and is displayed in the &ldquo;Markets&rdquo; column on IDChats labs.</div>

<div class="ace-line ace-line old-record-id-JYCSdaYqCowWwUxI9o1cwxw8nCc">&nbsp;&nbsp;3.4 Manage Tokens. You may use IDChats labs to add, manage or delete the Tokens supported by IDChats labs.</div>

<div class="ace-line ace-line old-record-id-RQy8dauwWookoexWRE0cXaHKnLC">&nbsp;&nbsp;Browse DApps. Users may use IDChats labs to visit and use the services provided by DApps (including DApps developed by TPF and DApps developed by third parties).</div>

<div class="ace-line ace-line old-record-id-VIsydyCieoEwyOx89TKcGcYsn3e">&nbsp;&nbsp;3.5 Browse the DApp. Users can link to the DApp and use the services provided by the DApp (including TPF own DApps and third-party DApps) through the link on IDChats labs.</div>

<div class="ace-line ace-line old-record-id-Awoqdaoiiommeexm8RUchMd4nLh">&nbsp;&nbsp;3.6 Transaction records. We will copy all or part of your transaction records from the blockchain system. However, Users shall refer to the blockchain system for the latest transaction records.</div>

<div class="ace-line ace-line old-record-id-KKSodoWSQo04A6xgzZoczKl7nld">&nbsp;&nbsp;3.7 Suspension of service. You understand that we are not able to reverse or cancel the transaction because transactions based on blockchain technologies are irrevocable. However, under certain circumstances, we may suspend or limit the function of IDChats labs used by a particular User.</div>

<div class="ace-line ace-line old-record-id-BmYcd4oMQokgEixSu76cQwixnPg">&nbsp;&nbsp;3.8 The mobile phone number, email address, and the added Owner&rsquo;s authority required in the registration of IDChats labs (the effective decentralized solution under the EOS system) belong to TPF. We will issue you a special note when the registration begins. If you choose to use the function, you are treated as having agreed to and recognized all terms.</div>

<div class="ace-line ace-line old-record-id-TYYidWOKComc4UxIXMtcxqYsnjh">&nbsp;&nbsp;During the registration using the IDChats labs mobile phone number and email address (the effective decentralized solution under the EOS system), your mobile phone or email address will be collected as a voucher. The multiple-signature authority of Owner will be added by default to facilitate the retrieval of the private key.</div>

<div class="ace-line ace-line old-record-id-PoQ8dkuiiosQcwxikT6cFTl8ngf">&nbsp;&nbsp;In the registration method using the mobile phone and email address (the effective decentralized solution under the EOS system), we will impose the multiple-signature setting to TPF&rsquo;s Owner authority to safeguard users&rsquo; authority security to the greatest extent. Additionally, the block information is traceable, which enables the largest openness and transparency. The initiator of every operation on the account can be checked.</div>

<div class="ace-line ace-line old-record-id-HWW0d0Ao6oyiUwxfBBgca5Rnnth">&nbsp;&nbsp;3.9 Token exchange. Users can exchange tokens with third-party smart contracts or third-party DEXs. As an interface tool, IDChats labs is used to help users interact with third parties and display the corresponding results of the token exchange.</div>

<div class="ace-line ace-line old-record-id-AsEQdyS2uogkWUxEN8ucNFQOnMg">&nbsp;&nbsp;3.10 Other services that TPF would like to provide.</div>

<div class="ace-line ace-line old-record-id-OCWMdmGQMocGGmxkzILc5SXKn5c">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-Bs8qdMW4ioMWKoxOeOecY3eWn6f">&nbsp;&nbsp;IV. Users who use IDChats labs must understand that:</div>

<div class="ace-line ace-line old-record-id-AMqCd4uCkowMsSxwJUacVRiynDe">&nbsp;&nbsp;4.1 In order to keep the decentralization feature of blockchain and to protect the security of your digital Tokens, TPF offers decentralized service which is largely different from the banking and financial institutions. Users shall understand that TPF (the decentralized solution) DOES NOT provide the following services:</div>

<div class="ace-line ace-line old-record-id-VAQWdSgk8ok20ExmQsQc4yB9nuf">&nbsp;&nbsp;a) store Users&rsquo; Wallet Password (the password Users set when creating or importing wallets), Private Key, Mnemonic Words or Keystore;</div>

<div class="ace-line ace-line old-record-id-DWEKdc8E0oUAqYx6kmhcy5IKnXf">&nbsp;&nbsp;b) restore Users&rsquo; Wallet Password, Private Key, Mnemonic Words or Keystore;</div>

<div class="ace-line ace-line old-record-id-MOSqd24ykoomokxIRXqcDQnMn8g">&nbsp;&nbsp;c) freeze the wallet;</div>

<div class="ace-line ace-line old-record-id-FmS6dIM8eoMmOcx50YncVoIInGV">&nbsp;&nbsp;d) report the loss of wallet;</div>

<div class="ace-line ace-line old-record-id-AwuidqsQaoIwuGxIZPic3yU7nRa">&nbsp;&nbsp;e) restore the wallet;</div>

<div class="ace-line ace-line old-record-id-SiiKd2samoE2UMxuQe4cMgVJnvd">&nbsp;&nbsp;f) rollback transactions.</div>

<div class="ace-line ace-line old-record-id-DAYKdgaOooiI2ExumpPcus0Gnme">&nbsp;&nbsp;4.2 Users shall take care of their mobile devices, back up the IDChats labs App, and back up the Wallet Password, Mnemonic Words, Private Key and Keystore by themselves. If your mobile device is lost, your IDChats labs App or your wallet is deleted and not backed up, your wallet is stolen or you forget your Wallet Password, Private Key, Mnemonic Words or Keystore, TPF is not able to recover the wallet or restore Wallet Password, Private Key, Mnemonic Words or Keystore. Nor can TPF cancel transactions for the mishandling of Users (such as typing in wrong addresses for transactions).</div>

<div class="ace-line ace-line old-record-id-XkAmdycw6oYMOOxc9TZcrFHInbb">&nbsp;&nbsp;4.3 IDChats labs does not support all existing Tokens. Do not use IDChats labs to handle any non-supported Tokens.</div>

<div class="ace-line ace-line old-record-id-L04idCGAcoM6o8xoBMec50ZYnMh">&nbsp;&nbsp;4.4 IDChats labs is only a tool for Users to manage their Tokens and is not an exchange or a trading platform. For the purpose of this Agreement, the word &ldquo;transactions&rdquo; only means transferring and receiving Tokens, which is substantially different from transactions on the exchanges and trading platforms.</div>

<div class="ace-line ace-line old-record-id-BsCudoqCgomYqOxgvxAcXtxxnrf">&nbsp;&nbsp;4.5 The DApps integrated into IDChats labs include those developed independently by TPF and those developed by third parties. IDChats labs only acts as a blockchain browser for those third-party-developed DApps. Users shall, at their sole discretion, decide whether there would be any risks to accept the services provided by or to conduct transactions on the third-party-developed DApps.</div>

<div class="ace-line ace-line old-record-id-ZCwYdcqCuooGeQxeGgFcdZeMnDc">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-GeWmdSkCuokQAMxo79ZceGgWnic">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-I26ed2OeWo8qyGxIBvwcIFKrnQh">&nbsp;&nbsp;V. Your Rights and Obligations</div>

<div class="ace-line ace-line old-record-id-RK8Qd2OqkowoaAxUP3RcdFHFnpd">&nbsp;&nbsp;5.1 Create or Import Wallet</div>

<div class="ace-line ace-line old-record-id-XuYodmMyuoIq2wxcLLOcmFyHnS8">&nbsp;&nbsp;a) Create or import wallet: you are entitled to use IDChats labs on your mobile device to create and/or import wallet, set Wallet Password and use your wallet on IDChats labs to transfer and receive Tokens on blockchain.</div>

<div class="ace-line ace-line old-record-id-IkGIdEa4woEGOWx2ThUc5UbonUS">&nbsp;&nbsp;b) Identification verification: Specific Users will be asked to complete identification verification before using IDChats labs to comply with related laws and regulations, according to the notification of IDChats labs. Specific Users may be asked to provide Personal Information including but not limited to name, identification card number, cell phone number, bank card information, etc., without which the Specific Users will not be able to use certain services and the Specific Users alone shall be responsible for the loss caused by their delay in completing the verification.</div>

<div class="ace-line ace-line old-record-id-Ja2mdG0kUoqeSExAL2TchAB5ngd">&nbsp;&nbsp;c) TPF may develop different versions of IDChats labs for different terminal devices. You shall download and install applicable version. If you download and install IDChats labs or other application with the same name as &ldquo;IDChats labs&rdquo; from any unauthorized third party, TPF cannot guarantee the normal operation or security of such application. Any loss caused by using such application shall be borne by you.</div>

<div class="ace-line ace-line old-record-id-RAEodg8KyowoiCx8FUrckcL5nUh">&nbsp;&nbsp;d) A previous version of IDChats labs may stop to operate after a new version is released. TPF cannot guarantee the security, continuous operation or customer services for the previous version. Users shall download and use the latest version.</div>

<div class="ace-line ace-line old-record-id-Pu4CdgmoUoWGAOxgdGMcGqYSnCg">&nbsp;&nbsp;5.2 Use of IDChats labs</div>

<div class="ace-line ace-line old-record-id-TgGEduOCEoe4KUxKAOBciU0ante">&nbsp;&nbsp;a) Users shall take care of their mobile devices, Wallet Password, Private Key, Mnemonic Words and Keystore by themselves. TPF does not store or hold the above information for Users. You shall be responsible for any risks, liabilities, losses and expenses which result from frauds, you losing your mobile device, disclosing (whether actively or passively) or forgetting Wallet Password, Private Key, Mnemonic Words or Keystore, or your wallet being attacked.</div>

<div class="ace-line ace-line old-record-id-NOOQdiY4oo4magx6k4bc4TB1nCg">&nbsp;&nbsp;b) Follow the Alert. You understand and agree to follow the Alert pushed by IDChats labs. You shall be responsible for any risks, liabilities, losses and expenses which result from your failure to comply with the Alert.</div>

<div class="ace-line ace-line old-record-id-CcuodYCSIogW4SxsJBVc9kxgnUg">&nbsp;&nbsp;c) You understand that IDChats labs undertakes no responsibility to conduct due diligence on the services or transactions provided by third-party-developed DApps. You shall make investment decisions rationally and assume the risks by yourself.</div>

<div class="ace-line ace-line old-record-id-DkGeda028oWcmYxw9hEcLnocnrd">&nbsp;&nbsp;d) Complete the identification verification. If IDChats labs reasonably deems your operation or transactions to be abnormal, or considers your identification to be doubtful, or IDChats labs considers it necessary to verify your identification documents or other necessary documents, you shall cooperate with IDChats labs and provide your valid identification documents or other necessary documents and complete the identification verification in time.</div>

<div class="ace-line ace-line old-record-id-TI2AdioiUoCWsIxii2icwqVFnWg">&nbsp;&nbsp;e) With the registration method using IDChats labs mobile phone number and email address (the effective decentralized solution under the EOS system), you can choose to export the private key functions to better manage your account. You are also informed that you can delete the multiple-signature Owner authority added by default and that TPF can no longer help you recover the private key if the authority aforementioned is deleted.</div>

<div class="ace-line ace-line old-record-id-FqGudyQKKoI8OOx25ZGcW4lgnGh">&nbsp;&nbsp;5.3 Transfer of Tokens</div>

<div class="ace-line ace-line old-record-id-XGm0dAaQ0o8gMwxioMfcthNdnFb">&nbsp;&nbsp;a) You understand that you may be subject to daily limits on the amount and times of transfers according to your location, regulatory requirements, transferring purposes, risk control by IDChats labs, or identification verification.</div>

<div class="ace-line ace-line old-record-id-TEG8dkgiUoWCocx02WlcJQ6ynug">&nbsp;&nbsp;b) You understand that blockchain operations are &ldquo;irrevocable&rdquo;. When you use IDChats labs to transfer Tokens, you shall be responsible for the consequences of your mishandling of the transfer (including but not limited to wrong address, problems of the node servers selected by you).</div>

<div class="ace-line ace-line old-record-id-RWWsdc8qWoA2aOxiWhecLhRxnbc">&nbsp;&nbsp;c) You understand that the following reasons may result in &ldquo;transfer failed&rdquo; or &ldquo;mining overtime&rdquo;</div>

<div class="ace-line ace-line old-record-id-KksQdm4MaoKMagxOCQ9cloznnhg">&nbsp;&nbsp;a. insufficient balance in wallet;</div>

<div class="ace-line ace-line old-record-id-Kw84duU2Woo6cqxo3Yecm8LVnee">&nbsp;&nbsp;b. insufficient gas for transaction;</div>

<div class="ace-line ace-line old-record-id-Jo0gdMe08osCiUx6Rj0cLSs9n2d">&nbsp;&nbsp;c. blockchain&rsquo;s failure to execute the code of smart contracts;</div>

<div class="ace-line ace-line old-record-id-NumqdwuqGoSGSExAFfkcvaDqnHf">&nbsp;&nbsp;d. the transfer amount exceeds the transfer limits imposed by authorities, IDChats labs or laws or regulations;</div>

<div class="ace-line ace-line old-record-id-DyqadE6UYoas4SxELhhcwIJ6n7b">&nbsp;&nbsp;e. technical failure of the network or equipment;</div>

<div class="ace-line ace-line old-record-id-C6WYd2ymyoia4IxO61XcLxtnn7g">&nbsp;&nbsp;f. abandoned transactions result from blockchain network congestion or failure;</div>

<div class="ace-line ace-line old-record-id-CgikdwYGcomaWSxADMGcKtbDnpc">&nbsp;&nbsp;g. the wallet address of yours or your counterparty&rsquo;s is identified as special addresses, such as high-risk address, exchange address, ICO address, Token address etc.</div>

<div class="ace-line ace-line old-record-id-TiGudsU8Goy2sWxm6clclnhxnQe">&nbsp;&nbsp;d) You understand that IDChats labs is only a tool for transfer of Tokens. TPF shall be deemed to have fulfilled its obligations once you have finished the transfer and shall not be held liable for any other disputes.</div>

<div class="ace-line ace-line old-record-id-PiqGd4UYSoUqKyxE36vcIa9Fnqe">&nbsp;&nbsp;e) Compliance. You understand that you shall abide by relevant laws, regulations and policies when you use IDChats labs or the DApps on IDChats labs.</div>

<div class="ace-line ace-line old-record-id-PiUIdo2SQoyYyMx2DddcstIenug">&nbsp;&nbsp;f) Notifications. IDChats labs may send notifications to you by web announcements, e-mails, text messages, phone calls, Notification Centre information, popup tips or client-end notices (e.g., information about your transfer or suggestions on certain operations) which you shall be aware of timely.</div>

<div class="ace-line ace-line old-record-id-WIGMdosGGog4qGxQfshca1rYnbg">&nbsp;&nbsp;5.4 Service fees and taxes.</div>

<div class="ace-line ace-line old-record-id-LkmGdMuaEoc28oxmIUCcm82UnFh">&nbsp;&nbsp;a) IDChats labs does not charge you any service fees or handling fees for the time being. IDChats labs may reach an agreement with you or announce rules regarding service fees in the future;</div>

<div class="ace-line ace-line old-record-id-KcKydG6KwoMg8MxGSIGcoAarnvf">&nbsp;&nbsp;b) You need to pay gas when you transfer Tokens, the amount of which would be on your sole discretion and would be collected by certain blockchain system;</div>

<div class="ace-line ace-line old-record-id-BmiuduooWosOacxY5yqckVAMnMb">&nbsp;&nbsp;c) You understand that under some specific circumstances, your transfer of Tokens may fail due to instable network, but you may still be charged gas by certain blockchain system;</div>

<div class="ace-line ace-line old-record-id-H0i0dwq6Soye0Exd26icuirSnky">&nbsp;&nbsp;d) You shall bear all the applicable taxes and other expenses occurred due to your transactions on IDChats labs.</div>

<div class="ace-line ace-line old-record-id-NsqcdCiocowwyCxQviMcA6TSnMf">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-HWKWdiAIio6oyYxgbxfcqe1Intf">&nbsp;&nbsp;VI. Risks</div>

<div class="ace-line ace-line old-record-id-UCw2dOcSQocsikxiaqncMZxunSf">&nbsp;&nbsp;6.1 You understand and acknowledge that the blockchain technology is a field of innovation where the laws and regulations are not fully established. You may be faced with material risks including instability of technology or failure of Tokens redemption. You also understand that Tokens have much higher volatility comparing to other financial assets. You shall make investment decisions and hold or dispose of the Tokens in a reasonable way and corresponding to your financial status and risk preferences. You also acknowledge that the market information is captured from exchanges by IDChats labs and may not represent the latest or the best quotation of each Token.</div>

<div class="ace-line ace-line old-record-id-OYkEdwsuqo4Swoxk1ETc5HWHnNg">&nbsp;&nbsp;6.2 If you or your counterparty fails to comply with this Agreement or fails to follow the instructions, tips or rules on the website or on the page of the transaction or payment, IDChats labs does not guarantee successful transfer of the Tokens and IDChats labs shall not be held liable for any of the consequences of such failure. If you or your counterparty has already received the payment in IDChats labs wallet or third-party wallet, you understand that transactions on blockchain are irreversible and irrevocable. You and your counterparty shall assume the liabilities and consequences of your transactions.</div>

<div class="ace-line ace-line old-record-id-FqSmdgOIKoKwGWxVtwTcdFcTnnt">&nbsp;&nbsp;6.3 You understand that blockchain operations and related transactions are irreversible. IDChats labs shall not be held liable for the corresponding risks and consequences.</div>

<div class="ace-line ace-line old-record-id-Wee8d0uyuoiusExOkvDcDPxHnOh">&nbsp;&nbsp;6.4 When you use third-party-developed DApps integrated in IDChats labs, TPF strongly suggest you read this Agreement and IDChats labs&rsquo;s Alert carefully, get familiar with the counterparty and the product information and evaluate the risks before you make transactions on such DApps.</div>

<div class="ace-line ace-line old-record-id-LKiMdm8iMok2S8xTX8lcd5Hsn4q">&nbsp;&nbsp;6.5 You understand that such transactions and corresponding contractual relationship are between you and your counterparty. IDChats labs shall not be held liable for any risks, responsibilities, losses or expenses occurred due to such transactions.</div>

<div class="ace-line ace-line old-record-id-Cg6GdmwGao0wMaxuy34cUJqLnrf">&nbsp;&nbsp;6.6 It is your sole responsibility to make sure that your counterparty is a person with full capacity for civil acts and decide whether you shall transact with him/her.</div>

<div class="ace-line ace-line old-record-id-S6AidIsgEoKoUwxeCxOccdRsnWd">&nbsp;&nbsp;6.7 You shall check the official blockchain system or other blockchain tools when you receive Alert such as &ldquo;transaction failed&rdquo; or &ldquo;mining overtime&rdquo; in order to avoid repetitive transfer. If you fail to follow this instruction, you shall bear the losses and expenses occurred due to such repetitive transfer.</div>

<div class="ace-line ace-line old-record-id-KeIUdeuaMoyM0kxiLelcjLhJnlb">&nbsp;&nbsp;6.8 You understand that after you create or import wallet on IDChats labs, your Keystore, Private Key and Mnemonic Words are only stored on your mobile device and will not be stored in IDChats labs or on the servers of TPF. You may change another mobile device to use IDChats labs after you follow the instructions on IDChats labs to backup your wallet. If you lose your mobile device before you could write down or backup your Wallet Password, Private Key, Mnemonic Words or Keystore, you may lose your Tokens and TPF is unable to restore them. If your Wallet Password, Private Key, Mnemonic Words or Keystore is disclosed or the device which stores or holds your Wallet Password, Private Key, Mnemonic Words or Keystore is hacked or attacked, you may lose your Tokens and TPF is unable to restore them. You shall bear the foregoing losses on your own.</div>

<div class="ace-line ace-line old-record-id-SiwUdIAYmoeO4ExMjf9cZqLsnug">&nbsp;&nbsp;6.9 We suggest you backup your Wallet Password, Private Key, Mnemonic Words and Keystore when you create or import wallet by writing them down on papers or backup them in password management apps. Please do not use electronic methods such as screenshots, e-mails, note-taking apps in cell phones, text messages, WeChat or QQ to backup any of the above information.</div>

<div class="ace-line ace-line old-record-id-EsMedqQWUoWIiaxKIIdcdG8PnDc">&nbsp;&nbsp;6.10 In order to avoid potential security risks, we suggest you use IDChats labs in a secured network environment. Please do not use a jailbreak or Rooted mobile device.</div>

<div class="ace-line ace-line old-record-id-XwG4dIaegowCgoxeadTcAZyinHd">&nbsp;&nbsp;6.11 Please be alert to frauds when you use IDChats labs. If you find any suspicious conducts, we encourage you to inform us immediately.</div>

<div class="ace-line ace-line old-record-id-SkUyds8iOoaa8Mxcz1kceB2Hnpc">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-VMmSdW2eOo2EY8xYh9Tc5fWNnne">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-P0S6dyeKWoOkSaxQjoecNTvpnxg">&nbsp;&nbsp;VIl. Change, Suspension, Termination of TPF Service</div>

<div class="ace-line ace-line old-record-id-Iqg0diWwiooisWx8xcucOvj0n7d">&nbsp;&nbsp;7.1 You acknowledge and accept that TPF may, at its sole discretion, provide only a part of services for the time being, suspend certain services or provide new services in the future. When we change our services, your continuous use of IDChats labs is deemed as your acceptance of this Agreement and revisions of this Agreement.</div>

<div class="ace-line ace-line old-record-id-JQCAd2YQIoKKckxyU6ScAkg0nWb">&nbsp;&nbsp;7.2 You understand that TPF may suspend services under the following circumstances:</div>

<div class="ace-line ace-line old-record-id-YKomdiCsooAaeOx82d9cwiK7nnb">&nbsp;&nbsp;a) due to the maintenance, upgrading, failure of equipment and blockchain system and the interruption of communications etc., which lead to the suspension of the operation of IDChats labs;</div>

<div class="ace-line ace-line old-record-id-RSiudAaEEo4ge0xsLllcgHFvnDb">&nbsp;&nbsp;b) due to force majeure events including but not limited to typhoon, earthquake, tsunami, flood, power outage, war, or terrorist attacks, or computer viruses, Trojan Horse, hacker attacks, system instability or government behaviors and other reasons, TPF is unable to provide services or in TPF&rsquo; reasonable opinion, continuous provision of services would result in significant risks;</div>

<div class="ace-line ace-line old-record-id-VYuSdeWIAocEiMxqieQcNqLunag">&nbsp;&nbsp;c) due to other events which TPF cannot control or reasonably predicate.</div>

<div class="ace-line ace-line old-record-id-GWk0dkCk2oKOWcxiScPcROmznic">&nbsp;&nbsp;d) TPF reserves the right to unilaterally suspend or terminate all or part of the function of IDChats labs under the following circumstances:</div>

<div class="ace-line ace-line old-record-id-JKoadWwcioeUaExuS5YcceJvn1g">&nbsp;&nbsp;a. death of Users;</div>

<div class="ace-line ace-line old-record-id-ZOaadGuMIo0mqGxGa23cVrAjn8e">&nbsp;&nbsp;b. if you steal others&rsquo; wallets information or mobile devices;</div>

<div class="ace-line ace-line old-record-id-L4eedowQOoiei6xqKC7c6sqanGf">&nbsp;&nbsp;c. if you provide false Personal Information on IDChats labs or cheat on Questionnaire;</div>

<div class="ace-line ace-line old-record-id-McO0da4kWoacQGxyCcnc1cWZnSd">&nbsp;&nbsp;d. if you refuse to allow mandatory update of IDChats labs;</div>

<div class="ace-line ace-line old-record-id-VQumdko08oW2sCxIZ12cJiEXn6c">&nbsp;&nbsp;e. if you use IDChats labs to commit illegal or criminal activities;</div>

<div class="ace-line ace-line old-record-id-JAaidcukIo8So4xacWOckCyynkc">&nbsp;&nbsp;f. if you hinder the normal use of IDChats labs by other Users;</div>

<div class="ace-line ace-line old-record-id-EyEcdiwsUosCcexKEY2c6daJnmf">&nbsp;&nbsp;g. if you pretend to be staff or management personnel of TPF;</div>

<div class="ace-line ace-line old-record-id-VYsqdeASYowUaSx4kHacFUcwnFe">&nbsp;&nbsp;h. if you threaten the normal operation of TPF computer system by attack, invasion, alternation or any other means;</div>

<div class="ace-line ace-line old-record-id-OOogdyKKooKCKWxuUWrcRsJXn6g">&nbsp;&nbsp;i. if you use IDChats labs to send spams;</div>

<div class="ace-line ace-line old-record-id-BsIudaegEoMWW2xyIfacri04nje">&nbsp;&nbsp;j. if you spread rumors which endanger the goodwill of TPF and IDChats labs;</div>

<div class="ace-line ace-line old-record-id-Fue4daYIWoiGeqxYXS2cIBjUneh">&nbsp;&nbsp;k. if you conduct any illegal activities, breach this Agreement etc. or other circumstances under which TPF reasonably considers necessary to suspend services.</div>

<div class="ace-line ace-line old-record-id-O0IAdUCkco6a6KxeY0kcrDfEnig">&nbsp;&nbsp;7.3 You are entitled to export your wallets within a reasonable amount of time if TPF changes, suspends or terminates its services.</div>

<div class="ace-line ace-line old-record-id-ZgyUds0UsoiuC0x8bxkcNlAHnue">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-GOoKduQqSoAOiqxsXU6cVqhJnBd">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-PMiyd8AegoK4MOxZ1JMcnViOnND">&nbsp;&nbsp;VIIl. Your Representations and Warranties</div>

<div class="ace-line ace-line old-record-id-Zuk0dsaeIogqQYxe6sOcA8cMnfc">&nbsp;&nbsp;8.1 You shall comply with all applicable laws and regulations of the country or area you reside in. You shall not use IDChats labs for any unlawful purposes or by any unlawful means.</div>

<div class="ace-line ace-line old-record-id-YeYydioeuoeAY0xkhukc0r82nNc">&nbsp;&nbsp;8.2 You shall not use IDChats labs to commit any illegal or unlawful activities, including but not limited to:</div>

<div class="ace-line ace-line old-record-id-XGogd68qkoSAuix2lo0cxvV7n7e">&nbsp;&nbsp;a) activities opposing the basic principles set forth in the constitution, endangering national security, disclosing state secrets, overturning the government or undermining national unity;</div>

<div class="ace-line ace-line old-record-id-YAG2dwEeYo2u6UxO4oAcFLGBnog">&nbsp;&nbsp;b) any illegal conducts, such as money laundering, illegal fund raising etc.;</div>

<div class="ace-line ace-line old-record-id-QOymd4WgKowSicxCWTEcSzC0n9f">&nbsp;&nbsp;c) accessing TPF services, collecting or processing the content provided by TPF, intervening or attempting to intervene any Users, by the employment of any automated programs, software, network engines, web crawlers, web analytics tools, data mining tools or similar tools etc.;</div>

<div class="ace-line ace-line old-record-id-P2iEdGEMWoK8ugxwjb7cHrYbn8g">&nbsp;&nbsp;d) providing gambling information or inducing others to engage in gambling;</div>

<div class="ace-line ace-line old-record-id-VEw2dEGoGoasi4xdFsec1Vp1nFZ">&nbsp;&nbsp;e) invading into others&rsquo; IDChats labs wallets to steal Tokens;</div>

<div class="ace-line ace-line old-record-id-CCagd0qcSo0AqWxi0WjcuYQBnse">&nbsp;&nbsp;f) engaging in any inaccurate or false transactions with the counterparty;</div>

<div class="ace-line ace-line old-record-id-JCUidS0kcomo4qxgXRFcXbUSnzc">&nbsp;&nbsp;g) committing any activities which harms or attempts to harm IDChats labs service system and data;</div>

<div class="ace-line ace-line old-record-id-I2sKdYyUgo2AscxEKBcchITsnrb">&nbsp;&nbsp;h) other activities which TPF has reason to believe are inappropriate.</div>

<div class="ace-line ace-line old-record-id-XSqOdccUsoiUmoxAnKjcw4Q1nsd">&nbsp;&nbsp;8.3 You understand and accept that you shall be responsible for any violation of law (including but not limited to the regulations of the Customs and Tax) or for breach of this Agreement by you and shall indemnify TPF against the losses, the third-party claims or administrative penalties against TPF incurred by such violation or breach, including reasonable attorney&rsquo;s fees.</div>

<div class="ace-line ace-line old-record-id-OgUcduUqkoO2E4xaKAec8xPdnXg">&nbsp;&nbsp;8.4 You are not an Excluded Person who is eligible to use the IDChats labs service.</div>

<div class="ace-line ace-line old-record-id-XCE8dEAsCoQisKxkjjJcVv16nub">&nbsp;&nbsp;8.5 You confirm that you will pay the service fees charged by TPF in time (if applicable). TPF reserves the right to suspend the services when the User fails to pay service fees (if applicable).</div>

<div class="ace-line ace-line old-record-id-DImyd28caouK2qxCGBkc5GKynEc">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-KWGCdSuMqoMWAQxGmgjccaFmnid">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-QeAWdQSEooE48uxiK4bcrhirnVd">&nbsp;&nbsp;IX. Privacy Policy</div>

<div class="ace-line ace-line old-record-id-SCWydO6EKokWaOxum9TcfWVKnef">&nbsp;&nbsp;Your privacy is of utmost importance for TPF. Please refer to IDChats labs Privacy Policy as updated by us from time to time for relevant privacy protection policies.</div>

<div class="ace-line ace-line old-record-id-De0mdo68moM2eUxIpJtcglMJnqb">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-VWqgdUAs0ouqUux4jVpcabjAnkb">&nbsp;&nbsp;X. Disclaimer and Limitation of Liability</div>

<div class="ace-line ace-line old-record-id-VeK0dys2YoGog4xwPREcKnDmnBg">&nbsp;&nbsp;10.1 TPF only undertakes obligations expressly set forth in this Agreement.</div>

<div class="ace-line ace-line old-record-id-U2I8dYqQooYwuuxwmhsc6PUyndb">&nbsp;&nbsp;10.2 YOU ACKNOWLEDGE AND ACCEPT THAT, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IDChats labs IS PROVIDED ON AN &ldquo;AS IS&rdquo;, &ldquo;AS AVAILABLE&rdquo; AND &ldquo;WITH ALL FAULTS&rdquo; BASIS. TPF shall not be held liable for malfunction of IDChats labs which results from the following reasons:</div>

<div class="ace-line ace-line old-record-id-PWMAdkKi4oa0yYxOohCclcYjnSd">&nbsp;&nbsp;a) system maintenance or upgrading of IDChats labs;</div>

<div class="ace-line ace-line old-record-id-NkwEdmmUIo0qOIxye0ocWW3wn8d">&nbsp;&nbsp;b) force majeure, such as typhoon, earthquake, flood, lightning or terrorist attack etc.;</div>

<div class="ace-line ace-line old-record-id-LCYCdQ08ooGUMWxuckscLRkFngf">&nbsp;&nbsp;c) malfunction of your mobile device hardware and software, and failure of telecommunication lines and power supply lines;</div>

<div class="ace-line ace-line old-record-id-QeO8dMW0eo8YmuxUQIbcFNwJnku">&nbsp;&nbsp;d) your improper, unauthorized or unrecognized use of TPF services;</div>

<div class="ace-line ace-line old-record-id-SmeUdYgyQommcAxaAjUc5R2knrh">&nbsp;&nbsp;e) computer viruses, Trojan Horse, malicious program attacks, network congestion, system instability, system or equipment failure, telecommunication failure, power failure, banking issues, government acts etc.;</div>

<div class="ace-line ace-line old-record-id-RmkMds6SsoW88OxN7VFcioTTnHD">&nbsp;&nbsp;f) any other reasons not imputed to TPF.</div>

<div class="ace-line ace-line old-record-id-FmQyduq2eoMYwAx0gKRcfUpxnnh">&nbsp;&nbsp;10.3 TPF shall not be held liable under the following circumstances:</div>

<div class="ace-line ace-line old-record-id-BOAgdMuMSouAICxUf3icPutynBe">&nbsp;&nbsp;a) Users lose their mobile devices, delete IDChats labs applications and wallets without back-up, forget Wallet Passwords, Private Keys, Mnemonic Words, Keystores without back-up, which result in the loss of their Tokens;</div>

<div class="ace-line ace-line old-record-id-BsCudAmI4okKU4xUfxKcABfJnTe">&nbsp;&nbsp;b) Users disclose their Wallet Passwords, Private Keys, Mnemonic Words, Keystores, or lend or transfer their IDChats labs wallets to others, or authorize others to use their mobile devices or IDChats labs wallets, or download IDChats labs applications through unofficial channels, or use IDChats labs applications by other insecure means, which result in the loss of their Tokens;</div>

<div class="ace-line ace-line old-record-id-H6C2dom0goqO6Kx4wJ7cR9y8ndd">&nbsp;&nbsp;c) Users mishandle IDChats labs (including but not limited to wrong address, failure of the node servers selected by you), which result in the loss of Tokens;</div>

<div class="ace-line ace-line old-record-id-XUcIdAkYeoceEyxqSllcuSTkncb">&nbsp;&nbsp;d) Users are unfamiliar with the knowledge of blockchain and their mishandling of IDChats labs results in loss of their Tokens;</div>

<div class="ace-line ace-line old-record-id-UgEQdI8wgoqc0oxG6bZcNDmFnQd">&nbsp;&nbsp;e) IDChats labs is unable to copy accurate transaction records due to system delay or blockchain instability etc.;</div>

<div class="ace-line ace-line old-record-id-GUKYdC2S4oQ66Sx0EiocbLnwnaf">&nbsp;&nbsp;10.4 Under the registration method using IDChats labs mobile phone number and email address (the effective decentralized solution under the EOS system), users can choose to export the private key. The property damage arising from loss or stolen private key after the user changes the authority of Owner and Active shall not be borne by TPF in any way.</div>

<div class="ace-line ace-line old-record-id-BOC2dKUE4ooQSUxMLP9c6DrpnJD">&nbsp;&nbsp;10.5 Under the default mode of the registration method using IDChats labs mobile phone number and email address (the effective decentralized solution under the EOS system), if the private key cannot be retrieved through mobile phone number due to the user&rsquo;s causes (such as the user cannot gain a new SIM card), TPF will not provide the service to retrieve the private key.</div>

<div class="ace-line ace-line old-record-id-C0CEdieoqoWgG4xYh9JcyvWKnGe">&nbsp;&nbsp;10.6 Property loss caused by users themselves (including but not limited to loss of mobile phone number, email address, the disclosure of the verification code, publication of the private key by the user, and the user&rsquo;s personal information being hacked) shall not be borne by TPF in any way.</div>

<div class="ace-line ace-line old-record-id-D6SedAAwqoAqqOxioRhcjZKNnFh">&nbsp;&nbsp;10.7 Users shall undertake the risks and consequences of their transactions on the third-party-developed DApps.You understand that IDChats labs is only an management tool for Tokens which is incapable to control the quality, security and legitimacy of products and services provided by the third-party-developed DApps, or the authenticity and accuracy of their information and their capabilities to fulfill the obligations under the agreements with you. You, at your sole discretion, decide whether to transact on the third-party-developed DApps. It is the third-party-developed DApps, instead of IDChats labs, that transact with you. We kindly remind you to carefully review the authenticity, legitimacy, and effectiveness of related information provided by the third-party-developed DApps before you decide to use the DApps. In addition, you shall also assume all the risks arising from the transactions between you and any third party exchanges.</div>

<div class="ace-line ace-line old-record-id-IEI2doMUkomKCEx4OORcYnlnnve">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-JqUAd2qIEoAuM8xuytCc3hWKn0d">&nbsp;&nbsp;You acknowledge that IDChats labs may provide services to you and your counterparties simultaneously and you agree to waive any actual or potential conflicts of interests and will not claim against TPF on such base or burden TPF with more responsibilities or duty of care.</div>

<div class="ace-line ace-line old-record-id-SGuUd2CqyomwMKx4egjchR18n1d">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-CUG0dmM2mooMyUxeoegcNGFxnAe">&nbsp;&nbsp;XI. TPF does not warrant that:</div>

<div class="ace-line ace-line old-record-id-GKeEdcE2moOU0Kx6SXtcK4FPnpg">&nbsp;&nbsp;a) services provided by TPF would satisfy all your needs;</div>

<div class="ace-line ace-line old-record-id-IcyWdsI8EoaUQqxMFoncDw0Hnef">&nbsp;&nbsp;b) all techniques, products, services, information or other materials from TPF would meet your expectations;</div>

<div class="ace-line ace-line old-record-id-LmKGd828mo4eOyxOoSEcKmlpnNZ">&nbsp;&nbsp;c) all the transaction information in digital tokens markets captured from the third party exchanges are prompt, accurate, complete, and reliable;</div>

<div class="ace-line ace-line old-record-id-Xak4dYYAsoCMoGxeMg2clgo8nvf">&nbsp;&nbsp;d) your counterparties on IDChats labs will perform their obligations in the transaction agreements with you timely.</div>

<div class="ace-line ace-line old-record-id-CMmUdOkSGoWkwGxSmvtccjXjn8b">&nbsp;&nbsp;e) in any case, the total liability for TPF under this Agreement shall not exceed the greater of:</div>

<div class="ace-line ace-line old-record-id-DaOgd0sWcoYsuSxGMZac7WE5nTh">&nbsp;&nbsp;a. 0.1 Ether; or</div>

<div class="ace-line ace-line old-record-id-YQOCdkYioo0aMqxSCB4cxYikniN">&nbsp;&nbsp;b. 500 SGD, higher value shall prevail.</div>

<div class="ace-line ace-line old-record-id-Cm68duceCoW0mSxIhfBc6rdjnAf">&nbsp;&nbsp;11.1 You are aware that IDChats labs is only a tool for Users to manage their Tokens and to display transaction information. TPF does not provide legal, tax or investment advice. You shall seek advice from professional legal, tax, and investment advisors. In addition, TPF shall not be liable for any investment loss, data loss etc. during your use of our service.</div>

<div class="ace-line ace-line old-record-id-B4WYdqIEooeqSYx07l8cdehhn23">&nbsp;&nbsp;11.2 You understand that we may change our entry standards, limit the range and ways to provide services for specific Users etc. at any time in accordance with relevant laws and regulations.</div>

<div class="ace-line ace-line old-record-id-MIiWdc8wkoSOIQxIivWc9Afcnrb">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-NC0ed2Skso8scgxMz3McQjqOnQd">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-WcmIdAWMEoCa2WxOuUPcHjZOnqg">&nbsp;&nbsp;XII. Entire Agreement</div>

<div class="ace-line ace-line old-record-id-R8AGd4eimoaK8wx1dH5cXqxUnsp">&nbsp;&nbsp;12.1 This Agreement incorporates IDChats labs Terms of Service, IDChats labs Privacy Policy, and other rules (including contents in the &ldquo;Support&rdquo; column) posted by TPF from time to time.</div>

<div class="ace-line ace-line old-record-id-XC4odKumwosayMxKidycrm6on2d">&nbsp;&nbsp;12.2 If any provision of this Agreement is found by a court with competent jurisdiction to be invalid, the other provisions of this Agreement remain in full force and effect.</div>

<div class="ace-line ace-line old-record-id-NoAidOWsEooOUSxCIuEckWYqnvd">&nbsp;&nbsp;12.3 This English version and other translated version of this Agreement (if any) are provided for the convenience of Users, and are not intended to revise the Chinese version of this Agreement. If there is any discrepancy between the Chinese version and non-Chinese version of this Agreement, the Chinese version shall prevail.</div>

<div class="ace-line ace-line old-record-id-EAEidEekoo04Wox4qGIcS5l4nHd">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-LewUd8gIwouI4uxYFLFc82Mxnlh">&nbsp;&nbsp;XIll. Intellectual Property Rights Protection</div>

<div class="ace-line ace-line old-record-id-OskKdeka6oEeO4x45QkcYBbHn4g">&nbsp;&nbsp;IDChats labs is an application developed and owned by TPF. The intellectual property rights of any contents displayed in IDChats labs (including this Agreement, announcements, articles, videos, audios, images, archives, information, materials, trademarks or logos) are owned by TPF or the third party licensors. Users can only use the IDChats labs applications and its contents for the purpose of holding and managing their Tokens. In particular, without prior written consent from IDChats labs or the third party licensors, no one shall use, modify, decompile, reproduce, publicly disseminate, alter, distribute, issue or publicly publish the abovementioned applications and contents.</div>

<div class="ace-line ace-line old-record-id-JScedeKqkoOma4xVtPmcjAVznno">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-BuKCdsiqEooMywxGSLccY06Cnpc">&nbsp;&nbsp;XIV. Governing Law and Dispute Resolution</div>

<div class="ace-line ace-line old-record-id-I0cidSCEKoOIWqxc7tIcmoCrndf">&nbsp;&nbsp;14.1 The validity, interpretation, alternation, enforcement, dispute resolution of this Agreement and its revised versions shall be governed and construed in accordance with the TPF&#39;s national laws. Where there is no applicable law, this Agreement shall be interpreted by applicable commercial and/or industrial practices.</div>

<div class="ace-line ace-line old-record-id-A4qId2SQ0o6IAyx06EpcbGbknLf">&nbsp;&nbsp;14.2 If any dispute or claim in connection with this Agreement arises between you and TPF, the parties shall first attempt to resolve the dispute or claim through amicable negotiations in good faith. If the parties cannot reach an agreement, either party may sue the other party at the competent court where TPF is located.</div>

<div class="ace-line ace-line old-record-id-KaG2d2k4ooCIEixwJEmcCPTmnfe">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-ImOod20SKo6QQExENuYc43ssnic">&nbsp;&nbsp;XV. Miscellaneous</div>

<div class="ace-line ace-line old-record-id-IK6Ed2sMqooEasximK1c5cSsnRe">&nbsp;&nbsp;15.1 If you live outside of Singapore, you shall fully understand and conform to the laws, regulations and rules in your jurisdictions which are relevant to use of TPF services.</div>

<div class="ace-line ace-line old-record-id-B8CKdOcAuoy2qSxM9DicrlYNnag">&nbsp;&nbsp;15.2 During your use of TPF services, if you come across any problems, you can contact us through the submission of your feedbacks on IDChats labs.</div>

<div class="ace-line ace-line old-record-id-SYSedKMoookQOuxOgPNcy4XNn2d">&nbsp;&nbsp;15.3 This Agreement is accessible for all Users on IDChats labs. We encourage you to read this Agreement each time you log onto IDChats labs.</div>

<div class="ace-line ace-line old-record-id-YOGIdUCeMo0OeAxLU71cWUJSnlT">&nbsp;&nbsp;This Agreement shall become effective on January 10th, 2018.</div>

<div class="ace-line ace-line old-record-id-NmwwdK4IWoSuoqxI10xceA8cnog">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-JOgmd0s2Iog2a2xCIXMc7Pm8nBc">&nbsp;&nbsp;As for any issues not covered in this Agreement, you shall comply with the announcements and relevant rules as updated by TPF from time to time.</div>

<div class="ace-line ace-line old-record-id-O4A8diMKSowmuixERFCcI8Tmnrc">&nbsp;&nbsp;&nbsp;</div>

<div class="ace-line ace-line old-record-id-PEkwdI20womCE2xCuKHcUpCEnkb">&nbsp;&nbsp;IDChats labs Foundation Ltd.</div>
</div>
</body>
</html>

`;

const HTML = `
<meta name="viewport" content="initial-scale=1.0" />
<html>
  <head>
    <title></title>
  </head>
  <body text="#fff">
  <div data-docx-has-block-data="false" data-page-id="NoTndGe2Joh8v1xWOabceBKKnHI">
  <div class="ace-line ace-line old-record-id-NoTndGe2Joh8v1xWOabceBKKnHI" style="white-space:pre;"><strong>服務協議</strong></div>
  
  <div>《IDChats labs服務協議》</div>
  
  <div>
  <div class="ace-line ace-line old-record-id-LOUUdgsUQoqGYexgVeBc64a2nxg">&nbsp;&nbsp;最近更新於：2022年12月29日</div>
  
  <div class="ace-line ace-line old-record-id-TM8oduIYcoWGSGxUH1EcNLR6ns7">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-Ham2dyaUUowmOgxeEBKc10cQnFc">&nbsp;&nbsp;尊敬的用戶：</div>
  
  <div class="ace-line ace-line old-record-id-OACCdSwAEo8wYaxCw0ec6CpRnKc">&nbsp;&nbsp;感謝您選擇IDChats labs服務。《IDChats labs服務協議》（以下簡稱&ldquo;本協議&rdquo;）由IDChats labs Foundation Ltd（以下簡稱&ldquo;本公司&rdquo;或&ldquo;我們&rdquo;）和用戶（以下簡稱&ldquo;您&rdquo;或&ldquo;用戶&rdquo;）簽訂，本協議在您與本公司之間具有合同上的法律效力。</div>
  
  <div class="ace-line ace-line old-record-id-CyQKdGuoYogA0qxAVFSclCB1nse">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-SyIAdyeSmoomaYxo9hic7n8lnEh">&nbsp;&nbsp;本公司在此特別提醒您在使用IDChats labs（以下簡稱&ldquo;IDChats labs&rdquo;或本軟件，IDChats labs可在各移動應用平臺上下載，包括但不僅限於Google Play和App Store）之前，請認真閱讀《IDChats labs服務協議》及後文提到的相關協議，尤其是本協議規定的&ldquo;免責及責任限制&rdquo;等條款將以加粗的形式體現，確保您充分理解本協議中各條款，並自主考慮風險。</div>
  
  <div class="ace-line ace-line old-record-id-FGo2dwmWsomogWxkDqUcY5DOnih">&nbsp;&nbsp;一、 關於本協議的確認與接納</div>
  
  <div class="ace-line ace-line old-record-id-TaGMdQc6IoA6isxsru3cuzdcn5b">&nbsp;&nbsp;1) 您理解本協議及有關協議適用於IDChats labs及IDChats labs上本公司所自主開發和擁有的去中心化應用（簡稱&ldquo;DApp&rdquo;）（排除第三方開發的DApp）。</div>
  
  <div class="ace-line ace-line old-record-id-EoUKdUsScoYgCEx6DSscj8atnSc">&nbsp;&nbsp;2) 您下載IDChats labs軟件並創建或導入錢包，即視爲您已經充分閱讀並接受本協議全部條款，本協議立即生效，對雙方具有約束力。</div>
  
  <div class="ace-line ace-line old-record-id-KsyOdCMswo0AyYxeORQc57o3nNg">&nbsp;&nbsp;3) 本協議可由本公司隨時更新，經修改的協議一經在IDChats labs上公佈，立即自動生效，恕不再另行通知。在本公司公佈修改協議條款後，如果您不接受修改後的條款，請立即停止使用IDChats labs，您繼續使用IDChats labs將被視爲接受修改後的協議。</div>
  
  <div class="ace-line ace-line old-record-id-WcCmd6q4YocWcaxesGgchvgMn5f">&nbsp;&nbsp;4) 如果您未滿18週歲，或者是無民事行爲能力人或限制民事行爲能力人，請在父母或監護人指導下使用IDChats labs。</div>
  
  <div class="ace-line ace-line old-record-id-RyGedciC0oQ6M6x0Us4cm9lanNd">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-CweCdI4eKoe4QWx8EeDcFO14nsb">&nbsp;&nbsp;二、 定義</div>
  
  <div class="ace-line ace-line old-record-id-ScuUdOC8qoIS4kxy3P1c4oxynhb">&nbsp;&nbsp;1）IDChats labs：指由本公司基於比特幣、以太坊、BSC、HECO、TRON、Polkadot、Kusama、EOS、COSMOS、墨客、井通、BOS、IOST區塊鏈系統（及將來陸續支持的其他區塊鏈系統）開發的區塊鏈錢包，包括其他爲方便用戶使用區塊鏈系統而開發的輔助工具。</div>
  
  <div class="ace-line ace-line old-record-id-E4WedMWAyoec4Yx87efcH46pn2g">&nbsp;&nbsp;2）用戶：</div>
  
  <div class="ace-line ace-line old-record-id-AYACdqMWUo2EU4xMV16c5Ulcntb">&nbsp;&nbsp; A. 用戶必須是具備完全民事行爲能力的自然人；</div>
  
  <div class="ace-line ace-line old-record-id-DswmdmKQkoqQcaxK6ewcvrNnnUf">&nbsp;&nbsp; B. 若您爲18週歲以下的未成年人使用IDChats labs服務，需要在您父母或監護人的指導下使用IDChats labs。無民事行爲能力人使用IDChats labs或限制民事行爲能力人超過其民事權利或行爲能力範圍從事交易的，造成的一切後果，IDChats labs有權要求您及您的父母或監護人負責。</div>
  
  <div class="ace-line ace-line old-record-id-RU4udiUyqoySuKxQz4hchg9Ln5c">&nbsp;&nbsp;3）被排出人士：</div>
  
  <div class="ace-line ace-line old-record-id-X0KGdewICocqCixcz6OcjeT3nEd">&nbsp;&nbsp; A.除了自然人以外的、具備訂立本協議的法律和意識能力的人士；或</div>
  
  <div class="ace-line ace-line old-record-id-J6gudMGIEoa8aexOmPMc6FIDnPb">&nbsp;&nbsp; B.因本協議、法律、監管要求或適用於該用戶的司法管轄區的規定而被以任何形式或方式（全部或部分）禁止、限制、無授權或無資格使用服務（如本協議所定義）的用戶。爲免疑義，中國用戶亦涵蓋在&ldquo;被排除人士&rdquo;的定義內。</div>
  
  <div class="ace-line ace-line old-record-id-DeWSdUCWqoGSWWxau8pc3Jp6nTg">&nbsp;&nbsp;4）使用相關：</div>
  
  <div class="ace-line ace-line old-record-id-CW2odG4QUoE6akx2THfcFivSnjd">&nbsp;&nbsp; A. 創建或導入錢包：指您使用IDChats labs，確認履行本協議並創建或導入錢包的過程。</div>
  
  <div class="ace-line ace-line old-record-id-Jkkcd6csqomAuyxeirDcIblJn0d">&nbsp;&nbsp; B. 錢包密碼：指您在創建IDChats labs錢包過程中，軟件操作界面提示您填寫的密碼，該密碼用於加密保護私鑰。作爲去中心化的應用，錢包密碼不存儲在您的這臺移動設備或本公司的服務器，一旦丟失你需要藉助明文私鑰或助記詞重置新密碼。</div>
  
  <div class="ace-line ace-line old-record-id-ZyUcdm4o2owCO8xaPSIcrY3jnZ8">&nbsp;&nbsp;信息提示：IDChats labs軟件操作界面涉及的信息提示內容，建議用戶按照相關步驟進行操作。</div>
  
  <div class="ace-line ace-line old-record-id-AUWudMOmSo8Iscxqfpkch8GDn3v">&nbsp;&nbsp; C. 特定用戶：指按照新加坡法律法規及政策規定必須要配合本公司履行個人信息披露義務的用戶。</div>
  
  <div class="ace-line ace-line old-record-id-NoYydm82yoMeo6xUPhNckvVInoe">&nbsp;&nbsp; D. 私鑰：由256位隨機字符構成，是用戶擁有並使用數字代幣的核心。</div>
  
  <div class="ace-line ace-line old-record-id-TSYEd2sacoo0YixOamDcxhQAnQf">&nbsp;&nbsp; E. 公鑰：由私鑰藉助密碼學原理單向推導生成，並用以生成區塊鏈數字錢包地址，數字錢包地址即爲公開收款地址。</div>
  
  <div class="ace-line ace-line old-record-id-Xo2udIYwYocqsCxCuxWcyw35nAe">&nbsp;&nbsp; F. 助記詞：符合區塊鏈BIP39 行業標準，由隨機算法生成的12（或15/18/21/24）個有序單詞組成。是私鑰的易記錄表現形式，方便用戶備份保管。</div>
  
  <div class="ace-line ace-line old-record-id-MScgdSUWaoG2yyxGokKcmokRnIb">&nbsp;&nbsp; G. Keystore: 是私鑰或助記詞經過用戶設置的錢包密碼加密保存的文件形式，它只存儲在您的這臺移動設備中，不會同步至本公司服務器。</div>
  
  <div class="ace-line ace-line old-record-id-E0C8duiWEoy4Q4xoXbwckkiknJg">&nbsp;&nbsp; H. 數字代幣：指IDChats labs目前支持的數字代幣種類，包括但不限於ETH、EOS等。</div>
  
  <div class="ace-line ace-line old-record-id-QOSqd4MGWoSOuux4SgicVnzYnZd">&nbsp;&nbsp; I. 資料：指IDChats labs上&ldquo;快訊&rdquo;等內容資料，這些資料均爲本公司所有，未經授權不得轉載。</div>
  
  <div class="ace-line ace-line old-record-id-IGgqdAoSSoQ8eyxQPejc7GYtnGh">&nbsp;&nbsp; J. 個人信息：指以電子或者其他方式記錄的能夠單獨或者與其他信息結合識別用戶個人身份的各種信息，包括但不限於自然人的姓名、出生日期、身份證件號碼、個人生物識別信息、住址、電話號碼、銀行卡號、郵件地址、錢包地址、移動設備信息、操作記錄、交易記錄等，但不包括用戶的錢包密碼、私鑰、助記詞、Keystore，對於國家法律規定的非我公司必要收集信息的，我公司將在徵得個人同意後方進行收集，並保證嚴格對於收集到的個人信息予以嚴格保密，未經個人本人同意，不得向其他第三方泄露。</div>
  
  <div class="ace-line ace-line old-record-id-FQsGd6ywco8e6wxesyMcOTqCnRh">&nbsp;&nbsp; K. 中國：指中華人民共和國，包括香港特別行政區、澳門特別行政區、臺灣地區。</div>
  
  <div class="ace-line ace-line old-record-id-UuuYdKu4aoQKsoxOyeGckGTFnJb">&nbsp;&nbsp; L. 第三方服務：指第三方DApp、第三方DeFi、第三方智能合約、第三方開源協議、第三方網頁、第三方硬件錢包、第三方在線網頁錢包、第三方交易所等第三方提供的產品和服務。</div>
  
  <div class="ace-line ace-line old-record-id-YgMKd2IgOoKMiYxItvOcVC8snzh">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-Yqs0dI64coCQmkx2VAhc4zK3nwd">&nbsp;&nbsp;三、 服務內容</div>
  
  <div class="ace-line ace-line old-record-id-Os8wdAGusoIG24xxBdwc0VgAnH7">&nbsp;&nbsp;1) 創建或導入錢包。對IDChats labs支持的數字代幣，您可以使用IDChats labs生成新錢包或導入相關區塊鏈系統的其它錢包工具生成的兼容錢包。</div>
  
  <div class="ace-line ace-line old-record-id-HcagdokWwo8e2MxGOxFcU7v6nmc">&nbsp;&nbsp;2) 轉賬、收款。您可以使用IDChats labs的轉賬、收款功能進行數字代幣的管理，即運用私鑰進行電子簽名，對相關區塊鏈的賬本進行修改。轉賬是指付款方利用收款方的區塊鏈地址進行轉賬操作，實際的轉賬、收款行爲均在相關區塊鏈系統（而非IDChats labs）發生。</div>
  
  <div class="ace-line ace-line old-record-id-Ac2MdyIsyoummWxg7excDFOXnpf">&nbsp;&nbsp;3) 行情查看。您可以使用IDChats labs查看所提供的數字代幣匯率價格。IDChats labs通過抓取相應的數字代幣匯率信息並展示在IDChats labs中的&ldquo;市場&rdquo;版塊。</div>
  
  <div class="ace-line ace-line old-record-id-Mew8dUGcyo22G0x0bkgc957Nn2F">&nbsp;&nbsp;4) 管理數字資產。您可以使用IDChats labs添加、保管並移除IDChats labs所支持的數字代幣。</div>
  
  <div class="ace-line ace-line old-record-id-DaeCdu0Oio4eKGxmWTSclFNpnJg">&nbsp;&nbsp;5) 瀏覽DApp。用戶通過在IDChats labs上的鏈接，可以跳轉至DApp並使用該DApp（包括本公司自己的DApp和第三方DApp）提供的服務。</div>
  
  <div class="ace-line ace-line old-record-id-XIC0dY02goQWo8xgrfjcZk0Inaf">&nbsp;&nbsp;6) 交易記錄。我們將通過區塊鏈系統拷貝您全部或部分的交易記錄。但交易記錄以區塊鏈系統的記載爲準。</div>
  
  <div class="ace-line ace-line old-record-id-VQqidq2kWoYya6xmsQAc08honLg">&nbsp;&nbsp;7) 暫停服務。您知悉基於區塊鏈系統交易&ldquo;不可撤銷&rdquo;的屬性，我們不能爲您暫停或撤銷轉賬交易等操作，但在一定情況下，我們可以暫停或者限制某位用戶對IDChats labs軟件的操作。</div>
  
  <div class="ace-line ace-line old-record-id-EuowdQmwUoGOEyx2PRCcqZi8nIg">&nbsp;&nbsp;8) EOS手機、郵箱賬號。在IDChats labs 上（EOS體系有效去中心解決方案）錢包註冊所需的手機號碼、郵箱，增加的Owner權限歸屬於本公司，我們將在註冊開始向您做出特別提示，如果選擇使用該功能，則視爲您同意並認可所有條款。</div>
  
  <div class="ace-line ace-line old-record-id-LC40dwiA0oGIkOx8GcWc1eaenvb">&nbsp;&nbsp; A. 使用IDChats labs手機號碼、郵箱註冊功能（ EOS體系有效去中心解決方案）過程中會收集您的手機號碼或郵箱地址作爲一個憑證，並默認增加多籤的Owner權限，以便於私鑰找回。</div>
  
  <div class="ace-line ace-line old-record-id-Ai0AdMmuKomE68xJMu1cojzYnGf">&nbsp;&nbsp; B. 我們在手機號碼、郵箱註冊方式中（EOS體系有效去中心解決方案）會把本公司的Owner權限進行多籤設置，最大程度的保證用戶的權限安全。且區塊信息可查，最大程度公開透明化，賬號的每一次操作均可查詢對應的發起者。</div>
  
  <div class="ace-line ace-line old-record-id-W0oKdyGomoKkkYx8cULcDf9wn8b">&nbsp;&nbsp;9) 幣幣兌換。用戶可以與使用第三方智能合約或第三方DEX進行數字代幣兌換，由IDChats labs作爲界面工具幫助用戶和第三方交互並顯示該數字代幣兌換的相應結果。</div>
  
  <div class="ace-line ace-line old-record-id-AMOMdi0Owoik2cxMt4gcbvrpnRc">&nbsp;&nbsp;10) 其他本公司認爲有必要提供的服務。</div>
  
  <div class="ace-line ace-line old-record-id-SgcodAsWGoaEKCx2aCfc3GFqnwK">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-XusIdeYOuoKcK8x2tA5c3cjQn4d">&nbsp;&nbsp;四、 用戶接受本公司提供的上述服務時應瞭解以下常見問題</div>
  
  <div class="ace-line ace-line old-record-id-Y0wqd0qcOo0IiuxGvltcwXiwns3">&nbsp;&nbsp;1) 秉承着區塊鏈的去中心化特點，併爲了保護用戶的數字代幣安全，本公司提供的是去中心化服務，大大區別於銀行業金融機構。用戶瞭解本公司（去中心化方案）不提供以下服務：</div>
  
  <div class="ace-line ace-line old-record-id-FsWidAi4Yoe0Acxk1W0cEe5hnNb">&nbsp;&nbsp; A. 存儲用戶的錢包密碼（即用戶創建/導入錢包時設置的密碼）、私鑰、助記詞、Keystore；</div>
  
  <div class="ace-line ace-line old-record-id-Y0WOdYMKiooi6AxMT3VcsRaPnWf">&nbsp;&nbsp; B. 找回用戶的錢包密碼、私鑰、助記詞、Keystore；</div>
  
  <div class="ace-line ace-line old-record-id-U64UdIGcEoiGusxsjK9c2xVAn3d">&nbsp;&nbsp; C. 凍結錢包；</div>
  
  <div class="ace-line ace-line old-record-id-XcgOdEmoYougSixwVxacLH4gnDc">&nbsp;&nbsp; D. 掛失錢包；</div>
  
  <div class="ace-line ace-line old-record-id-A84YdWs4qoWWsGxcFdAcpPaxnah">&nbsp;&nbsp; E. 恢復錢包；</div>
  
  <div class="ace-line ace-line old-record-id-YO4Kd2keEoIEwQxMjUxc4hBDnIb">&nbsp;&nbsp; F. 交易回滾。</div>
  
  <div class="ace-line ace-line old-record-id-MO6Qdm0y0o2GouxkZZPc0zdUnTc">&nbsp;&nbsp;2) 由於本公司不提供上述服務，因此用戶應當自行保管含有IDChats labs的移動設備、備份IDChats labs、備份錢包密碼、助記詞、私鑰及Keystore。如用戶遺失移動設備、刪除且未備份IDChats labs、刪除且未備份錢包、錢包被盜或遺忘錢包密碼、私鑰、助記詞、Keystore，本公司均無法還原錢包或找回錢包密碼、私鑰、助記詞、Keystore；如用戶進行交易時誤操作（例如輸錯轉賬地址），本公司亦無法取消交易。</div>
  
  <div class="ace-line ace-line old-record-id-KI86d0wGOoWmCIxm7bBcjNAXnib">&nbsp;&nbsp;3) 本公司和IDChats labs所能夠提供的數字代幣管理服務並未包括所有已存在的數字代幣，請勿通過IDChats labs操作任何IDChats labs不支持的數字代幣。</div>
  
  <div class="ace-line ace-line old-record-id-IyOqdYQc8oQ0goxh2l0clhxDntk">&nbsp;&nbsp;4) IDChats labs僅是用戶的數字代幣管理工具，並非交易所或交易平臺。雖然本協議將多次提及&ldquo;交易&rdquo;，其行爲泛指用戶使用。IDChats labs進行的轉賬和收款操作，這與交易所或交易平臺上進行的&ldquo;交易&rdquo;有本質區別。</div>
  
  <div class="ace-line ace-line old-record-id-QMGKdiG6UoIUc2xch7Bc78yZnPc">&nbsp;&nbsp;5) IDChats labs上集成的DApp包括本公司自主擁有的DApp和第三方平臺提供的DApp。對於第三方平臺提供的DApp，IDChats labs僅爲用戶進入DApp提供區塊鏈瀏覽器。用戶在第三方DApp上接受服務或進行交易前應自行判斷和評估該第三方DApp提供的服務或交易是否存在風險。</div>
  
  <div class="ace-line ace-line old-record-id-DesOdYUgOoECWCxqaM9cnw0qnVf">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-FYeedkECGoGaaMxysRkcUuPWnqg">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-UQcidoQugok4uIxKco9cWk4Znig">&nbsp;&nbsp;五、 您的權利義務</div>
  
  <div class="ace-line ace-line old-record-id-NWYCdgGQsoCOGqxGCwlc47awnhd">&nbsp;&nbsp;1) 創建或導入錢包</div>
  
  <div class="ace-line ace-line old-record-id-AUqsdSyQQoKG20xQD0ycwESvnog">&nbsp;&nbsp; A. 創建或導入錢包：您有權在您的移動設備上通過IDChats labs創建和/或導入錢包，有權設定錢包的錢包密碼等信息，並有權通過IDChats labs應用程序，使用自己的錢包在區塊鏈上進行轉賬和收款等交易。</div>
  
  <div class="ace-line ace-line old-record-id-Luc0dI20eouO2IxY2lwcx0lAnEl">&nbsp;&nbsp; B. 身份驗證：按照有關法律法規和政策要求，特定用戶在使用IDChats labs提供的有關服務時，應當按照IDChats labs的提示及時完成相關身份驗證，要求您提交包括但不限於您的姓名、身份證號碼、手機號碼、銀行卡號信息等個人信息。否則該特定用戶將無法使用有關服務，因特定用戶拖延造成的損失由您自行承擔。</div>
  
  <div class="ace-line ace-line old-record-id-RUaIdGKYKo42q0xHzXJcCMuynlQ">&nbsp;&nbsp; C. 本公司可能爲不同的終端設備開發不同的軟件版本，您應當根據實際需要選擇下載合適的版本進行安裝。如果您從未經合法授權的第三方獲取本軟件或與本軟件名稱相同的安裝程序，本公司將無法保證該軟件能否正常使用，也無法保證其安全性，因此造成的損失由您自行承擔。</div>
  
  <div class="ace-line ace-line old-record-id-SoIOdSUkeomcgMxWELJcIpNLnce">&nbsp;&nbsp; D. 本軟件新版本發佈後，舊版軟件可能無法使用。本公司不保證舊版軟件的安全性、繼續可用性及提供相應的客戶服務。請您隨時覈對並下載最新版本。</div>
  
  <div class="ace-line ace-line old-record-id-GOcCdkcGIo60KcxwTxMcJhP4ndY">&nbsp;&nbsp;2) 使用：</div>
  
  <div class="ace-line ace-line old-record-id-AAMCdEqUooiIOAx4pdhc2FVmndh">&nbsp;&nbsp; A. 用戶應自行妥善保管移動設備、錢包密碼、私鑰、助記詞、Keystore等信息。本公司不負責爲用戶保管以上信息。因您遺失移動設備、主動或被動泄露、遺忘錢包密碼、私鑰、助記詞、Keystore或遭受他人攻擊、詐騙等所引起的一切風險、責任、損失、費用應由您自行承擔。</div>
  
  <div class="ace-line ace-line old-record-id-NKqAdka0gos8uOxkXhMcKyEBndc">&nbsp;&nbsp; B. 遵循信息提示。您瞭解並同意遵循IDChats labs對您做出的信息提示，按照信息提示的內容進行操作，否則，由此引起的一切風險、責任、損失、費用等應由您自行承擔。</div>
  
  <div class="ace-line ace-line old-record-id-DimAdUW2Koois2xSk18cB0l9npb">&nbsp;&nbsp; C. 您知悉並理解IDChats labs沒有義務對鏈接的第三方DApp服務或交易履行盡職調查義務，您應當理性做出投資決策並自主承擔相應的投資風險。</div>
  
  <div class="ace-line ace-line old-record-id-B2eCdeGUaoeoCCxaEnFcJ3g5n4d">&nbsp;&nbsp; D. 積極完成身份驗證。當IDChats labs合理認爲您的交易行爲或交易情況出現異常的，或認爲您的身份信息存在疑點的，或IDChats labs認爲應覈對您身份證件或其他必要文件的情形時，請您積極配合IDChats labs覈對您的有效身份證件或其他必要文件，及時完成相關的身份驗證。</div>
  
  <div class="ace-line ace-line old-record-id-XGk6dSaScoaMK2xScQhcutkinld">&nbsp;&nbsp; E. 使用IDChats labs手機號碼、郵箱註冊方式（EOS體系有效去中心解決方案），您可以選擇導出私鑰功能來獲得私鑰以更好的管理您的賬戶，您也知悉您可以將默認添加的多籤owner權限進行刪除，並且瞭解並明白刪除默認添加的多籤owner權限，本公司將無法幫助您進行私鑰恢復。</div>
  
  <div class="ace-line ace-line old-record-id-UgwYdkak2o4m00x6DT9cphXHn4b">&nbsp;&nbsp;3) 轉賬：</div>
  
  <div class="ace-line ace-line old-record-id-YUMUdwmgwoqCY0xqSSNcjDPknIg">&nbsp;&nbsp; A. 您知悉對於IDChats labs服務中您可使用的日計轉賬限額和筆數，可能因爲您使用該轉賬服務時所處的國家/地區、監管要求、轉賬目的、IDChats labs風險控制、身份驗證等事由而不同。</div>
  
  <div class="ace-line ace-line old-record-id-NIwmdQwi2oKmOkxItnkcc1etnBf">&nbsp;&nbsp; B. 您理解基於區塊鏈操作的&ldquo;不可撤銷&rdquo;屬性，當您使用IDChats labs轉賬功能時，您應當自行承擔因您操作失誤而導致的後果（包括但不限於因您輸錯轉賬地址、您自身選擇轉賬節點服務器的問題）。</div>
  
  <div class="ace-line ace-line old-record-id-XYY8d8YMKoKyYGxcF51cJf9jnJf">&nbsp;&nbsp; C. 您知悉在使用IDChats labs服務時，以下情況的出現可能導致轉賬&ldquo;交易失敗&rdquo;或&ldquo;打包超時&rdquo;：</div>
  
  <div class="ace-line ace-line old-record-id-MegydqgC6om2QIxcHEncK5YtnWe">&nbsp;&nbsp; a) 錢包餘額不足；</div>
  
  <div class="ace-line ace-line old-record-id-EE8odoUieoSmwgx4Rj3c966dnug">&nbsp;&nbsp; b) 交易礦工費不足；</div>
  
  <div class="ace-line ace-line old-record-id-ToSWd0SYIoY2QMxY5GicNedZngf">&nbsp;&nbsp; c) 區塊鏈執行合約代碼失敗；</div>
  
  <div class="ace-line ace-line old-record-id-FgE8do48eoU8CWxUHhkcUwKAnvb">&nbsp;&nbsp; d) 超出監管部門、IDChats labs或法律法規規定的付款額度；</div>
  
  <div class="ace-line ace-line old-record-id-EWi4dsSiso2sq4xI13Hc7L7Lnxc">&nbsp;&nbsp; e) 網絡、設備等技術故障；</div>
  
  <div class="ace-line ace-line old-record-id-BQa6dMQSmoe4AuxSydLc5XEFnRh">&nbsp;&nbsp; f) 區塊鏈網絡擁堵、故障等原因引起交易被拋棄；</div>
  
  <div class="ace-line ace-line old-record-id-KEcSdg6i4ocM6Mx4WQycH1jYnEd">&nbsp;&nbsp; g) 您的地址或交易對方地址被識別爲特殊地址, 如高風險地址、交易所地址、ICO 地址、Token地址等。</div>
  
  <div class="ace-line ace-line old-record-id-Po4wd2GmMoQkEex6WFbc1hPrnlf">&nbsp;&nbsp; D. 您知悉IDChats labs僅向您提供轉賬工具，在您使用IDChats labs完成轉賬後，本公司即完成了當次服務的所有義務，本公司對其他糾紛爭議，不負擔任何義務。</div>
  
  <div class="ace-line ace-line old-record-id-HgwmdwCSeoEseKxkLaKcXJHDnWf">&nbsp;&nbsp; E. 合法合規。您知悉在IDChats labs進行操作時或利用IDChats labs上的DApp進行交易時，您應當遵循有關法律法規、國家政策的要求。</div>
  
  <div class="ace-line ace-line old-record-id-ZgEadkSogoc6scxyy62cCE6hnBe">&nbsp;&nbsp; F. 公告通知。IDChats labs會以網站公告、電子郵件、發送短信、電話、消息中心信息、彈窗提示或客戶端通知等方式向您發送通知，例如通知您交易進展情況，或者提示您進行相關操作，請您及時予以關注。</div>
  
  <div class="ace-line ace-line old-record-id-GoWgdY2KCo2Q2axyYbXcn6hinch">&nbsp;&nbsp;4) 服務費用與納稅義務：</div>
  
  <div class="ace-line ace-line old-record-id-OyEEdMiC0ouMwCxk52gcjutJnSg">&nbsp;&nbsp; A. IDChats labs暫時不向您收取任何形式的服務費或手續費，將來需對某些服務進行收費時將另行約定或公佈規則；</div>
  
  <div class="ace-line ace-line old-record-id-BSuEd2YwUomE8sxEvD8cWHC9n1c">&nbsp;&nbsp; B. 您使用IDChats labs進行轉賬時應支付礦工費，金額由您自行決定。礦工費由相關區塊鏈系統收取；</div>
  
  <div class="ace-line ace-line old-record-id-MY44dA6WYoyeWYxMnzUci4YOnoh">&nbsp;&nbsp; C. 您知悉在特定情況下，因爲您所處的環境及網絡狀態不穩定，導致您的轉賬操作未完成時，亦會被相關區塊鏈系統收取礦工費；</div>
  
  <div class="ace-line ace-line old-record-id-YooYdKSskoesyExqSQgcQTj3nGd">&nbsp;&nbsp; D. 您因在IDChats labs進行交易而發生的所有應納稅負及其它方面的費用均由您負責支付。</div>
  
  <div class="ace-line ace-line old-record-id-K6qQdMKqmoWOIOx2zzHcfFeDnAh">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-OAEcdIu0UowkqgxOiaXcBfRknYg">&nbsp;&nbsp;六、 風險提示</div>
  
  <div class="ace-line ace-line old-record-id-T4kidMyuCow4wwxALnVcIkZHnCb">&nbsp;&nbsp;1) 您瞭解並知悉，由於數字代幣領域的法律法規政策尚未健全，該領域的數字代幣可能會產生無法兌現、技術不穩定等重大風險。且數字代幣的價格波動幅度遠高於其他金融資產。我們謹慎提醒您應當根據自身財務狀況和風險偏好，理性選擇持有或處置任何一種數字代幣。IDChats labs提供的行情查看功能僅系抓取部分交易所的數字代幣匯率信息的搜索結果，並不表示爲最新行情或最佳報價。</div>
  
  <div class="ace-line ace-line old-record-id-VCAQd6g2woWGyyxUf0BcvpLZn5b">&nbsp;&nbsp;2) 在使用IDChats labs服務時，若您或您的相對方未遵從本協議或相關網站說明、交易、支付頁面中之操作提示、規則，IDChats labs並不保證交易會順利完成，且IDChats labs不承擔損害賠償責任。若發生前述情形，而款項已先行入賬您的或您的交易方賬號中。</div>
  
  <div class="ace-line ace-line old-record-id-Wo2odUemIoAgkexsR14c3Y4nn1e">&nbsp;&nbsp;3) IDChats labs錢包或第三方錢包，您理解區塊鏈操作具有的&ldquo;不可逆&rdquo;屬性，以及相關交易具有&ldquo;不可撤銷&rdquo;的特徵，由您及您的相對方自行承擔相應的風險後果。</div>
  
  <div class="ace-line ace-line old-record-id-UaYQdU2oEoAIYgxiWyFcfucknnd">&nbsp;&nbsp;4) 在您使用IDChats labs集成的第三方DApp服務或進行交易時，爲了您的利益，本公司建議您仔細閱讀本協議及IDChats labs提示，瞭解交易對象及產品信息，謹慎評估風險後再採取行動。所有您在第三方DApp進行的交易行爲系您的個人行爲，有約束力的合同關係在您和您的相對方之間建立，與IDChats labs無關。IDChats labs對因您的交易行爲所引起的一切風險、責任、損失、費用不承擔任何責任。</div>
  
  <div class="ace-line ace-line old-record-id-Zm60dSiMmoaao6xCle9c3BRtnGR">&nbsp;&nbsp;5) 您在交易過程中應當自行判斷對方是否爲完全民事行爲能力人並自行決定是否與對方進行交易或轉賬給對方等，且您自行承擔與此相關的所有風險。</div>
  
  <div class="ace-line ace-line old-record-id-IUS4doGGMoG02ixmYC6cYdqonye">&nbsp;&nbsp;6) 在轉賬過程中，如果出現&ldquo;交易失敗&rdquo;、&ldquo;打包超時&rdquo;等類似的異常信息提示時，您應通過相關區塊鏈系統的官方途徑或其他的區塊鏈查詢工具進行再次確認，以避免重複轉賬；否則，由此所引起的一切損失和費用應由您自行承擔。</div>
  
  <div class="ace-line ace-line old-record-id-VIC8dwMwYoSKiqx4wrRcPq4WnUe">&nbsp;&nbsp;7) 您理解當您在IDChats labs上創建或導入錢包之後，您的Keystore、私鑰、助記詞等信息僅存儲在當前的這臺移動設備中，不存儲在IDChats labs或本公司的服務器上。您可以按照IDChats labs提供的操作指南採取同步錢包等方式更換移動設備。但若您未保存或備份錢包密碼、私鑰、助記詞、Keystore等信息且在您移動設備丟失的情況下，您的數字代幣將因此丟失，本公司無法爲您找回，您需自行承擔相應損失。若您在導出、保存或備份錢包密碼、私鑰、助記詞、Keystore等信息的時候泄密，或保存或備份上述信息的設備或服務器被黑客攻擊或控制等情況下，您的數字代幣將因此丟失，本公司無法爲您找回，您需自行承擔相應損失。</div>
  
  <div class="ace-line ace-line old-record-id-QEACd2Yswo2m2qxQzaFcTCgMn7f">&nbsp;&nbsp;8) 我們建議您在創建或導入錢包時對您錢包的錢包密碼、私鑰、助記詞及Keystore等信息做好安全備份。我們提請您注意，請不要採用以下備份方式：截圖、郵件、記事本、短信、微信、QQ等電子備份方式。我們建議您在紙質記事本上抄寫助記詞和Keystore等信息，同時您亦可將電子數據保管至密碼管理器。</div>
  
  <div class="ace-line ace-line old-record-id-RE6Mdck8soqSgQxagYfcGLJdnBb">&nbsp;&nbsp;9) 我們建議您在安全的網絡環境中使用IDChats labs，確保您的移動設備沒有越獄或Root， 以避免可能存在的安全隱患。</div>
  
  <div class="ace-line ace-line old-record-id-EAisdIYMqomcgmx295rc9nTonVe">&nbsp;&nbsp;10) 您在使用我們的服務過程中，警惕非IDChats labs官方的詐騙行爲。一旦發現此類行爲，我們鼓勵您第一時間告知我們。</div>
  
  <div class="ace-line ace-line old-record-id-KeAUdmWEYoIs41xiCBdc5p5onAN">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-ZiMIdSikWoSoSSxuhy2c6OvOnnb">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-Saecd6SYEoUw06xmS8bc8JFXnNb">&nbsp;&nbsp;七、 服務的變更、中斷、終止</div>
  
  <div class="ace-line ace-line old-record-id-Tg00dsyO4oEQAkxcn7kcGvMenQb">&nbsp;&nbsp;1) 您同意本公司爲保證自主業務經營權可以暫時提供部分服務功能，或於將來暫停部分服務功能或開通新的服務功能。當任何功能減少或者增加或者變化時，只要您仍然使用本公司提供的服務，表示您仍然同意本協議或者本協議修正後的條款。</div>
  
  <div class="ace-line ace-line old-record-id-RgaCdYM06oGwAaxCAgMc9tnKndd">&nbsp;&nbsp;2) 您理解存在如下情形時，本公司將暫停提供服務：</div>
  
  <div class="ace-line ace-line old-record-id-ECi0daKSYoSqeoxAf0bc9KMcn8c">&nbsp;&nbsp; A. 因設備、區塊鏈系統維修、升級、故障和通信中斷等技術原因而中斷業務；</div>
  
  <div class="ace-line ace-line old-record-id-FSCGdwakEowwkAxiQfLcnEEInne">&nbsp;&nbsp; B. 因颱風、地震、海嘯、洪水、停電、戰爭或恐怖襲擊等不可抗力因素，病毒、木馬、黑客攻擊、系統不穩定或政府行爲等原因，造成本公司系統不能提供服務或本公司合理認爲繼續提供服務會有較大風險的；</div>
  
  <div class="ace-line ace-line old-record-id-XCCmdwmcMok0KQxgA5GccuRgnxX">&nbsp;&nbsp; C. 發生本公司無法控制或合理預見的其他情形。</div>
  
  <div class="ace-line ace-line old-record-id-XOkUd086ioGS2SxAZvIcu759nZb">&nbsp;&nbsp; D. 當您出現如下情況時，本公司可單方面中止或終止您使用IDChats labs的部分或全部功能:</div>
  
  <div class="ace-line ace-line old-record-id-JCmqdaQyOoyoa6x8DdkckDwJn5e">&nbsp;&nbsp; 1.用戶死亡；</div>
  
  <div class="ace-line ace-line old-record-id-PyKQdYQk2os0ACxaWyocIJ0PnZc">&nbsp;&nbsp; 2.盜用他人的錢包信息或移動設備；</div>
  
  <div class="ace-line ace-line old-record-id-HciSdqoscoe8mixiE43cz7EinrO">&nbsp;&nbsp; 3.填寫個人信息時提供虛假信息；</div>
  
  <div class="ace-line ace-line old-record-id-I8gAd2YKooWsWOxCMiVcwS5DnEd">&nbsp;&nbsp; 4.拒絕本公司爲提升IDChats labs功能而發起的強制更新操作；</div>
  
  <div class="ace-line ace-line old-record-id-ZkAAdS4Oeo8GKYxAFvIcZTWknbn">&nbsp;&nbsp; 5.將IDChats labs用於違法或犯罪活動；</div>
  
  <div class="ace-line ace-line old-record-id-DAoidACIEoSkwgx25VUczmYFnxh">&nbsp;&nbsp; 6.妨礙其他用戶正常使用；</div>
  
  <div class="ace-line ace-line old-record-id-Twk0dKIimoYSWQxsvO2cg6o0n0e">&nbsp;&nbsp; 7.僞稱本公司的工作人員或管理人員；</div>
  
  <div class="ace-line ace-line old-record-id-TyCcd28Umo8CSixc7QKc9ra9nyc">&nbsp;&nbsp; 8.攻擊、侵入、更改或以任何其他方式威脅本公司計算機系統的正常運作；</div>
  
  <div class="ace-line ace-line old-record-id-QGiCde2ECoUiSQx8VUbceH0rnTf">&nbsp;&nbsp; 9.利用IDChats labs宣傳垃圾廣告；</div>
  
  <div class="ace-line ace-line old-record-id-BamMdSAI8oAGucx2pMEcgEQ1nch">&nbsp;&nbsp; 10.散佈謠言，損害本公司和IDChats labs商譽；</div>
  
  <div class="ace-line ace-line old-record-id-IisEdEAcEoIGMoxEFogcI9p2nPd">&nbsp;&nbsp; 11.違法行爲，其他違反本協議的行爲，及本公司合理認爲應當暫停功能的情形。</div>
  
  <div class="ace-line ace-line old-record-id-JmaCdYoIso4gs8xUA7fcwAaWnsb">&nbsp;&nbsp;3) 當您與本公司之間的服務關係變更、中斷、終止時，您仍有權在合理時間內導出您錢包等信息。</div>
  
  <div class="ace-line ace-line old-record-id-FekudQcCooCEoUx0WFRcOghZnyd">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-WSMAdwWEOoaQAexULHxcpnKgnSg">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-YyOMdOIAkogmgqxi27icmu7inxh">&nbsp;&nbsp;八、 您合法使用本公司服務的承諾</div>
  
  <div class="ace-line ace-line old-record-id-Pe6wdcsayoiyoIxYD8HcB7xKnug">&nbsp;&nbsp;1) 您應遵守您所居住的國家或地區的法律法規，不得將IDChats labs用於任何非法目的，也不得以任何非法方式使用本公司服務。</div>
  
  <div class="ace-line ace-line old-record-id-IA6Udm0Wko8ok2xG6XDcREY0nye">&nbsp;&nbsp;2) 您不得利用IDChats labs從事違法或犯罪的行爲，包括但不限於：</div>
  
  <div class="ace-line ace-line old-record-id-A2oydKyCwoEQAaxoJ8ZcsQ52nwg">&nbsp;&nbsp; A. 反對憲法所確定的基本原則，危害國家安全、泄漏國家祕密、顛覆國家政權、破壞國家統一的；</div>
  
  <div class="ace-line ace-line old-record-id-D6wqdumaAoScKkxEcZOc2jW0n6A">&nbsp;&nbsp; B. 從事任何違法犯罪行爲，包括但不限於洗錢、非法集資等；</div>
  
  <div class="ace-line ace-line old-record-id-IkMWdGUquoOgyExOMLicSaGvnod">&nbsp;&nbsp; C. 通過使用任何自動化程序、軟件、引擎、網絡爬蟲、網頁分析工具、數據挖掘工具或類似工具，接入本公司服務、收集或處理本公司所提供的內容，干預或試圖干預任何用戶或任何其他方式接入本公司服務的行爲；</div>
  
  <div class="ace-line ace-line old-record-id-WiCgdM6Eqo6wY4xukG4ccQk2nOg">&nbsp;&nbsp; D. 提供賭博資訊或以任何方式引誘他人蔘與賭博；</div>
  
  <div class="ace-line ace-line old-record-id-JM4AdM6YIoIeg8xy8yCcyervnRf">&nbsp;&nbsp; E. 侵入他人IDChats labs錢包盜取數字代幣；</div>
  
  <div class="ace-line ace-line old-record-id-PIyUd0M8OoumoQxYf2Xc2JWenCd">&nbsp;&nbsp; F. 進行與交易對方宣稱的交易內容不符的交易，或不真實的交易；</div>
  
  <div class="ace-line ace-line old-record-id-HyeGdQKCoouCEyx6duDcpu3Inac">&nbsp;&nbsp; G. 從事任何侵害或可能侵害IDChats labs服務系統、數據之行爲；</div>
  
  <div class="ace-line ace-line old-record-id-OW06dAe44og8i8xKu1mcrFVPnFe">&nbsp;&nbsp; H. 其他違法以及本公司有正當理由認爲不適當的行爲。</div>
  
  <div class="ace-line ace-line old-record-id-RuiKdKeQSo4AIixqsDRc08fGnpd">&nbsp;&nbsp;3) 您理解並同意，如因您違反有關法律（包括但不限於海關及稅務方面的監管規定）或者本協議之規定，使本公司遭受任何損失、受到任何第三方的索賠或任何行政管理部門的處罰，您應對本公司進行賠償，包括合理的律師費用。 4) 您不屬於資格使用IDChats labs服務的被排除人士。</div>
  
  <div class="ace-line ace-line old-record-id-OYgEdUASGoUMuSxFCkDcPywinAi">&nbsp;&nbsp;5) 您承諾按時繳納本公司的服務費用（如有），否則本公司有權暫停或中止對您提供的服務。</div>
  
  <div class="ace-line ace-line old-record-id-Ks2Yd0G0gocgQYxA5eOcqUdInAb">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-Gse2dwksKoweUsxiYLWcBCvTnrd">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-EgAadASK2o0oC2xuMnmcKXFBn6b">&nbsp;&nbsp;九、 隱私條款</div>
  
  <div class="ace-line ace-line old-record-id-SwykdeO2Io0IsixUZ4WcYCS8n1e">&nbsp;&nbsp;本公司十分重視對用戶隱私的保護，相關隱私保護政策請參考本公司公佈並不時更新的《IDChats labs隱私政策》。</div>
  
  <div class="ace-line ace-line old-record-id-QKskdOscYoAMYCxYQYtc8t5Angm">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-OIAwdgewIoESowxWmMncSFDGnVd">&nbsp;&nbsp;十、 免責及責任限制</div>
  
  <div class="ace-line ace-line old-record-id-A04mduuoIoCWggxKgSdcZagRnOe">&nbsp;&nbsp;1) 本公司僅對本協議中所列明的義務承擔責任。</div>
  
  <div class="ace-line ace-line old-record-id-C8cedAiUWosm2ExcxJUcMBZBnie">&nbsp;&nbsp;2) 您理解和同意，在法律所允許的範圍內，本公司只能按照現有的技術水平和條件提供IDChats labs服務。因下列原因導致IDChats labs無法正常提供服務，本公司不承擔責任：</div>
  
  <div class="ace-line ace-line old-record-id-BUEwdeYykoaAeaxAXUGcZ7EGnvh">&nbsp;&nbsp; A. IDChats labs系統停機維護或升級；</div>
  
  <div class="ace-line ace-line old-record-id-CuO0dIo8Ioik4gxETL5cJNNRnxf">&nbsp;&nbsp; B. 因颱風、地震、洪水、雷電或恐怖襲擊等不可抗力原因；</div>
  
  <div class="ace-line ace-line old-record-id-IE0edooy2oW6y8xEZkIc75nBnxf">&nbsp;&nbsp; C. 您的移動設備軟硬件和通信線路、供電線路出現故障的；</div>
  
  <div class="ace-line ace-line old-record-id-JQYqdEyAqoSCsWxkf2acQhnXn8u">&nbsp;&nbsp; D. 您操作不當或未通過本公司授權或認可的方式使用本公司服務的；</div>
  
  <div class="ace-line ace-line old-record-id-Z0IOdcKAaoCckkxqr2kcXV0Xnsb">&nbsp;&nbsp; E. 因病毒、木馬、惡意程序攻擊、網絡擁堵、系統不穩定、系統或設備故障、通訊故障、電力故障、銀行等原因或政府行爲等原因；</div>
  
  <div class="ace-line ace-line old-record-id-NicudEOCeo80wixAL35cG1apnAc">&nbsp;&nbsp; F. 非因本公司的原因而引起的任何其它原因。</div>
  
  <div class="ace-line ace-line old-record-id-TSomdWOiIo8UCCxY1IIcd3Ejnwf">&nbsp;&nbsp;3) 本公司對以下情形不承擔責任：</div>
  
  <div class="ace-line ace-line old-record-id-E2OSd4c2qomGsqx4kj6cJP6pnod">&nbsp;&nbsp; A. 因用戶遺失移動設備、刪除且未備份IDChats labs、刪除且未備份錢包、錢包被盜或遺忘錢包密碼、私鑰、助記詞、Keystore而導致的數字代幣丟失。</div>
  
  <div class="ace-line ace-line old-record-id-POMudYomyog2oCxO2fucQi6qnSg">&nbsp;&nbsp; B. 因用戶自行泄露錢包密碼、私鑰、助記詞、Keystore，或借用、轉讓或授權他人使用自己的移動設備或IDChats labs錢包，或未通過本公司官方渠道下載IDChats labs應用程序或其他不安全的方式使用IDChats labs應用程序導致的數字代幣丟失；</div>
  
  <div class="ace-line ace-line old-record-id-SQqUdMAc2oEcOWxEps6c8vppnUc">&nbsp;&nbsp; C. 因用戶誤操作（包括但不限於您輸錯轉賬地址、您自身選擇轉賬節點服務器的問題）導致的數字代幣丟失；</div>
  
  <div class="ace-line ace-line old-record-id-Ke6Id4Qg2o0AISxGI78cxCMUnZc">&nbsp;&nbsp; D. 因用戶不理解區塊鏈技術的性質而進行誤操作導致的數字代幣丟失；</div>
  
  <div class="ace-line ace-line old-record-id-ToiYdIAwmoScqaxuYQtcSWQdnnh">&nbsp;&nbsp; E. 因時間滯後、區塊鏈系統不穩定等原因導致本公司拷貝用戶在區塊鏈上的交易記錄發生偏差；</div>
  
  <div class="ace-line ace-line old-record-id-Bk6QdUsgKoWKAsxeMWdcVtFAnfg">&nbsp;&nbsp;4) IDChats labs手機號碼、郵箱註冊方式（EOS體系有效去中心解決方案）下，用戶是可選導出私鑰的，因爲用戶更改Owner和Active權限後導致的私鑰丟失或被盜造成的財產損失均與本公司無關。</div>
  
  <div class="ace-line ace-line old-record-id-DicQdUI4EoQykkx8TJHcyCHAnDd">&nbsp;&nbsp;5) IDChats labs手機號碼、郵箱註冊方式（EOS體系有效去中心解決方案）默認情況下，由於用戶的原因導致無法通過手機號碼找回的（無法補辦手機卡等情況），不能提供私鑰找回服務。</div>
  
  <div class="ace-line ace-line old-record-id-TCCWdcaosoY0m2x4tXPcTVAsnXf">&nbsp;&nbsp;6) 由於用戶個人原因（包括但不限於手機號碼、郵箱丟失，驗證碼泄露，個人公開私鑰，用戶個人信息被黑客入侵）及不可抗拒因素導致的資產丟失，均與本公司無關。</div>
  
  <div class="ace-line ace-line old-record-id-EO4UdiMmCo2AkUxYJXoc1nddnYg">&nbsp;&nbsp;7) 用戶在第三方DApp上操作產生的風險和後果。您理解IDChats labs僅作爲您數字代幣管理的工具。本公司不能控制第三方DApp提供的產品及服務的質量、安全或合法性，信息的真實性或準確性，以及相對方履行其在與您簽訂的協議項下的各項義務的能力。所有您在第三方DApp進行的交易行爲系您的個人行爲，有約束力的合同關係在您和您的相對方之間建立，與IDChats labs無關。本公司提醒您應該通過自己的謹慎判斷確定登錄DApp及相關信息的真實性、合法性和有效性。您與任何第三方交易所產生的風險亦應由您自行承擔。</div>
  
  <div class="ace-line ace-line old-record-id-CsOidWA8MocWoAxstHUcDZUqnGe">&nbsp;&nbsp;本公司可能同時爲您及您的交易對手方提供服務，您同意對本公司可能存在的該等行爲予以明確豁免任何實際或潛在的利益衝突，並不得以此來主張本公司在提供服務時存在法律上的瑕疵，也不因此而加重本公司的責任或注意義務。</div>
  
  <div class="ace-line ace-line old-record-id-RESgdak4koWKEmxERaqcAjNDnkf">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-CiAqdoiGmo48eKxe7HacQ6aknfo">&nbsp;&nbsp;十一、 本公司不提供以下形式的保證：</div>
  
  <div class="ace-line ace-line old-record-id-M2kCdio8Yo4cOGxwJeycVaD2nVf">&nbsp;&nbsp;1) 本公司服務將符合您的全部需求；</div>
  
  <div class="ace-line ace-line old-record-id-O6AodUiEeoQE20x6uOfcbAd7nbb">&nbsp;&nbsp;2) 您經由本公司服務取得的任何技術、產品、服務、資訊將符合您的期望；</div>
  
  <div class="ace-line ace-line old-record-id-O8SUd6sQsoKkOKxQLJFcA6ThnMb">&nbsp;&nbsp;3) 本公司從第三方交易所抓取的數字代幣市場交易行情等信息的及時性、準確性、完整性、可靠性做出保證；</div>
  
  <div class="ace-line ace-line old-record-id-CyGadiI6So4GkyxUz7Xcz3Dmnuf">&nbsp;&nbsp;4) 您在IDChats labs上的交易各方會及時履行其在與您達成的交易協議中各項義務。</div>
  
  <div class="ace-line ace-line old-record-id-HMK8dKWI6oOswsxuOTbcMv2hnDg">&nbsp;&nbsp;5) 在任何情況下，本公司對本協議所承擔的違約賠償責任總額不超過 A. 0.1個以太幣；或 B. 新加坡元100元，以較高的爲準。</div>
  
  <div class="ace-line ace-line old-record-id-PiuYdGA8Wo0iqoxusOGch7lKnHh">&nbsp;&nbsp;6) 您理解IDChats labs僅作爲用戶管理數字代幣、顯示交易信息的工具，本公司不提供法律、稅務或投資建議等服務。您應當自行向法律、稅務、投資方面的專業人士尋求建議，且您在使用我們服務過程中所遭受的投資損失、數據損失等，本公司概不負責。</div>
  
  <div class="ace-line ace-line old-record-id-MWyCdOEUUoiMQcxmIA2cIsz8nJf">&nbsp;&nbsp;7) 您理解根據有關政策法規的要求，我們可能不時更改我們的用戶准入標準，限定向某一特定羣體提供服務的範圍和方式等。</div>
  
  <div class="ace-line ace-line old-record-id-McUodak4SoOiG8xKUmrc5dvVnpg">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-W6EkdicQKok6uaxu6KwcUnBqnHd">&nbsp;&nbsp;十二、 完整協議</div>
  
  <div class="ace-line ace-line old-record-id-KAUWdGM86oa2mKxaQ12coPLWndg">&nbsp;&nbsp;1) 本協議由《IDChats labs服務協議》、《IDChats labs隱私政策》及本公司不時公佈的各項規則組成。</div>
  
  <div class="ace-line ace-line old-record-id-R6EQdOS8IoWIwOxiMeTc7wQ1nkb">&nbsp;&nbsp;2) 本協議部分內容被有管轄權的法院認定爲違反或無效的，不因此影響其他內容的效力。</div>
  
  <div class="ace-line ace-line old-record-id-Kuu8dyk8WoyCiKx2rLRcMbwenVd">&nbsp;&nbsp;3) 本協議的任何譯文版本僅爲方便用戶而提供，無意對本協議的條款進行修改。如果本協議的中文版本與非中文版本之間存在衝突，應以中文版本爲準。</div>
  
  <div class="ace-line ace-line old-record-id-FomcdSusOo8066xWaL7c7fZinDc">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-TW0AdgW6SoQm8QxAHi6cbwaKnxd">&nbsp;&nbsp;十三、 知識產權保護</div>
  
  <div class="ace-line ace-line old-record-id-XUSmdkyIaogm0UxiaoFcROCcnZc">&nbsp;&nbsp;IDChats labs系本公司開發並擁有知識產權的應用程序。 IDChats labs中顯示的任何內容（包括本協議、公告、文章、視頻、音頻、圖片、檔案、資訊、資料、商標或標識）的知識產權歸本公司或第三方權利人所有。用戶僅可爲持有和管理數字代幣之目的使用IDChats labs應用程序及其中的內容。未經本公司或第三方權利人的事先書面同意，任何人不得擅自使用、修改、反向編譯、複製、公開傳播、改變、散佈、發行或公開發表上述應用程序及內容。</div>
  
  <div class="ace-line ace-line old-record-id-ZYCedqUgUoEmC2xcDA9cPVlJnge">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-YUYudOK6so8EMExYHewc6C3HnCe">&nbsp;&nbsp;十四、 法律適用與爭議解決</div>
  
  <div class="ace-line ace-line old-record-id-IWqIdEy4Go6CgAxTS68c03pynec">&nbsp;&nbsp;1) 本協議及其修訂版之效力、解釋、變更、執行與爭議解決均適用本公司共和國法律，如無相關法律規定，則應當適用國際商業慣例和（或）行業慣例。</div>
  
  <div class="ace-line ace-line old-record-id-CMYEd6YQMoKok2xs3h1cQkbqnwd">&nbsp;&nbsp;2) 若您和本公司之間發生任何糾紛或爭議，首先應友好協商解決，協商不成的，任何一方可提交本公司所在地有管轄權的人民法院管轄。</div>
  
  <div class="ace-line ace-line old-record-id-VeOsd8QCWoesc0xcrgBcA9Cin0f">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-K8A6dWUMgooqMixWeKacFH8Qnae">&nbsp;&nbsp;十五、 其他</div>
  
  <div class="ace-line ace-line old-record-id-CiG4dyIKOomqYexEzZHcHEienie">&nbsp;&nbsp;1) 如您是新加坡以外用戶，您需全面瞭解並遵守您所在司法轄區與使用本公司服務所有相關法律、法規及規則。</div>
  
  <div class="ace-line ace-line old-record-id-D4G4dAmMgoeoQyx42V9cjXySnYd">&nbsp;&nbsp;2) 您在使用本公司服務過程中，如遇到任何問題，您可以通過在IDChats labs提交反饋等方式聯繫我們。</div>
  
  <div class="ace-line ace-line old-record-id-Q8Ssd0yC6o8cSWx4MPhc6r9XnAd">&nbsp;&nbsp;3) 您可以在IDChats labs中查看本協議。 本公司鼓勵您在每次訪問IDChats labs時都查閱本公司的服務協議。</div>
  
  <div class="ace-line ace-line old-record-id-Au0sdYq6qoEcyYxWszTc1JF2nFb">&nbsp;</div>
  
  <div class="ace-line ace-line old-record-id-XOQkdsW0kowkCUxwpUNcgBVsncd">&nbsp;&nbsp;本協議未盡事宜，您需遵守本公司不時更新的公告及相關規則。</div>
  </div>
  
  <ul class="ace-line ace-line old-record-id-S4Kidqy4Gowa2Uxm0B1cFBWtnNc" style="white-space:pre;">
  </ul>
  </div>
  </body>
  </html>
  
`;
export default UserAgreement;