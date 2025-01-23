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



const demo = {
  "url": "",
  "title": "未命名",
  "username": "system",
  "need_cost": false,
  "cost": 0,
  "id": 1,
  "likes": 0,
  "auto_added": true,
  coverImg: "",
  musicUrl: "",
  desc: ""
  //其他信息
}
export type VideoItem = typeof demo & {
  like_count: number;
  fav_count: number;
  is_like: boolean;
  is_fav: boolean;
  share_count: number;
};


const room = {
  "debug_inf": false,
  "room_id": 2,
  "room_type": 0,
  "username": "test2",
  "is_living": false,
  "coverImg": "de5a63c597d93b799ab1092b54e230b9cdab3d98938c6903e2d9879cc7e7c7bc.jpg",
  "living_beat_time": "2025-01-19T04:33:06.565171+00:00",
  "living_start_time": null,
  "time_limit": 0,
  "cost": 0,
  "password": null,
  "limit_username": null,
  "player_count": 0,
  "title": "未命名直播间"
}
export type RoomItem = typeof room;
