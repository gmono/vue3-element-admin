import DeptAPI from "@/api/system/dept";
import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "live:users",
  formItems: [
    {
      type: "input",
      label: "礼物名称",
      prop: "keywords",
      attrs: {
        placeholder: "请输入礼物名称",
        clearable: true,
        style: {
          width: "200px",
        },
      },
    },
  ],
};

export default searchConfig;
