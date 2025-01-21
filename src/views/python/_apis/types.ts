/**
 * 礼物信息
 */

export interface IGiftItem {
  name: string;
  svga_url: string;
  icon_url: string;
  id: number;
  desc: string;
  cost: number;
  show_icon_url: string;
}
//分页查询的结果
export interface IGiftItemPageQuery extends PageQuery {

}


export type PagedItem<T> = T & PageQuery;
