import UserAPI, { type UserForm } from "@/api/system/user";
import type { IModalConfig } from "@/components/CURD/types";

import { apis } from "../../_apis/api";
import { autoPickUploadFile } from "../../_apis/autoPickUploadFile";
import { IGiftItem, VideoItem } from "../../_apis/types";
import { addTitle, apiObj, objName } from "./common";
const modalConfig: IModalConfig<VideoItem> = {
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
    console.log(data)
    let obj = { ...data }
    autoPickUploadFile(obj, "musicUrl")
    autoPickUploadFile(obj, "url")
    // if (!obj.id) throw "必须提供id"
    return apiObj.add(obj)
  },
  beforeSubmit(data) {
  },
  formItems: [
    {
      label: "视频标题",
      prop: "title",
      type: "input",
      col: {
        xs: 24,
        sm: 12,
      },
    },
    {
      label: "发布者",
      prop: "username",
      rules: [{ required: true, message: "发布者不能为空", trigger: "blur" }],
      type: "input",
      initialValue: "",
      attrs: {
        placeholder: "请输入发布者用户名",
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
      label: "是否收费",
      prop: "need_cost",
      type: "select",
      options: [
        {
          label: "是",
          value: true
        }, {
          label: "否",
          value: false
        }
      ],
      initialValue: false
    },
    {
      label: "文案",
      prop: "desc",
      type: "input",
      attrs: {
        rows: 5
      }
    },

    {
      label: "封面",
      prop: "coverImg",
      type: "custom",
      slotName: "cover"
    },
    {
      label: "背景音乐",
      prop: "musicUrl",

      type: "custom",
      slotName: "music",
      options: [],
      initialValue: [],
    },
    {
      type: "custom",
      slotName: "video",
      label: "视频文件",
      prop: "url",
    },
    {
      label: "喜欢数",
      prop: "likes",
      initialValue: 0,
      type: "input-number",
      attrs: {
        min: 0,
        placeholder: "请输入描述",
        maxlength: 50,
      },
    },

  ],
};

// 如果有异步数据会修改配置的，推荐用reactive包裹，而纯静态配置的可以直接导出
export default reactive(modalConfig);
