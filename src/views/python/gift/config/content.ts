import UserAPI from "@/api/system/user";
import RoleAPI from "@/api/system/role";
import type { UserPageQuery } from "@/api/system/user";
import type { IContentConfig } from "@/components/CURD/types";
import { apis } from "../../_apis/api";
import { IGiftItem, IGiftItemPageQuery } from "../../_apis/IGiftItem";

const contentConfig: IContentConfig<IGiftItemPageQuery> = {
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
    console.log("获取礼物:", params);
    let t = await apis.gift.getPage(params.pageNum, params.pageSize)
    console.log("礼物列表:", t);

    return t;
  },
  //删除条目 批量 通过id
  deleteAction: apis.gift.delete,
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
    { label: "编号", align: "center", prop: "id", width: 100, show: false },
    { label: "名称", align: "center", prop: "name" },
    { label: "图标", align: "center", prop: "icon_url", templet: "image" },
    { label: "展示图标", align: "center", prop: "show_icon_url", width: 120, templet: "image" },
    {
      label: "价格",
      align: "center",
      prop: "cost",
      width: 100,
      templet: "price",
    },
    { label: "动画文件", align: "center", prop: "svga_url", width: 120 },
  ],
};

export default contentConfig;
