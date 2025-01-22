import DeptAPI from "@/api/system/dept";
import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "live:gift",
  formItems: [
    {
      type: "input",
      label: "用户名",
      prop: "keywords",
      attrs: {
        placeholder: "请输入用户名",
        clearable: true,
        style: {
          width: "200px",
        },
      },
    },
  ],
};

export default searchConfig;
