import { pxToDp, pxToSp, windowHeight } from '@/utils/system';
import { assign, clone, merge } from 'lodash';
import React, { Component, ReactNode } from 'react'
import { useTranslation } from 'react-i18next';
import { ColorValue } from 'react-native';
import { StyleSheet, View, FlatList, FlatListProps, ListRenderItemInfo, ListRenderItem, StyleProp, ViewStyle, Alert, Image, Text, RefreshControl } from 'react-native'

export interface GDataListProps {
    style?: StyleProp<ViewStyle>
    requestParams?: { [key: string]: any }
    defaultPageSize?: number
    keyExtractor?: (item: any, index: number) => string;
    requestBeforeFun?: () => boolean
    // requestMethod: (params: object) => Promise<{ list: any[], isListEnd: boolean, total: number }>
    requestMethod: (params: object) => Promise<any>
    // requestMethod: (params: object) => Promise<{ data: any[], msg: string, code: number }>
    renderItem: ListRenderItem<any> | null | undefined
    getItemLayout?: (data: any, index: number,) => { length: number; offset: number; index: number };
    handleDataList?: (list: any[]) => Promise<any[]>;
    numColumns?: number
    columnWrapperStyle?: StyleProp<ViewStyle>
    contentContainerStyle?: StyleProp<ViewStyle>
    ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null
    ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null
    ItemSeparatorComponent?: React.ComponentType<any> | null
    [key: string]: any
    onScroll?: (e:any) => void;
    refreshControlColor?: ColorValue
}

interface GDataListState {
    dataList: any[]
    pageNumber: number
    isListEnd: boolean
    isRefreshing: boolean
    isPageLoading: boolean
    total: number
    currentCursor: string
}
export enum WHERELIST {
    COLLECTION_CATEGORY_STYLE = 1, //合集列表列表
    Local_STYLE = 2, //本地数据列表
    DEFAULT_STYLE = 3, //本地数据列表
    DEFAULT_STYLE_BOUBLE_COLUNM = 4, //本地数据列表
}
export default class GDataList extends Component<GDataListProps, GDataListState> {
    private _adjustParams = {};

    static defaultProps: GDataListProps = {
        requestBeforeFun: () => true,
        defaultPageSize: 10,
        requestParams: {},
        requestMethod: ({ }) => Promise.resolve({ data: [], msg: '', code: 0, goods: [] }),
        renderItem: undefined,
        numColumns: undefined,
        keyExtractor: (item, index) => `${item?.id}_${index}`,
    }

    constructor(props: GDataListProps) {
        super(props);
        this.state = {
            dataList: [],
            pageNumber: 1,
            isListEnd: false,
            isRefreshing: false,
            isPageLoading: true,
            total: 0,
            currentCursor: '',
    }
    }

    $setState = (state: object) => {
        return new Promise<void>((resolve) => {
            this.setState(state, () => resolve());
        })
    }

    componentDidMount = async () => {
        await this._getList();
        await this.$setState({ isPageLoading: false })
    }

    componentWillUnmount = () => {

    }

    getDataList = () => this.state.dataList;
    setDataList = (dataList: any[]) => {
        this.$setState({ dataList });
    }
    getIsListEnd = () => this.state.isListEnd;
    setIsListEnd = (isListEnd: boolean) => this.$setState({ isListEnd });
    getTotal = () => this.state.total;
    getPageNumber = () => this.state.pageNumber;
    setPageNumber = (pageNumber: number) => this.$setState({ pageNumber });
    refreshData = () => this._onRefresh();

    private _getList = async () => {
    let { pageNumber, dataList } = this.state;
        let { defaultPageSize=10, requestMethod, requestParams, requestBeforeFun, handleDataList,whereList=WHERELIST.DEFAULT_STYLE } = this.props;
        if (!(requestBeforeFun?.() ?? true)) return Promise.resolve(true);
        await this.$setState({ isRefreshing: true });
        let data_handler;
        
         if (whereList == WHERELIST.DEFAULT_STYLE_BOUBLE_COLUNM) {
            const params = assign({}, requestParams?.params, { pageNum: pageNumber, pageSize: defaultPageSize });
            console.log('newListnewList====' + JSON.stringify(requestParams?.params))
            const pathAndParams = { path: requestParams?.path, params: params }
            this._adjustParams = pathAndParams;
            const { rows ,realCount} = await requestMethod(pathAndParams);
            data_handler = rows;
                if (realCount < defaultPageSize) {
                this.setIsListEnd(true)
            }
        }
        else{
            const params_ = assign({}, requestParams?.params, { page: pageNumber, limit: defaultPageSize });
            const params_data = { path: requestParams?.path, params: params_ }
            this._adjustParams = params_data;
            const {list}  = await requestMethod(params_data);
            data_handler = list;
            if (list.length < defaultPageSize) this.setIsListEnd(true)
        }
        const newList = !!handleDataList ? await handleDataList(data_handler) : data_handler;
        dataList = pageNumber === 1 ? newList : dataList.concat(newList);

        console.log('newListnewList====' + JSON.stringify(newList?.length))
        await this.$setState({ dataList, pageNumber: ++pageNumber, isRefreshing: false });
        return Promise.resolve(true);
    }

    private _onRefresh = async () => {
    await this.$setState({ pageNumber: 1, isListEnd: false, currentCursor: '' });
        await this._getList();
    }
    public cleanList = async () => {
        await this.$setState({ pageNumber: 1, isListEnd: false, currentCursor: '', newList: [] });
    }
    // 上拉加载

    private _onEndReached = async () => {
    const { isListEnd, isRefreshing } = this.state;
        if (isListEnd || isRefreshing) return
    await this._getList();

    }
    private _emptyView = () => {
    const { i18n ,t} = useTranslation();
    return (
            <View style={{ alignItems: "center" ,justifyContent:'center'}}>
                <Image
                    style={{ width: pxToDp(238), height: pxToDp(200) }}
                    source={require("@/resources/idbt/my/noData_my.png")}
                    resizeMode={'stretch'}
                />
                <Text style={{ color: '#ABABAB' ,fontSize:pxToSp(26),marginTop:pxToDp(10)}}>{i18n.t('common.nodata')}</Text>
            </View>
        )
    }

    render = () => {
        const { dataList, isRefreshing, isPageLoading } = this.state;
        const { style, keyExtractor, columnWrapperStyle, onScroll, contentContainerStyle, numColumns, getItemLayout, renderItem, ListEmptyComponent = this._emptyView, ListHeaderComponent, ListFooterComponent, ItemSeparatorComponent,refreshControlColor='#000' ,} = this.props;
        return (
            <View style={[styles.containerStyle, style]}>
                <FlatList
                indicatorStyle={'white'}
                    style={styles.scrollContainerStyle}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="interactive"
                    contentContainerStyle={
                        dataList?.length === 0 && { flex: 1, alignItems: 'center', justifyContent: 'center' }
                    }
                    // 默认
                    keyExtractor={keyExtractor}
                    data={dataList}
                    renderItem={renderItem}
                    getItemLayout={getItemLayout}
                    onEndReachedThreshold={0.01}
                    onEndReached={this._onEndReached}
                    onScroll={(e:any) => console.log(e.nativeEvent.velocity?.x)}
                    ListEmptyComponent={isPageLoading ? undefined : ListEmptyComponent}
                    ListHeaderComponent={ListHeaderComponent}
                    ListFooterComponent={ListFooterComponent}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    numColumns={numColumns}
                    columnWrapperStyle={columnWrapperStyle}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            tintColor={refreshControlColor}
                            titleColor={refreshControlColor}
                         />
                      }

                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
    },
    scrollContainerStyle: {
        flex: 1,
    },
})
