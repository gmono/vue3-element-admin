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
