import { interactServer, IPageResult } from "@/server/request";
import { IGiftItem } from "./IGiftItem";
import { AxiosInstance } from "axios";
import urlJoin from "url-join";
import { fileServer, uploadFile, uploadUrl } from "@/server/fileserver";

//保存特定api
export const apis = {
  gift: makeCURDClient(interactServer, "/gift"),
  files: {
    upload(file: File) {
      return uploadFile(file)
    },
    uploadUrl: uploadUrl
  }
}


/**
 * 与服务端的useCRUD hook对应
 * @param prefix 挂载点
 * @returns 
 */
function makeCURDClient(client: AxiosInstance, prefix) {
  return {
    /**
     * 获取page
     * @returns 
     */
    async getPage(pagenum, pagesize) {
      let obj = (await client.get<IPageResult<IGiftItem>>(urlJoin(prefix, "/page"), {
        params: {
          pageIndex: pagenum,
          pageSize: pagesize
        }
      })).data;
      //返回礼物列表
      return {
        list: obj.data,
        total: obj.total_count
      } as PageResult<IGiftItem[]>;
    },
    //添加一个礼物
    async add(g: Partial<IGiftItem>) {
      return (await client.post(urlJoin(prefix, "/create"), g))
    },
    async update(g: IGiftItem) {
      return await client.put(urlJoin(prefix, "/update") + g.id, g)
    },
    async delete(id) {
      console.log("删除", id)
      return await client.delete(urlJoin(prefix, "/delete") + id)
    }
  }
}
