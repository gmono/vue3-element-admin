import axios from "axios"
import { protocol, server } from "./cfg"

//获取
export function createReq(path) {
  const req = axios.create({
    baseURL: `${protocol}://${server}:4004` + path,
    timeout: 500000
  })
  return req
}


//python后端服务器接口

export const identityServer = createReq("/identity")

export const videoServer = createReq("/videos")
export const payServer = createReq("/payment")
export const friendServer = createReq("/social/friend")
export const followServer = createReq("/social/follow")
export const socialServer = createReq("/social")

export const interactServer = createReq("/interact")
export interface IPageResult<T = any> {
  current_page: number;
  data: T[];
  page_size: number;
  total_count: number;
  total_pages: number;
}
