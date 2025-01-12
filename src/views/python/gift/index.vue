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
      <template #svga_url="scope">
        <!-- <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'info'">
          {{ scope.row[scope.prop] == 1 ? "启用" : "禁用" }}
        </el-tag> -->
        <el-button type="primary" @click="showSvga(getFileUrl(scope.row[scope.prop]))">
          查看
        </el-button>

      </template>
    </page-content>

    <el-dialog v-model="svga_vis" title="礼物展示">
      <main>
        <SVGAPlayer style="height: 500px;width: 300px;margin:auto" :url="svga_file" />
      </main>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="svga_vis = false">关闭 </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 新增 -->
    <page-modal ref="addModalRef" :modal-config="addModalConfig" @submit-click="handleSubmitClick">
      <template #gender="scope">
        <Dict v-model="scope.formData[scope.prop]" code="gender" />
      </template>
      <template #value="scope">

        <FileUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
      <template #icon="scope">
        <ImageUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
      <template #show-icon="scope">
        <ImageUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
    </page-modal>

    <!-- 编辑 -->
    <page-modal ref="editModalRef" :modal-config="editModalConfig" @submit-click="handleSubmitClick">
      <template #value="scope">

        <FileUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
      <template #icon="scope">
        <ImageUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
          :max-size="10" />
      </template>
      <template #show-icon="scope">
        <ImageUpload no-prefix :action="apis.files.uploadUrl" v-model="scope.formData[scope.prop]" :limit="1"
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
import contentConfig2 from "./config/content2";
import editModalConfig from "./config/edit";
import searchConfig from "./config/search";
import ImageUpload from "@/components/Upload/ImageUpload.vue";
import { UploadUserFile } from "element-plus";
import { apis } from "../_apis/api";
import { getFileUrl } from "@/server/fileserver";
import SVGAPlayer from "./SVGAPlayer.vue";
import { IGiftItem } from "../_apis/IGiftItem";
defineOptions({
  name: "GiftMgr"
})
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
let svga_vis = $ref(false)
let svga_file = $ref("")
function showSvga(file) {
  svga_file = file
  svga_vis = !svga_vis
}
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
  const data = (await apis.gift.getOne(row.id)).data as IGiftItem

  (data.svga_url as any) = [{
    name: data.svga_url,
    url: data.svga_url
  }]
  editModalRef.value?.setFormData(data);
}
//执行操作
async function handleOperatClick(obj: IOperatData) {
  await apis.gift.delete(obj.row.id);
  ElMessage.success("删除成功")
}
function handleToolbarClick() {

}
// 切换示例
const isA = ref(true);
</script>
