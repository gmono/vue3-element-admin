import UserAPI, { type UserForm } from "@/api/system/user";
import type { IModalConfig } from "@/components/CURD/types";

import { apis } from "../../_apis/api";
import { autoPickUploadFile } from "../../_apis/autoPickUploadFile";
import { IGiftItem } from "../../_apis/types";
import { addTitle, apiObj, objName } from "./common";
const modalConfig: IModalConfig<IGiftItem> = {
  pageName: "live:users",
  dialog: {
    title: addTitle,
    width: 800,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formAction: (data) => {
    let obj = { ...data }
    return apiObj.add(obj)
  },
  beforeSubmit(data) {
  },
  formItems: [
    {
      label: "用户名",
      prop: "username",
      type: "text",
      col: {
        xs: 24,
        sm: 12,
      },
    },
    {
      label: "礼物级别",
      prop: "level",
      rules: [{ required: true, message: "礼物级别不能为空", trigger: "blur" }],
      type: "input-number",
      initialValue: 1,
      attrs: {
        placeholder: "请输入礼物级别",
      },
      col: {
        xs: 24,
        sm: 12,
      },
    },

    {
      label: "价格",
      prop: "cost",
      type: "input-number",
      initialValue: 1
    },
    {
      label: "礼物动画",
      prop: "svga_url",
      type: "custom",
      slotName: "value",
      attrs: {
        placeholder: "请选择所属部门",
        data: [],
        filterable: true,
        "check-strictly": true,
        "render-after-expand": false,
      },
    },
    {
      label: "礼物图标",
      prop: "icon_url",
      rules: [{ required: true, message: "必须设置礼物图标", trigger: "blur" }],
      type: "custom",
      slotName: "icon",
      options: [],
      initialValue: [],
    },
    {
      type: "custom",
      rules: [{ required: true, message: "必须设置展示图标", trigger: "blur" }],
      slotName: "show-icon",
      label: "展示图标",
      prop: "show_icon_url",
    },
    {
      label: "描述",
      prop: "desc",
      initialValue: "",
      type: "input",
      attrs: {
        placeholder: "请输入描述",
        maxlength: 50,
      },
    },

  ],
};

// 如果有异步数据会修改配置的，推荐用reactive包裹，而纯静态配置的可以直接导出
export default reactive(modalConfig);
