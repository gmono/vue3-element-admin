const local = "localhost"
const remote = "192.168.199.165"
const common = "159.75.243.179"
export let server = local
//是否使用config文件 默认为false config文件可运行时修改服务器地址
const useConfig = false;
// export const tencentPort=4006
export const protocol = "http"
export const basePath = "" //格式 xxx/xxx
function axiosSync(url) {
  //使用host配置地址
  if (!useConfig && import.meta?.env?.Host) {
    let t = import.meta.env.Host
    console.log("使用服务器:", t);
    return t;
  }
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false); // 同步模式
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  if (xhr.status === 200) {
    return JSON.parse(xhr.responseText);
  } else {
    throw new Error(`Request failed with status: ${xhr.status}`);
  }
}
function loadCfg() {
  let obj = axiosSync("/config.json")
  server = obj.server;
  console.log("加载配置")
  console.log("使用服务器:", server)
}
loadCfg();
