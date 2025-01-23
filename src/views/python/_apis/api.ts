import { interactServer, IPageResult, trtcServer, userAdminServer, userInfoServer, videoServer } from "@/server/request";
import { IGiftItem, RoomItem } from "./types";
import { AxiosInstance } from "axios";
import urlJoin from "url-join";
import { fileServer, uploadFile, uploadUrl } from "@/server/fileserver";

//保存特定api
export const apis = {
  gift: makeCURDClient(interactServer, "/gift"),

  //用户信息 且可以修改coin
  user: {
    ...makeCURDClient(userInfoServer, "/admin", "username"),

    //设置密码
    async updatePassword(p: { username, password }) {
      await userInfoServer.put("/admin/update/password", {
        ...p
      })
    }
  },

  videos: makeCURDClient(videoServer, "/admin"),
  room: makeCURDClient<RoomItem>(trtcServer, "/admin", "room_id"),
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
function makeCURDClient<T = IGiftItem>(client: AxiosInstance, prefix, keyProp = "id") {
  return {

    /**
     * 和getpage一样但从1开始计算页
     * @param pagenum 从1开始的页码
     * @param pagesize 
     * @returns 
     */
    async getPage_fromOne(pagenum, pagesize) {
      return this.getPage(pagenum - 1, pagesize);
    },
    /**
     * 获取page
     * @returns 
     */
    async getPage(pagenum, pagesize) {
      let obj = (await client.get<IPageResult<T>>(urlJoin(prefix, "/page"), {
        params: {
          pageIndex: pagenum,
          pageSize: pagesize
        }
      })).data;
      //返回礼物列表
      return {
        list: obj.data,
        total: obj.total_count
      } as PageResult<T[]>;
    },
    //添加一个礼物
    async add(g: Partial<T>) {
      return (await client.post(urlJoin(prefix, "/create"), g))
    },
    async update(g: T) {
      return await client.put(urlJoin(prefix, "/update/") + g[keyProp], g)
    },
    async delete(id) {
      console.log("删除", id)
      return await client.delete(urlJoin(prefix, "/delete/") + id)
    },
    async getOne(id) {
      return await client.get(urlJoin(prefix, "/detail/" + id))
    }
  }
}
