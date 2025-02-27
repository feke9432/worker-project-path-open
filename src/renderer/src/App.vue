<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { ElMessageBox } from 'element-plus'

import treedata  from './config/1.json'

onMounted(() => {})

const project_tips = ref('')
interface Node {
  label: string;
  children?: Node[];
  url?: string; // 开发目录
  file?: string; // 具体开发文件
  tips?: string; // 提示信息
  tasks?: {
    title: string;
    url: string;
  }[];
}
const workerData: Node[] = treedata
const currNode = ref<Node>({label: ''})
const handleNodeClick = (data: Node) => {
  console.log(data)
  currNode.value = data;
  project_tips.value = data.tips || ''
  if (data.url) {
    ElMessageBox.confirm(`确认使用 Vscode 打开 ${data.url} 目录吗？`, 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '算了',
      type: 'warning'
    }).then(() => {
      // @ts-ignore
      window.api.openInVSCode({
        directory: data.url,
        file: data.file
      })
    })
  }
}
const activeName = ref('first')
const handleClick = (tab: unknown, event: unknown) => {
  console.log(tab, event);
}
</script>

<template>
  <div>
    <!-- <MusicPlayer /> -->
    <h1 class="rainbow-h1">开启氮气加速</h1>
    <div class="control-box">
      <el-tree
        style="max-width: 600px"
        :data="workerData"
        :default-expand-all="true"
        @node-click="handleNodeClick"
      />
      <div class="tips">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="项目说明" name="first">
            <div v-if="currNode.url" style="color: #666; padding: 10px;">项目目录：{{ currNode.url }}</div>
          <div class="tips-content" v-if="currNode.tips" v-html="currNode.tips"></div>
          </el-tab-pane>
          <el-tab-pane label="完成任务" name="second">
            <div v-for="(item, index) in currNode.tasks" :key="index" class="tips-content">
              <div>
                <a :href="item.url" target="_blank">{{ item.title }}</a>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style>
.control-box {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.tips {
  background: #fff;
  color: #333;
  margin-left: 20px;
  padding: 10px;
  width: 500px;
}
.tips h3 {
  color: #666;
  border-bottom: 1px solid #efefef;
}
/* 添加彩虹渐变色的样式 */
.rainbow-h1 {
  font-size: 2em;
  background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
