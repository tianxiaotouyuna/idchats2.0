import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Image, Text} from "react-native";
import styles from "@/styles/pages/chatList/styles";
import { pxToDp } from "@/utils/system";
import useInitScreen from "@/hooks/useInitScreen";
import { useHeaderHeight } from "@react-navigation/stack";
import IDBitTabBg from "@/components/IDBitTabBg/IDBitTabBg";
import { TextInput } from "react-native-gesture-handler";
import { t } from "i18next";
import { Navigate } from "@/utils/index";
import MultipleInpput from "@/components/MultipleInpput/MultipleInpput";
import IDBitBtn from "@/components/IDBitBtn/IDBitBtn";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UIELEMENTS } from "@/constants/index";
import PressableSlop from "@/components/PressableSlop/PressableSlop";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from "react-native-modal/dist/modal";
import CommunityAlert, { AlertStyle } from "@/components/NFTAlert/CommunityAlert/CommunityAlert";
const CreateIDO22: FunctionComponent = (props) => {
    const headerHeight = useHeaderHeight();
    const [startTime, setstartTime] = useState('请选择开始时间');
  const [showAlert, setshowAlert] = useState(false);
  const [deleteCommunity, setdeleteCommunity] = useState(false);
  const [endTime, setendTime] = useState('请选择结束时间');
    const [showPop, setshowPop] = useState(false);
    const [calendarTitle, setcalendarTitle] = useState('');
    const [description, setdescription] = useState('');
    useInitScreen({
        navigationOptions: {
            headerTransparent: true,
            headerShown: true,
            headerTitle: t('community.create9'),
            headerTintColor: 'white',
        },
        statusBar: {
            backgroundColor: 'transparent',
            barStyle: 'light-content',
        },
    });
    useEffect(() => {
        LocaleConfig.locales['zh-Hans'] = {
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
            amDesignator: '上午',
            pmDesignator: '下午'
        };
        
        LocaleConfig.defaultLocale = 'zh-Hans';
    }, [])

    return (
        <View style={[styles.container, { paddingHorizontal: pxToDp(30), paddingTop: headerHeight }]}>


            <View style={{ marginTop: pxToDp(28) }}>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingHorizontal: pxToDp(16) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                        <Text style={{ color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.input1')}</Text>
                        <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput style={{ height: 40 }} placeholderTextColor={'#575C64'} placeholder={t('community.input2')}></TextInput>
                        <PressableSlop style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Text style={{ color: '#FFFFFF', fontSize: pxToDp(26) }}>{t('community.select1')}</Text>
                            <Image style={{ width: pxToDp(16), height: pxToDp(10), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/community/sanjiao.png')} />
                        </PressableSlop>
                    </View>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.project2')}</Text>
                    <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(28) }}>*</Text>
                </View>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingLeft: pxToDp(16) }}>
                    <TextInput style={{ height: 40 }} placeholderTextColor={'#575C64'} placeholder={t('community.enter5')}></TextInput>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(28), marginBottom: pxToDp(10) }}>{t('community.project3')}</Text>
                </View>
                <MultipleInpput containerStyle={{ height: pxToDp(156) }} horderStyle={{ paddingHorizontal: pxToDp(16), height: pxToDp(156) }} placeHolder={t('community.enter6')} length={150} onChangeText={(text: string) => setdescription(text)}></MultipleInpput>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingHorizontal: pxToDp(16), backgroundColor: startTime != '请选择开始时间' ? '#464E5B' : UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(68) }}>
                            <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(24), marginBottom: pxToDp(10) }}>{t('community.start')}</Text>
                            <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(24) }}>*</Text>
                        </View>
                        <Image style={{ width: pxToDp(32), height: pxToDp(32), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/community/icon_riqi.png')} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: pxToDp(68) }}>
                        <Text style={{ marginLeft: pxToDp(10), color: startTime != '请选择开始时间' ? '#fff' : '#575C64', fontSize: pxToDp(24) }}>{startTime}</Text>
                    </View>
                </IDBitTabBg>
            </View>

            <View style={{ marginTop: pxToDp(28) }}>
                <IDBitTabBg style={{ paddingVertical: pxToDp(0), borderRadius: pxToDp(8), paddingHorizontal: pxToDp(16), backgroundColor: startTime != '请选择开始时间' ? '#464E5B' : UIELEMENTS.DEFAULT_ITEM_BACKGROUND_COLOR }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: pxToDp(68) }}>
                            <Text style={{ marginLeft: pxToDp(10), color: '#FFFFFF', fontSize: pxToDp(24), marginBottom: pxToDp(10) }}>{t('community.start')}</Text>
                            <Text style={{ marginLeft: pxToDp(10), color: '#D5F713', fontSize: pxToDp(24) }}>*</Text>
                        </View>
                        <Image style={{ width: pxToDp(32), height: pxToDp(32), marginLeft: pxToDp(4) }} source={require('@/resources/idbt/community/icon_riqi.png')} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: pxToDp(68) }}>
                        <PressableSlop onPress={() => setshowPop(true)}>
                            <Text style={{ marginLeft: pxToDp(10), color: endTime != '请选择结束时间' ? '#fff' : '#575C64', fontSize: pxToDp(24) }}>{endTime}</Text>
                        </PressableSlop>
                    </View>
                </IDBitTabBg>
            </View>
            <Modal isVisible={showPop} style={styles.bottomModal}
                hideModalContentWhileAnimating={true}
                useNativeDriverForBackdrop={true}
                animationOutTiming={1000}
            >
                <Calendar
                key={'en'}
                    // initialDate={'initialDate c x'} 
                    markingType={'multi-period'}
                    markedDates={{
                        '2023-01-31': { selected: true, marked: true, selectedColor: 'blue' },
                        '2012-05-17': { marked: true },
                        '2012-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                        '2012-05-19': { disabled: true, disableTouchEvent: true }
                    }}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    // minDate={'2012-05-10'}
                    // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    // maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={day => {
                        console.log('selected day', day);
                        setendTime(day?.dateString)
                        setcalendarTitle(day?.dateString)
                        // setshowPop(false)
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={day => {
                        console.log('selected day', day);
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM DD'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={month => {
                        console.log('month changed', month);
                    }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={false}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    // renderArrow={direction => <Arrow />}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={false}
                    // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={false}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={false}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={subtractMonth => subtractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Disable left arrow. Default = false
                    disableArrowLeft={false}
                    // Disable right arrow. Default = false
                    disableArrowRight={false}
                    // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                    disableAllTouchEventsForDisabledDays={false}
                    // Replace default month and year title with custom one. the function receive a date as parameter
                    renderHeader={date => {
                        return <PressableSlop onPress={() => setshowPop(false)}>
                            <Text>{calendarTitle}</Text>
                        </PressableSlop>
                        /*Return JSX*/
                    }}
                    // Enable the option to swipe between months. Default = false
                    enableSwipeMonths={true}
                />
            </Modal>
      <CommunityAlert alertStyle={AlertStyle.CREATE_SUCCES_STYLE} isVisible={showAlert} onCanclePress={() => setshowAlert(false)} onSurePress={deleteCommunity}></CommunityAlert>
            <IDBitBtn text={t('community.create4')}
                containerStyle={{ position: 'absolute', bottom: useSafeAreaInsets().bottom + pxToDp(60), marginTop: pxToDp(40), height: pxToDp(88), paddingHorizontal: pxToDp(60) - UIELEMENTS.PADDING_HORIZONTAL }}
                onPress={() => { Navigate.navigate('CreateIDO2') }}
            />
        </View>
    );
};
export default CreateIDO22;


