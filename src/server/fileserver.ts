import { protocol, server } from "./cfg";
import axios from "axios";

export const fileServer = protocol + "://" + server + ":8000";
//从文件服务器上获取文件
export function getFileUrl(name: string) {
  // debugger;
  if (name == null) return name;
  if (name.startsWith("http://") || name.startsWith("https://")) {
    return name;
  }
  return `${fileServer}/files/${name}`;
}
export const uploadUrl = `${fileServer}/upload`
export const fileReq = axios.create({
  baseURL: fileServer,
  timeout: 50000
});
export async function uploadFile(file: File) {
  let formdata = new FormData()
  formdata.append("file", file)
  let res = (await fileReq.post("/upload", formdata)).data
  return res.filename as string
}
