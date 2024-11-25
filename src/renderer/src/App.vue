<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { ElMessageBox } from 'element-plus'

onMounted(() => {})

const project_tips = ref('')
interface Node {
  label: string;
  children?: Node[];
  url?: string; // 开发目录
  file?: string; // 具体开发文件
  tips?: string; // 提示信息
}
const workerData: Node[] = [
  {
    label: 'Worker',
    children: [
      {
        label: '支付',
        children: [
          {
            label: '游戏内支付sdk',
            url: 'D:\\svn_lib\\v2_static',
            file: 'D:\\svn_lib\\v2_static\\602\\gw\\sdk-init.js',
            tips: '1. 360小游戏、页游、'
          }
        ]
      },
      {
        label: '页游',
        children: [
          {
            label: 'www.602.com',
            url: 'C:\\laragon\\www\\www.602.com'
          },
          {
            label: 'mg.602.com 子官网',
            url: 'D:\\svn_lib\\v2_602com\\mg.602.com',
            tips: '现在已经改为模板模式，模板在 default0 | default1 两个目录下'
          },
          {
            label: '微端内嵌页',
            url: 'C:\\laragon\\www\\www.602.com',
            file: 'C:\\laragon\\www\\www.602.com\\phpcms\\templates\\default\\xlogin\\lysj.html'
          },
          {
            label: '668wan',
            url: 'D:\\svn_lib\\www.shyaodong.net',
            tips: '1. 一个除了微端下载以外没有任何链接的首页，<br> 2. 微端下载等盼盼出，但大体格式是：<br> //down.602.com/wd/602soft/${当天日期}/${游戏简称}-ml.exe'
          },
          {
            label: '页游游戏绑定身份证弹框位置',
            url: 'C:\\laragon\\www\\www.602.com\\phpcms\\templates\\V3\\game\\gameshow_common.html'
          }
        ]
      },
      {
        label: '手游',
        children: [
          {
            label: '小游戏',
            children: [
              {
                label: '微信小游戏',
                url: 'C:\\Users\\Administrator\\Desktop\\资料\\手游sdk对接文档\\微信小游戏\\微信小游戏sdk'
              }
            ]
          },
          {
            label: 'h5.602.com',
            url: 'D:\\git_lib\\h5.602.com'
          },
          {
            label: '游戏盒子相关',
            children: [{
              label: '盒子 内 html 页面 以及 box.602.com 主页目录',
              url: 'D:\\svn_lib\\v2_static\\602\\box.602.com'
            },{
              label: "盒子主体 vue 项目",
              url: "D:\\svn_lib\\v2_static\\602\\gw\\602yxbox\\newvue",
              tips: "1. 打包后放在目录上一级"
            }]
          },
          {
            label: 'h5 SDK',
            url: 'D:\\git_lib\\602_h5_sdk',
            tips: '1. 打包后存放在linkfast.602yx.com <br> 2. 依据git branch 管理不同平台 <br> 3. master ios | Juns => 安卓 | iosEmbeddedPage => ios 内嵌页面',
            children: [
              {
                label: 'linkfast.602yx.com',
                url: 'D:\\git_lib\\linkfast.602yx.com',
                tips: '1. linkfast.602yx.com '
              }
            ]
          }
        ]
      },
      {
        label: '落地页',
        children: [
          {
            label: '本地开发',
            url: 'C:\\Users\\Administrator\\Desktop\\test_files\\luodiye',
            tips: '本地anywhere服务器做测试开发，然后ftp上传服务器，上传后到火山清除缓存 <br> 1. 落地页底部信息 <br> 2. 新增注册框 <br> <a href="https://console.volcengine.com/cdn/refresh-warmup" target="_blank">跳转清除缓存页面</a>'
          },
          {
            label: '后台',
            url: "D:\\svn_lib\\test_shouyou.602.com\\landingpage"
          },
          {
            label: '后台打包后存放目录',
            url: "D:\\git_lib\\landing-page.602.com\\public\\admin"
          }
        ]
      },
      {
        label: '广告后台',
        children: [
          {
            label: '新报表公共样式 ',
            url: "D:\\svn_lib\\test_shouyou.602.com\\web\\新报表公共样式\\newReportStyle",
            tips: '页游推广活动详情 等 <br> router 中切换路由来换页面，需要修改路由配置，否则无法切换页面'
          },
          {
            label: '页游推广活动详情 打包后存放目录',
            url: "D:\\git_lib\\em.602.com\\WebRoot\\static\\vue\\report\\overview"
          }
        ]
      }
    ]
  }
]
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
        <h3>项目说明</h3>
        <div v-if="currNode.url" style="color: #666; padding: 10px;">项目目录：{{ currNode.url }}</div>
        <div class="tips-content" v-if="currNode.tips" v-html="currNode.tips"></div>
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
