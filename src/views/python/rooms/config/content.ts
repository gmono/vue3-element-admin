import UserAPI from "@/api/system/user";
import RoleAPI from "@/api/system/role";
import type { UserPageQuery } from "@/api/system/user";
import type { IContentConfig } from "@/components/CURD/types";
// import { apis } from "../../_apis/api";
import { IGiftItem, IGiftItemPageQuery, PagedItem } from "../../_apis/types";
import { apiObj } from "./common";

const dt = {
  "coverImg": "ea8811b4fe8da30f8827ce954c55b23dc763fac7dad3c793f9389a6b76c3742f.jpg",
  "debug_inf": false,
  "limit_username": "test",
  "living_beat_time": null,
  "cost": 0,
  "room_id": 1,
  "title": "未命名直播间",
  "player_count": 0,
  "is_living": false,
  "time_limit": 0,
  "room_type": 0,
  "living_start_time": null,
  "password": "",
  "username": "test"
}
type RoomInfo = typeof dt
const contentConfig: IContentConfig<PagedItem<RoomInfo>> = {
  pageName: "live:gift",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  pagination: {
    background: true,
    layout: "prev,pager,next,jumper,total,sizes",
    pageSize: 20,
    pageSizes: [10, 20, 30, 50],
  },
  //分页获取数据
  indexAction: async function (params) {
    console.log("参数", params);
    let t = await apiObj.getPage_fromOne(params.pageNum, params.pageSize)
    return t;
  },
  //删除条目 批量 通过id
  deleteAction: apiObj.delete,
  // importAction(file) {
  //   return UserAPI.import(1, file);
  // },
  // exportAction: UserAPI.export,
  // importTemplate: UserAPI.downloadTemplate,
  // importsAction(data) {
  //   // 模拟导入数据
  //   console.log("importsAction", data);
  //   return Promise.resolve();
  // },
  // exportsAction: async function (params) {
  //   // 模拟获取到的是全量数据
  //   const res = await UserAPI.getPage(params);
  //   console.log("exportsAction", res.list);
  //   return res.list;
  // },
  pk: "room_id",
  // 工具栏
  toolbar: [
    "add",
    "delete",
  ],
  //默认工具栏
  defaultToolbar: ["refresh", "filter", "imports", "exports", "search"],
  cols: [
    { type: "selection", width: 50, align: "center" },
    { label: "房间号", align: "center", prop: "room_id", width: 100 },
    { label: "标题", align: "center", prop: "title", width: 100 },
    { label: "封面", align: "center", prop: "coverImg", templet: "image" },

    { label: "所属用户", align: "center", prop: "username", width: 120 },

    {
      label: "价格",
      align: "center",
      prop: "cost",
      width: 100,
      templet: "price",
    },
    { label: "房间类型", align: "center", prop: "room_type", width: 120, templet: "custom" },
    { label: "时间限制", align: "center", prop: "time_limit", width: 120, templet: "custom" },
    {
      label: "操作",
      align: "center",
      fixed: "right",
      width: 200,
      templet: "tool",
      operat: [
        "edit",
        "delete",
      ],
    },
  ],
};

export default contentConfig;
