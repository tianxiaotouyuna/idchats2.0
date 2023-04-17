import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { View, Image, Text, Alert, Modal, Platform, ScrollView } from "react-native";

import styles from "@/styles/pages/chatList/styles";
import { isIOS, pxToDp, pxToSp, readFile, toast } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useTranslation } from 'react-i18next'
import { ReduxToken, UIELEMENTS } from "@/constants/index";
import { useHeaderHeight } from "@react-navigation/stack";
import WebView from "react-native-webview";
import useRedux from "@/hooks/useRedux";

const CommunityRules: FunctionComponent = (props) => {
  const headerHeight = useHeaderHeight();
  const { laungueCode } = useRedux();
  // 拿到i18n
  const { i18n, t } = useTranslation();
  useInitScreen({
    navigationOptions: {
      headerTransparent: true,
      headerShown: true,
      title: t('community.community1'),
      headerTintColor: 'white',
    },
    statusBar: {
      backgroundColor: 'transparent',
      barStyle: 'light-content',
    },
  });
  const renderTw_CN = () => (
    <ScrollView style={{ flex: 1 }}>
      <Text style={{ color: '#fff', fontSize: pxToSp(34), fontWeight: 'bold' }}>
        公開頻道維護指南
      </Text>
      <Text style={{ color: '#fff', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
        作爲公開頻道的所有者，您和您的管理員團隊有義務且有責任幫助用戶創建和諧的公開頻道使用環境。以下是您的公開頻道需要遵守的準則：
      </Text>
      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - 準確且簡介地描述您的公開頻道。
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          幫助潛在用戶瞭解他們爲何要加入此頻道，通過簡短的介紹讓用戶明白該頻道的用途。
        </Text>
      </Text>
      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - 頻道規則。
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          明確指出頻道內允許和不允許的行爲，有效的規則制定能夠鼓勵用戶進行互動，同時對不允許的行爲給予禁止。
        </Text>
      </Text>

      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - 管理員團隊。
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          設置管理員可以幫助您確保頻道中沒有發生任何違反規則的行爲，並能夠鼓勵您的成員積極參與建設，建立可信任的管理員團隊能夠幫助您有效地管理頻道。
        </Text>
      </Text>

      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - 營造健康積極的環境。
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          用戶應該在您的頻道中感受到歡迎，同時用戶肯定也希望在您的頻道內共同度過歡樂的時光，能夠在頻道內分享興趣的事物、參加社區活動和建立友好空間。因此，不得發佈任何低俗惡劣、騷擾他人或其他貶損他人的內容。
        </Text>
      </Text>

      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - 遵守IDChats公共頻道準則和服務條款。
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          您的頻道如果被報告有任何違反IDChats準則及服務條款的行爲，您和您的管理員團隊應該及時且準確地將該行爲上報IDChats團隊。一旦被發現有助長違反IDChats 社區準則和服務條款的公開頻道，都將會受到進一步的處理。
        </Text>
      </Text>
      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
        如果您的公開頻道被發現違反以上準則，您的公開頻道可能會無法繼續使用，並且您可能會失去在IDChats再次創建頻道的權力。爲了使您的公開頻道長期且良性的維持運行，您的公開頻道必須遵守公以上準則。
      </Text>
      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        請注意，任何違反相關當地政府條例與管制政策的公開頻道都將被立即停用，請合理運用IDChats提供的平臺。
      </Text>

    </ScrollView>
  )

  const renderTw_EN = () => (
    <ScrollView style={{ flex: 1 }}>
      <Text style={{ color: '#fff', fontSize: pxToSp(34), fontWeight: 'bold' }}>
        Open Channel Maintenance Guide
      </Text>
      <Text style={{ color: '#fff', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
        As the owner of the public channel, you and your team of administrators have an obligation and responsibility to help users create a harmonious environment for using the public channel. Here are the guidelines to follow for your public channel:
      </Text>
      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - Describe your public channel accurately and briefly.
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          Help would-be users understand why they want to join the channel, and let users understand what the channel is for with a short introduction.
        </Text>
      </Text>
      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - Channel rules.
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          Clearly identify what is and is not allowed in a channel, and effective rulemaking encourages user interaction while prohibiting what is not allowed.
        </Text>
      </Text>

      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - A team of administrators.
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          Setting up an administrator can help you ensure that no rule violations have occurred in your channel and can encourage your members to actively participate in building, establishing a team of trusted administrators can help you manage your channel effectively.
        </Text>
      </Text>

      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - Create a healthy and positive environment.
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          Users should feel welcome in your channel, and they definitely want to spend time together in your channel, sharing interests, participating in community events and creating friendly spaces. Therefore, no vulgar, Harassment or other derogatory content should be posted.
        </Text>
      </Text>

      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        - Comply with the IDChats Public Channel Guidelines and Terms of Service.
        <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
          If any violation of the IDChats Guidelines and Terms of Service is reported on your channel, you and your administrator team should promptly and accurately report the violation to the IDChats team. Any public channel found to be contributing to violations of the IDChats Community Guidelines and Terms of Service will be subject to further action.
        </Text>
      </Text>
      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(28), marginTop: pxToSp(20) }}>
        If your public channel is found to violate the above guidelines, your public channel may no longer be available and you may lose the right to create a channel again on IDChats. In order for your public channel to maintain long-term and benign operation, your public channel must comply with the public guidelines.
      </Text>
      <Text style={{ color: '#DEDEDE', fontSize: pxToSp(30), fontWeight: 'bold', marginTop: pxToSp(20) }}>
        Please note that any public channels that violate relevant local government regulations and control policies will be immediately disabled, please use the platform provided by IDChats reasonably.
      </Text>

    </ScrollView>
  )
  return (
    <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: useHeaderHeight() + UIELEMENTS.PADDING_TOP }]}>
      {laungueCode ? renderTw_EN() : renderTw_CN()}
      {/* <WebView
        style={{ width: '100%' }}

        originWhitelist={['*']}

        allowFileAccess={true}

        // source={{ uri: getPath() }}
        source={{ html: laungueCode?HTML2:HTML }}
        javaScriptEnabled={true}

        decelerationRate='normal'

        scrollEnabled={true}

        useWebKit={true}

        mediaPlaybackRequiresUserAction={true}

        mixedContentMode='compatibility'

        allowingReadAccessToURL='*'

      /> */}
    </View>
  );
}

const HTML2 = `
<meta name="viewport" content="initial-scale=1.0" />
<html>
<head>
	<title></title>
</head>
<body>
<div data-docx-has-block-data="false" data-page-id="ZOa5d3tIsoiaTsxulWzcGcqinoc" style="caret-color: rgb(0, 0, 0); text-size-adjust: auto;">
<h1 class="heading-1 ace-line old-record-id-VO8GdEgSaocckUxyCc2cs305nHe" style="white-space: pre;"><span style="color: rgb(31, 35, 41);">Open Channel </span><span style="color: rgb(31, 35, 41);">Maintenance</span><span style="color: rgb(31, 35, 41);"> Guide</span></h1>

<div class="ace-line ace-line old-record-id-QEWAdYWGsoWEgIxwSfkcNMb1ntb" style="white-space: pre;"><span style="color: rgb(31, 35, 41);">As the owner of the public channel, you and your team of administrators have an obligation and responsibility to help users create a harmonious environment for using the public channel. Here are the guidelines to follow for your public channel:</span></div>

<div class="ace-line ace-line old-record-id-L4Syds8SIo6MicxgtQTcy8HGnXe" style="white-space: pre;"><span style="color: rgb(31, 35, 41);"><strong>- Describe your public channel accurately and briefly. </strong></span><span style="color: rgb(31, 35, 41);">Help would-be users understand why they want to join the channel, and let users understand what the channel is for with a short introduction.</span></div>

<div class="ace-line ace-line old-record-id-EUKedaOq4ok64SxuaJpcdeycnWd" style="white-space: pre;"><span style="color: rgb(31, 35, 41);"><strong>- Channel rules. </strong></span><span style="color: rgb(31, 35, 41);">Clearly identify what is and is not allowed in a channel, and effective rulemaking encourages user interaction while prohibiting what is not allowed.</span></div>

<div class="ace-line ace-line old-record-id-MY4udA6oqoaUQOx4kHCcZzTAnae" style="white-space: pre;"><span style="color: rgb(31, 35, 41);"><strong>- A team of administrators. </strong></span><span style="color: rgb(31, 35, 41);">Setting up an administrator can help you ensure that no rule violations have occurred in your channel and can encourage your members to actively participate in building, establishing a team of trusted administrators can help you manage your channel effectively.</span></div>

<div class="ace-line ace-line old-record-id-OAQIde4q8osSM6xGqaOcG44an2f" style="white-space: pre;"><span style="color: rgb(31, 35, 41);"><strong>- Create a healthy and positive environment. </strong></span><span style="color: rgb(31, 35, 41);">Users should feel welcome in your channel, and they definitely want to spend time together in your channel, sharing interests, participating in community events and creating friendly spaces. Therefore, no vulgar, Harassment or other derogatory content should be posted.</span></div>

<div class="ace-line ace-line old-record-id-HAU8dQguWoSmoaxi2b8ceuotnAh" style="white-space: pre;"><span style="color: rgb(31, 35, 41);"><strong>- Comply with the IDChats Public Channel Guidelines and Terms of Service. </strong></span><span style="color: rgb(31, 35, 41);">If any violation of the IDChats Guidelines and Terms of Service is reported on your channel, you and your administrator team should promptly and accurately report the violation to the IDChats team. Any public channel found to be contributing to violations of the IDChats Community Guidelines and Terms of Service will be subject to further action.</span></div>

<div class="ace-line ace-line old-record-id-IAsmd66kuoEScgxxOLvc0PuDnsT" style="white-space: pre;"><span style="color: rgb(31, 35, 41);">If your public channel is found to violate the above guidelines, your public channel may no longer be available and you may lose the right to create a channel again on IDChats. In order for your public channel to maintain long-term and benign operation, your public channel must comply with the public guidelines.</span></div>

<div class="ace-line ace-line old-record-id-BwuUdcK6AoIUMqxmAUGcUFcnnQh" style="white-space: pre;"><span style="color: rgb(31, 35, 41);"><strong>Please</strong></span><span style="color: rgb(31, 35, 41);"><strong> note that any public channels that violate relevant local government regulations and control policies will be immediately disabled, please use the platform provided by IDChats reasonably.</strong></span></div>
</div>
</body>
</html>
`;

const HTML = `<meta name="viewport" content="initial-scale=1.0" />
<html>
<head>
	<title></title>
</head>
<body>
<div data-docx-has-block-data="false" data-page-id="ZOa5d3tIsoiaTsxulWzcGcqinoc" style="caret-color: rgb(0, 0, 0); text-size-adjust: auto;">
<div data-docx-has-block-data="false" data-page-id="VJWid0NhJoDJF0x1myrcBSctnTb" style="caret-color: rgb(0, 0, 0); text-size-adjust: auto;">
<div class="ace-line ace-line old-record-id-VJWid0NhJoDJF0x1myrcBSctnTb" style="white-space: pre;">
<div data-docx-has-block-data="false" data-page-id="VJWid0NhJoDJF0x1myrcBSctnTb" style="caret-color: rgb(0, 0, 0); text-size-adjust: auto;">
<div class="ace-line ace-line old-record-id-VJWid0NhJoDJF0x1myrcBSctnTb" style="white-space: pre;">公開頻道維護指南</div>

<h1 class="heading-1 ace-line old-record-id-CmG0di4IsowQ4kxC2w5cWDo0n3f" style="white-space: pre; text-align: center;">作爲公開頻道的所有者，您和您的管理員團隊有義務且有責任幫助用戶創建和諧的公開頻道使用環境。以下是您的公開頻道需要遵守的準則：</h1>

<div class="ace-line ace-line old-record-id-SqIsdE4GooiEG0x5ZYUcViSBnFz" style="white-space: pre;"><strong>- 準確且簡介地描述您的公開頻道。</strong>幫助潛在用戶瞭解他們爲何要加入此頻道，通過簡短的介紹讓用戶明白該頻道的用途。</div>

<div class="ace-line ace-line old-record-id-LAaadeKoAoaO8YxwVavclYi4nBg" style="white-space: pre;"><strong>- 頻道規則。</strong>明確指出頻道內允許和不允許的行爲，有效的規則制定能夠鼓勵用戶進行互動，同時對不允許的行爲給予禁止。</div>

<div class="ace-line ace-line old-record-id-MU4gdiEyUoYm6UxaCQ7cuTt2ndd" style="white-space: pre;"><strong>- 管理員團隊。</strong>設置管理員可以幫助您確保頻道中沒有發生任何違反規則的行爲，並能夠鼓勵您的成員積極參與建設，建立可信任的管理員團隊能夠幫助您有效地管理頻道。</div>

<div class="ace-line ace-line old-record-id-Kw06dgIYSoEScexMHbTckBJ7n5c" style="white-space: pre;"><strong>- 營造健康積極的環境。</strong>用戶應該在您的頻道中感受到歡迎，同時用戶肯定也希望在您的頻道內共同度過歡樂的時光，能夠在頻道內分享興趣的事物、參加社區活動和建立友好空間。因此，不得發佈任何低俗惡劣、騷擾他人或其他貶損他人的內容。</div>

<div class="ace-line ace-line old-record-id-MWqMd4cgIoYe0QxuKhCcpsYtnce" style="white-space: pre;"><strong>- 遵守IDChats公共頻道準則和服務條款。</strong>您的頻道如果被報告有任何違反IDChats準則及服務條款的行爲，您和您的管理員團隊應該及時且準確地將該行爲上報IDChats團隊。一旦被發現有助長違反IDChats&nbsp;社區準則和服務條款的公開頻道，都將會受到進一步的處理。</div>

<div class="ace-line ace-line old-record-id-JYSKdqiYwoEwYexspfXcGYvUn4d" style="white-space: pre;">如果您的公開頻道被發現違反以上準則，您的公開頻道可能會無法繼續使用，並且您可能會失去在IDChats再次創建頻道的權力。爲了使您的公開頻道長期且良性的維持運行，您的公開頻道必須遵守公以上準則。</div>

<div class="ace-line ace-line old-record-id-Q4aqdUiecoc8yKxwBnwc1fmnn9b" style="white-space: pre;"><strong>請注意，任何違反相關當地政府條例與管制政策的公開頻道都將被立即停用，請合理運用IDChats提供的平臺。</strong></div>
</div>
</div>
</div>
</div>
</body>
</html>

`;
export default CommunityRules;