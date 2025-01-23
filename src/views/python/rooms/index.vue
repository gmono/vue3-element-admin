<template>
  <div class="app-container">

    <!-- 列表 -->

    <page-search ref="searchRef" :search-config="searchConfig" @query-click="handleQueryClick"
      @reset-click="handleResetClick" />


    <!-- 列表 -->
    <page-content :get-file-url="(v) => getFileUrl(v)" ref="contentRef" :content-config="contentConfig"
      @add-click="handleAddClick" @edit-click="handleEditClick" @export-click="handleExportClick"
      @search-click="handleSearchClick" @toolbar-click="handleToolbarClick" @operat-click="handleOperatClick"
      @filter-change="handleFilterChange">

      <template #room_type="s">
        <div>
          <template v-if="s.row[s.prop] == 0">
            普通
          </template>
          <template v-else-if="s.row[s.prop] == 1">
            金币房
          </template>
          <template v-else-if="s.row[s.prop] == 2">
            单人房
          </template>
        </div>
        <div v-if="s.row[s.prop] == 2">
          限制用户:{{ s.row["limit_username"] }}
        </div>
        <div v-if="s.row[s.prop] == 1">
          价格:{{ s.row["cost"] }}
        </div>
        <div v-if="s.row[s.prop] != 2 && s.row['time_limit'] != 0">
          时间限制:{{ s.row["time_limit"] }}
        </div>
      </template>
      <template #time_limit="s">
        <div>
          <template v-if="s.row[s.prop] == 0">
            无
          </template>
        </div>
      </template>
      <template #musicUrl="scope">
        <div v-if="scope.row[scope.prop] == null">无</div>
        <audio v-else :src="getFileUrl(scope.row[scope.prop])" />
      </template>
      <template #url="scope">
        <!-- <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'info'">
          {{ scope.row[scope.prop] == 1 ? "启用" : "禁用" }}
        </el-tag> -->
        <el-button type="primary" @click="showDialog(getFileUrl(scope.row[scope.prop]))">
          查看
        </el-button>

      </template>
    </page-content>


    <el-dialog v-model="svis" title="视频播放">
      <main style="height: 100%;width:100%">
        <video ref="videoele" controls
          style="display: block;height:500px;width:300px;margin: auto;background-color: gray;" :src="sfile" />
      </main>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="close">关闭 </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增 -->
    <page-modal ref="addModalRef" :modal-config="addModalConfig" @submit-click="handleSubmitClick">

      <template #cover="scope">
        <ImageUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
      <template #music="scope">

        <FileUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
      <template #video="scope">

        <FileUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
    </page-modal>

    <!-- 编辑 -->
    <page-modal ref="editModalRef" :modal-config="editModalConfig" @submit-click="handleSubmitClick">
      <template #cover="scope">
        <ImageUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
      <template #music="scope">

        <FileUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
      <template #video="scope">

        <FileUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import UserAPI from "@/api/system/user";
import DeptAPI from "@/api/system/dept";
import RoleAPI from "@/api/system/role";
import type { IObject, IOperatData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import addModalConfig from "./config/add";
import contentConfig from "./config/content";

import editModalConfig from "./config/edit";
import searchConfig from "./config/search";
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import { UploadUserFile } from "element-plus";
import { apis } from "../_apis/api";
import { getFileUrl } from "@/server/fileserver";
import { IGiftItem } from "../_apis/types";
import { apiObj } from "./config/common";
defineOptions({
  name: "LiveUserMgr"
})

const videoele = ref<HTMLVideoElement>()
//核心模型
const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  // handleAddClick,
  // handleEditClick,
  handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

//显示svga播放器
let svis = $ref(false)
let sfile = $ref("")
function showDialog(file) {
  sfile = file
  svis = !svis
}
function close() {
  svis = false;
  if (!svis) {
    //关闭视频
    if (videoele.value) {
      videoele.value.pause()
    }
  }
}
watch(svis, v => {

})
// 新增
async function handleAddClick() {
  addModalRef.value?.setModalVisible();
}


// 编辑
async function handleEditClick(row: IObject) {
  editModalRef.value?.handleDisabled(false);
  editModalRef.value?.setModalVisible();
  // // 加载部门下拉数据源
  // editModalConfig.formItems[2]!.attrs!.data = await DeptAPI.getOptions();
  // // 加载角色下拉数据源
  // editModalConfig.formItems[4]!.options = await RoleAPI.getOptions();
  // 根据id获取数据进行填充
  const data = (await apiObj.getOne(row.room_id)).data as any
  function toObj(url) {
    return [{
      name: url,
      url: url
    }]
  }
  editModalRef.value?.setFormData(data);
}
//执行操作
async function handleOperatClick(obj: IOperatData) {
  // await apiObj.delete(obj.row.username);
  // ElMessage.success("删除成功")
}
function handleToolbarClick() {

}
// 切换示例
const isA = ref(true);
</script>
