import styles from "./ido.module.less";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Col, Progress, Row, Spin } from "antd";
import { useTranslation } from "react-i18next";
import Icon from "@ant-design/icons";
import { ReactComponent as twitter_icon } from "@/assets/images/icons/icon_Twitter_jihuo.svg";
import { ReactComponent as website_icon } from "@/assets/images/icons/icon_website_active.svg";
import Empty from "./Empty";
import { toFormatBigNumber } from "../../utils/format";
import { BigNumber } from "bignumber.js";
import { useNavigate, useParams } from "react-router-dom";
import { formatNumber, handleFixIpfs, handleGetImageUrl, sameEVMAddress } from "../../utils/common";
import CountDownStatus, { Status } from "./components/CountDownStatus";
import { GroupItem } from "@/utils/open_im_sdk/types";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getChainInfoByID, useCurrentChain } from "@/hooks/useNetwork";

type InfoType = {
  value: string;
  label: string;
};
export type LockType = {
  tokenA: string;
  tokenB: string;
  owner: string;
  lockPeriod: number;
  startTime: number;
  endTime: number;
  inTokenCapacity: string;
  inTokenAmount: string;
  outTokenCapacity: string;
  outTokenSupply: string;
  limit: string;
  logo: string;
  name: string;
  proIntroduction: string;
  tLink: string;
  oLink: string;
  projectText: string;
  projectType: string;
  symbolA: string;
  symbolB: string;
  tokenNameA: string;
  tokenNameB: string;
  decimalsA: string;
  decimalsB: string;
  totalSupplyA: string;
  totalSupplyB: string;
  exchange: string;
  maxExchange: string;
  timeList: number[];
  decimalA: string;
  decimalB: string;
};
export interface ProjectType extends LockType {
  userAmount: string;
  sum: string;
  index: string;
  id: number;
  projectText: string;
  data: LockType;
  num: string;
  address: string;
  msg: string;
  baseInfo: string;
  groupid: string;
  chainid: string;
  person: string;
}

export interface JoinProjectType {
  merchant: string;
  index: string;
  initAmount: string;
  rewardAmount: string;
  iD: number;
  chainId: number;
}

type ItemProps = {
  item: ProjectType;
};
const IdoItemTop = (props: ItemProps) => {
  const { t } = useTranslation();
  const { item } = props;
  const [status, setStatus] = useState(Status.UN_START);
  const sellAmount = useMemo(() => {
    return toFormatBigNumber(item?.sum || 0, Number(item?.data?.decimalsB) || 0);
  }, [item]);

  const isSellOut = (item: ProjectType) => {
    return new BigNumber(item.data.inTokenCapacity || 0)
      .div(10 ** (Number(item.data?.decimalsB) || 0))
      .minus(sellAmount)
      .isZero();
  };
  useEffect(() => {
    if (isSellOut(item)) {
      setStatus(Status.SELL_OUT);
    } else if (item.data.outTokenCapacity === "0") {
      setStatus(Status.ENDED);
    }
  }, [item]);
  return (
    <div className={styles.ido_container_item_top}>
      <img className={styles.ido_container_item_top_img} alt="" src={handleGetImageUrl(`ipfs://${item.data.logo}`)} />
      <div className={styles.ido_container_item_top_info}>
        <div className={styles.ido_container_item_top_info_title}>{item.data.name}</div>
        <div className={styles.ido_container_item_top_info_icon}>
          {item.data?.tLink && <Icon onClick={() => window.open(item.data?.tLink)} component={twitter_icon}></Icon>}
          {item.data?.oLink && <Icon onClick={() => window.open(item.data?.oLink)} component={website_icon}></Icon>}
          {item.chainid && <img src={getChainInfoByID(Number(item.chainid || 0))?.icon} />}
        </div>
        <div className={styles.ido_container_item_top_info_status}>
          <span>{t(status)}</span>
          <span>{item.data?.symbolA}</span>
          {/*<span>{item.data?.projectType === "1" ? t("ido.directionalIDO") : t("ido.unidirectionalIDO")}</span>*/}
        </div>
      </div>
      <div className={styles.ido_container_item_top_countdown}>
        <div className={styles.ido_container_item_top_countdown_title}>{t(status)}</div>
        <div className={styles.ido_container_item_top_countdown_count}>
          <CountDownStatus setStatus={setStatus} startTime={item.data.startTime} endTime={item.data.endTime} status={status}></CountDownStatus>
        </div>
      </div>
    </div>
  );
};
const IdoItemBottom = (props: ItemProps) => {
  const { t } = useTranslation();
  const { item } = props;
  const infoList: InfoType[] = [
    {
      label: t("ido.exchangeRate"),
      value: `1 ${item.data?.symbolA} = ${new BigNumber(item.data?.exchange)
        .div(10 ** Number(item.data?.decimalsB))
        .times(1000)
        .toFixed(4)} ${item.data.symbolB}`,
    },
    {
      label: t("ido.exchangeLimit"),
      value: new BigNumber(item?.data.maxExchange).div(10 ** Number(item.data.decimalsB)).toFixed(2),
    },
  ];
  const inTokenTotal = useMemo(() => {
    return new BigNumber(item?.data?.inTokenCapacity || 0).div(10 ** (Number(item?.data?.decimalsB) || 0)).toString();
  }, [item]);

  const percent = useMemo(() => {
    if (!item) return 0;
    return new BigNumber(toFormatBigNumber(item.sum, Number(item?.data?.decimalsB))).div(inTokenTotal).times(100).toNumber();
  }, [item, inTokenTotal]);

  const joinPersonAmount = useMemo(() => {
    if (!item) return `0 / 0`;
    return `${formatNumber(toFormatBigNumber(item.sum, Number(item?.data?.decimalsB)))} ${item?.data?.symbolB} / ${formatNumber(inTokenTotal) || ""} ${item?.data?.symbolB}`;
  }, [inTokenTotal, item]);

  return (
    <div className={styles.ido_container_item_bottom}>
      <p className={styles.ido_container_item_bottom_desc}>{item.data?.proIntroduction}</p>
      {item.data?.projectType === "1" && (
        <div className={styles.ido_container_item_bottom_info}>
          {infoList.map((i) => (
            <div key={i.label} className={styles.ido_container_item_bottom_info_item}>
              <div className={styles.ido_container_item_bottom_info_item_label}>{i.label}</div>
              <div className={styles.ido_container_item_bottom_info_item_value}>{i.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.ido_container_item_bottom_progress}>
        <div className={styles.ido_container_item_bottom_progress_top}>
          <div className={styles.ido_container_item_bottom_progress_top_label}>{t("ido.progress")}</div>
          <div className={styles.ido_container_item_bottom_progress_top_label}>
            {t("ido.participants")}
            <span className={styles.ido_container_item_bottom_progress_top_value}>{item.userAmount || 0}</span>
          </div>
        </div>
        <Progress
          className={styles.progress_bar}
          strokeWidth={10}
          percent={percent}
          trailColor={"rgba(255, 255, 255, 0.11)"}
          status="active"
          strokeColor={{ from: "#ECFC2B", to: "#A8C504" }}
        />
        <div className={styles.ido_container_item_bottom_progress_bottom}>
          <span>{percent ? percent.toFixed(2) : 0}%</span>
          <span>{joinPersonAmount}</span>
        </div>
      </div>
    </div>
  );
};

type IDOProps = {
  groupID: string;
  idoList: ProjectType[];
  groupInfo: GroupItem;
  loading: boolean;
  hideTitle?: boolean;
};
export default function Ido(props: IDOProps) {
  const { groupID, idoList, groupInfo, loading, hideTitle } = props;
  const groupList = useSelector((state: RootState) => state.contacts.groupList, shallowEqual);
  const { t } = useTranslation();
  const nav = useNavigate();
  const getGroupName = (groupID: string) => {
    const item = groupList.find((i) => i.groupID === groupID);
    return item?.groupName || "";
  };
  const gotoDetail = (item: ProjectType) => {
    nav(`/chat/community/square/${groupInfo?.groupName || getGroupName(item.groupid)}/${groupID || item.groupid}/9?pool=${item.address}`);
  };
  return (
    <>
      <div className={`${loading && styles.ido_container_loading} ${styles.ido_container} ${idoList.length === 0 && styles.ido_container_empty} ${hideTitle && styles.padding_0}`}>
        <Spin size="large" spinning={loading} />
        {idoList.length > 0 && !loading ? (
          <>
            {!hideTitle && <div className={styles.ido_container_title}>{t("ido.publicProjects")}</div>}
            <Row gutter={40}>
              <div className={`${styles.ido_container_list} ${hideTitle && styles.margin_18}`}>
                {idoList.map((i, idx) => (
                  <Col key={idx} xs={24} sm={24} md={12} lg={12} xl={12} xxl={8}>
                    <div className={styles.ido_container_item} onClick={() => gotoDetail(i)}>
                      <IdoItemTop item={i}></IdoItemTop>
                      <IdoItemBottom item={i}></IdoItemBottom>
                    </div>
                  </Col>
                ))}
              </div>
            </Row>
          </>
        ) : (
          !loading && idoList.length === 0 && <Empty></Empty>
        )}
      </div>
    </>
  );
}
