<script setup lang="ts">
import { onMounted } from 'vue'
import * as XLSX from 'xlsx' // 引入 XLSX 模块
onMounted(() => {})

interface XlsxItem {
  [key: string]: string
}

let ldata: XlsxItem[] = []

const downloadFile = () => {
  if (ldata.length < 0) return
  const vcfData: string[] = []
  ldata.forEach((item) => {
    let vcfItem: string = `BEGIN:VCARD
VERSION:3.0
N:${item['姓名']};;;
FN:${item['姓名']}
`

    // 动态添加所有手机号
    for (let i = 1; item[`手机号${i}`]; i++) {
      vcfItem += `TEL;TYPE=CELL:${item[`手机号${i}`]}\n`
    }

    vcfItem += `END:VCARD\n`
    vcfData.push(vcfItem)
  })
  // 创建 Blob 对象
  const blob = new Blob(vcfData, { type: 'text/vcard;charset=utf-8;' })

  const url = URL.createObjectURL(blob)

  if (typeof WeixinJSBridge !== 'undefined' && WeixinJSBridge.invoke) {
    WeixinJSBridge.invoke(
      'downloadFile',
      {
        url: url,
        fileName: 'contacts.vcf'
      },
      function (res) {
        if (res.err_msg === 'downloadFile:ok') {
          alert('文件下载成功')
        } else {
          alert('文件下载失败')
        }
      }
    )
  } else {
    const link = document.createElement('a')
    link.href = url
    link.download = 'contacts.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
const handleFile = (event) => {
  const file = event.raw
  console.log('chagne', file)
  if (!file) return
  const reader = new FileReader()
  reader.onload = function (e) {
    if (!e.target) {
      return
    }
    const data = new Uint8Array(e.target.result as ArrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const json: XlsxItem[] = XLSX.utils.sheet_to_json(worksheet)
    json.forEach((item) => {
      item['手机号1'] = item['手机号']
    })
    ldata = json
    console.log(ldata)
  }
  reader.readAsArrayBuffer(file)
}
</script>

<template>
  <div class="container">
    <el-card style="min-width: 300px">
      <el-upload
        class="upload-demo"
        drag
        action=""
        :limit="1"
        accept=".xls,.xlsx"
        :auto-upload="false"
        @change="handleFile"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽或者 <em>点击上传excel文件</em></div>
        <template #tip>
          <div class="el-upload__tip">只允许上传xls 、 xlsx格式文件</div>
        </template>
      </el-upload>
      <div style="margin-top: 20px">
        <el-button type="primary" size="large" style="width: 100%" @click="downloadFile"
          >下载vcf</el-button
        >
      </div>
    </el-card>
    <div class="tips">
      <div>0. 请使用如下格式表格文件</div>
      <div>1. 使用微信将生成的vcf文件传到手机</div>
      <div>2. 微信中使用电话簿应用打开</div>
      <div>3. 导入即可</div>
    </div>

  </div>
  <div class="img-box">
      <img src="./assets/Snipaste.png" alt="" />
    </div>
</template>

<style>
.container {
  background: #fff;
  display: flex;

}

.box {
  width: 100%;
  height: 400px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.box > div {
  margin-bottom: 20px;
  text-align: center;
}
#fileInput {
  padding: 12px 5px;
  border: 1px solid #efefef;
  background: rgb(64, 158, 255);
  color: #fff;
  border-radius: 5px;
}
button {
  padding: 8px 15px;
  color: #fff;
  border-color: rgb(64, 158, 255);
  background-color: rgb(64, 158, 255);
  outline: none;
  justify-content: center;
  align-items: center;
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: 0.1s;
  font-weight: 500;
  -webkit-user-select: none;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  border: 1px solid rgb(64, 158, 255);
  border-radius: 5px;
}
.img-box {
  width: 600px;
}
.img-box img {
  width: 100%;
}
.tips {
  color: #333;
  padding: 10px;
  width: 300px;
}
</style>
