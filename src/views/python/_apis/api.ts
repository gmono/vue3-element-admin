import { interactServer } from "@/server/request";
import { IGiftItem } from "./IGiftItem";

//保存特定api
export const apis = {
  async getGifts() {
    let obj = (await interactServer.get<IGiftItem[]>("/gift/list", {
    })).data;
    //返回礼物列表
    return {
      list: obj,
      total: obj.length
    } as PageResult<IGiftItem[]>;
  },
  //添加一个礼物
  async addGift(g: Partial<IGiftItem>) {
    return (await interactServer.post("/gift/create", g))
  }
}
