import DeptAPI from "@/api/system/dept";
import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "live:gift",
  formItems: [
    {
      type: "input",
      label: "视频标题",
      prop: "keywords",
      attrs: {
        placeholder: "请输入视频标题",
        clearable: true,
        style: {
          width: "200px",
        },
      },
    },
  ],
};

export default searchConfig;
