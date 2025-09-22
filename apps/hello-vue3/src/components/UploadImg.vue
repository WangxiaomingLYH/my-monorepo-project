<script setup lang="ts">
// 封装的单个图片上传组件

import { ref } from 'vue';
import { genFileId } from 'element-plus';
import type { FormInstance, FormRules, UploadFile, UploadProps, UploadRawFile, UploadInstance } from 'element-plus';

const upload = ref<UploadInstance>() // 上传组件的实例

const fileList = ref<UploadFile[]>([]);
const dialogImageUrl = ref('')
const uploadDialogVisible = ref(false)
const disabled = ref(false)
const model = defineModel('base64FileData')

// 只能上传一张图, 若超出限制则触发该函数
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()  // 清空已上传的文件列表
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)  // 手动选择文件, 这里是选择索引为0的文件
}

// 查看已上传图片
const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    uploadDialogVisible.value = true
}

// 移除已上传图片
const handleRemove = (file: UploadFile) => {
    const index = fileList.value.findIndex(item => item.uid === file.uid);
    if (index !== -1) {
        fileList.value.splice(index, 1);
    }
}

// 图片变化时, 触发该函数. 并通过 v-model 将文件 base64 后同步到父组件
const handleFileChange = (file: UploadFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.raw!); // 读取指定文件的 blob 或 file对象的内容
    reader.onload = () => {  // onload 成功读取文件时触发
        // result 只读属性, 返回文件的内容. 数据格式取决于使用什么API读取文件的内容
        model.value = reader.result as string;
    };
};

</script>

<template>
    <div class="">
        <el-upload ref="upload" action="#" list-type="picture-card" :auto-upload="false" v-model:file-list="fileList"
            :limit="1" :on-exceed="handleExceed" :on-change="handleFileChange">
            <el-icon>
                <Plus />
            </el-icon>
            <template #tip>
                <div class="el-upload__tip">
                    Only upload one picture
                </div>
            </template>
            <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                            <el-icon><zoom-in /></el-icon>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </span>
                    </span>
                </div>
            </template>
        </el-upload>
        <el-dialog v-model="uploadDialogVisible" style="padding: 30px;">
            <img style="width: 100%;" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<style scoped lang="less"></style>