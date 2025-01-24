import UserAPI, { type UserForm } from "@/api/system/user";
import type { IModalConfig } from "@/components/CURD/types";

import { apis } from "../../_apis/api";
import { autoPickUploadFile } from "../../_apis/autoPickUploadFile";
import { IGiftItem } from "../../_apis/types";
import { addTitle, apiObj, objName } from "./common";
const modalConfig: IModalConfig<IGiftItem> = {
  pageName: "live:gift",
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
      rules: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
      type: "input",
      col: {
        xs: 24,
        sm: 12,
      },
    },
    {
      label: "昵称",
      prop: "nickname",
      rules: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
      type: "input",
      initialValue: "无昵称",
      attrs: {
        placeholder: "请输入用户昵称",
      },
      col: {
        xs: 24,
        sm: 12,
      },
    },

    {
      label: "密码",
      prop: "password",
      type: "input",
      rules: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      attrs: {
        placeholder: "设置密码",
        maxlength: 64
      },
      col: {
        xs: 24,
        sm: 12,
      },
    },
    {
      label: "头像",
      prop: "avatarUrl",
      type: "custom",
      slotName: "value",
      attrs: {
        placeholder: "选择头像",
        data: [],
        filterable: true,
        "check-strictly": true,
        "render-after-expand": false,
      },
    },
    {
      label: "签名",
      prop: "summary",
      type: "input",
      initialValue: ""
    },
    {
      label: "金币",
      prop: "coin",
      initialValue: 0,
      type: "input-number",
      attrs: {
        placeholder: "请输入用户金币",
        maxlength: 50,
      },
    },

  ],
};

// 如果有异步数据会修改配置的，推荐用reactive包裹，而纯静态配置的可以直接导出
export default reactive(modalConfig);
