<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import LrcView from './player/LrcView.vue'
import { useMusicStore } from '../store/music';

const audioPlayer = ref<HTMLAudioElement | null>(null)

const musicStore = useMusicStore();

const musicOptions = [
  { value: '/src/assets/music/01-10+梯田.flac', label: '01-10+梯田' },
  { value: '/src/assets/music/2656435640.mp3', label: '兰亭序' }
]
const formInline = reactive({
  music: ''
})
const audioSrc = ref('')
const togglePlay = () => {
  if (audioPlayer.value) {
    if (!audioPlayer.value.paused) {
      // 如果音频正在播放，则暂停
      audioPlayer.value.pause()
    } else {
      // 如果音频已暂停，则播放
      audioPlayer.value.play()
    }
  }
}
const selectMusic = (val: string) => {
  audioSrc.value = val
  musicStore.setMusicByPath(val);
}
const curTime = ref(0);

onMounted(() => {
  audioPlayer.value?.addEventListener('timeupdate', () => {
    curTime.value = audioPlayer.value?.currentTime || 0
  })
})
</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    你的
    <span class="vue">私人</span>
    音乐
    <span class="ts">播放器</span>
  </div>
  <audio controls :src="audioSrc" ref="audioPlayer">您的浏览器不支持 audio 元素。</audio>
  <LrcView :curTime="curTime"></LrcView>
  <div class="control-box">
    <el-form :inline="true" :model="formInline">
      <el-form-item label="" prop="music">
        <el-select
          v-model="formInline.music"
          placeholder="歌曲"
          clearable
          size="large"
          filterable
          style="width: 170px"
          @change="selectMusic"
        >
          <el-option
            v-for="item in musicOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="togglePlay">播放</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style>
.control-box {
  margin-top: 20px;
}

</style>
