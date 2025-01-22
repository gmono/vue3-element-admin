import UserAPI from "@/api/system/user";
import RoleAPI from "@/api/system/role";
import type { UserPageQuery } from "@/api/system/user";
import type { IContentConfig } from "@/components/CURD/types";
// import { apis } from "../../_apis/api";
import { IGiftItem, IGiftItemPageQuery, PagedItem } from "../../_apis/types";
import { apiObj } from "./common";

//表格配置
const contentConfig: IContentConfig<PagedItem<any>> = {
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
  pk: "username",
  // 工具栏
  toolbar: [
    "add",
    "delete",
  ],
  //默认工具栏
  defaultToolbar: ["refresh", "filter", "imports", "exports", "search"],
  cols: [
    { type: "selection", width: 50, align: "center" },
    { label: "用户名", align: "center", prop: "username", width: 100 },
    { label: "昵称", align: "center", prop: "nickname" },
    { label: "头像", align: "center", prop: "avatarUrl", templet: "image" },
    { label: "签名", align: "center", prop: "summary", width: 120 },
    {
      label: "金币数",
      align: "center",
      prop: "coin",
      width: 100,
      templet: "price",
    },
    { label: "性别", align: "center", prop: "gender", width: 120 },
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
