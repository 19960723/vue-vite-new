<template>
  <div>
    <h3>文件上传</h3>
    <input type="file" ref="inputFile" class="inputFile" @change="uploadChange" />
    <button type="button" @click="uploadFileClick">upload file</button>
    <div class="progress" ref="progress"></div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  const inputFile = ref<HTMLInputElement>();
  const progress = ref<HTMLInputElement>();
  const uploadFileClick = () => {
    nextTick(() => {
      let inputFileDom = inputFile.value as HTMLInputElement;
      inputFileDom.click();
    });
  };
  const uploadChange = (e: any) => {
    const input = e.target as HTMLInputElement;
    const files = input.files && input.files[0];
    const chunkList = createChunk(files);
    const uploadList = chunkList.map(({ file }, index) => ({
      file,
      size: file.size,
      percent: 0,
      chunkName: `${files?.name}-${index}`,
      fileName: files?.name,
      index,
    }));
    uploadFile(uploadList);
  };
  const createChunk = (file: any, size = 2 * 1024 * 1024) => {
    const chunkList = [];
    let cur = 0;
    while (cur < file.size) {
      chunkList.push({
        file: file.slice(cur, cur + size), //使用slice()进行切片
      });
      cur += size;
    }
    return chunkList;
  };

  const uploadFile = (list: any) => {
    const requertList = list.map(({ file, fileName, index, chunkName }) => {
      const formData = new FormData(); // 创建表单类型数据
      formData.append('file', file); //该文件
      formData.append('fileName', fileName); //文件名
      formData.append('chunkName', chunkName); //切片名
      return { formData, index };
    });
    console.log(requertList);
  };
</script>

<style>
  .inputFile {
    display: none;
  }
</style>
