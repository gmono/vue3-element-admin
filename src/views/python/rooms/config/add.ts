import UserAPI, { type UserForm } from "@/api/system/user";
import type { IModalConfig } from "@/components/CURD/types";

import { apis } from "../../_apis/api";
import { autoPickUploadFile } from "../../_apis/autoPickUploadFile";
import { IGiftItem, RoomItem, VideoItem } from "../../_apis/types";
import { addTitle, apiObj, objName } from "./common";
const modalConfig: IModalConfig<RoomItem> = {
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
      label: "房间标题",
      prop: "title",
      type: "input",
      col: {
        xs: 24,
        sm: 12,
      },
    },
    {
      label: "所属者",
      prop: "username",
      rules: [{ required: true, message: "发布者不能为空", trigger: "blur" }],
      type: "input",
      initialValue: 1,
      attrs: {
        placeholder: "请输入发布者用户名",
      },
      col: {
        xs: 24,
        sm: 12,
      },
    },
    {
      label: "房间号",
      prop: "room_id",
      type: "input-number",
      initialValue: 1
    },

    {
      label: "房间类型",
      prop: "room_type",
      type: "select",
      options: [
        {
          label: "普通房",
          value: 0
        }, {
          label: "金币房",
          value: 1
        }, {
          label: "单人房",
          value: 2
        }
      ],
      initialValue: 0
    },

    {
      label: "金币房价格",
      visibleFunc: (obj) => {
        console.log("对象", obj)
        return obj["room_type"] == 1
      },
      prop: "cost",
      type: "input-number",
      initialValue: 1
    },
    {
      label: "单人房用户限制",
      prop: "limit_username",
      visibleFunc(data) {
        return data["room_type"] == 2
      },
      type: "input",
      initialValue: ""
    },
    {
      label: "房间时间限制",
      prop: "time_limit",
      type: "time-picker",
      computed(data) {

      },
      attrs: {
      },
      initialValue: 1
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
      prop: "links",
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
