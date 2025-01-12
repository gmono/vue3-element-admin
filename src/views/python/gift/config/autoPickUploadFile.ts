/**
 * 用于处理单个文件上传的情况 自动把上传控件提供的对象转换为url
 * @param obj 目标对象
 * @param prop
 */
export function autoPickUploadFile<T>(obj: T, prop: keyof T) {
  if (typeof obj[prop] == "object" && (obj[prop] as any) instanceof Array) {
    obj[prop] = (obj[prop] as any)[0].url;
  }
}
