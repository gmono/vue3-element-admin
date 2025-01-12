<template>
  <div class="app-container">

    <!-- 列表 -->

    <page-search ref="searchRef" :search-config="searchConfig" @query-click="handleQueryClick"
      @reset-click="handleResetClick" />

    <!-- 列表 -->
    <page-content ref="contentRef" :content-config="contentConfig" @add-click="handleAddClick"
      @edit-click="handleEditClick" @export-click="handleExportClick" @search-click="handleSearchClick"
      @toolbar-click="handleToolbarClick" @operat-click="handleOperatClick" @filter-change="handleFilterChange">
      <template #status="scope">
        <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'info'">
          {{ scope.row[scope.prop] == 1 ? "启用" : "禁用" }}
        </el-tag>
      </template>
      <template #gender="scope">
        <DictLabel v-model="scope.row[scope.prop]" code="gender" />
      </template>
      <template #mobile="scope">
        <el-text>{{ scope.row[scope.prop] }}</el-text>
        <copy-button v-if="scope.row[scope.prop]" :text="scope.row[scope.prop]" style="margin-left: 2px" />
      </template>
    </page-content>

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
      <template #gender="scope">
        <Dict v-model="scope.formData[scope.prop]" code="gender" v-bind="scope.attrs" />
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

//礼物动画文件
const svgafile = ref([
] as UploadUserFile[])
const iconfile = ref("")
const showiconFile = ref("")
// 新增
async function handleAddClick() {
  addModalRef.value?.setModalVisible();
}
// 编辑
async function handleEditClick(row: IObject) {
  editModalRef.value?.handleDisabled(false);
  editModalRef.value?.setModalVisible()
  // // 根据id获取数据进行填充
  // const data = await UserAPI.getFormData(row.id);
  // editModalRef.value?.setFormData(data);
}
function handleOperatClick() {

}
function handleToolbarClick() {

}
// 切换示例
const isA = ref(true);
</script>
