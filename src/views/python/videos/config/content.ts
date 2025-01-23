import UserAPI from "@/api/system/user";
import RoleAPI from "@/api/system/role";
import type { UserPageQuery } from "@/api/system/user";
import type { IContentConfig } from "@/components/CURD/types";
// import { apis } from "../../_apis/api";
import { IGiftItem, IGiftItemPageQuery } from "../../_apis/types";
import { apiObj } from "./common";

const contentConfig: IContentConfig<IGiftItemPageQuery> = {
  pageName: "live:videos",
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
  pk: "id",
  // 工具栏
  toolbar: [
    "add",
    "delete",
  ],
  //默认工具栏
  defaultToolbar: ["refresh", "filter", "imports", "exports", "search"],
  cols: [
    { type: "selection", width: 50, align: "center" },
    { label: "标题", align: "center", prop: "title", width: 100 },
    { label: "视频", align: "center", prop: "url", templet: "custom" },
    { label: "封面", align: "center", prop: "coverImg", templet: "image" },
    { label: "背景音乐", align: "center", prop: "musicUrl", templet: "custom" },
    { label: "发布者", align: "center", prop: "username", width: 120 },
    {
      label: "价格",
      align: "center",
      prop: "cost",
      width: 100,
      templet: "price",
    },
    { label: "描述", align: "center", prop: "desc", width: 120 },
    { label: "喜欢数", align: "center", prop: "likes", width: 120 },
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
