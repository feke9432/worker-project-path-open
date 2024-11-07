<script setup lang="ts">
import { ref, reactive } from 'vue'
import { LyricLine, LyricService } from './service/lrcService'

const lyricService = new LyricService()

const addLyr = async (path) => {
  try {
    const lyrPath = path.replace(/(flac|mp3)/, 'lrc')
    const lyrics = await lyricService.loadLyrics(lyrPath)
    if (!lyrics.length) {
      lyrics.push({ text: '暂无歌词', time: 0 })
    }
    displayLyrics(lyrics)
    highlightLyrics(lyrics)
  } catch (error) {
    console.error('Failed to load and display lyrics:', error)
  }
}

function displayLyrics(lyrics: LyricLine[]): void {
  const lyricsContainer = document.getElementById('lyrics-container')
  if (lyricsContainer) {
    lyricsContainer.innerHTML = lyrics
      .map((line) => `<div class="lyric-line">${line.text}</div>`)
      .join('')
  }
}
const audioPlayer = ref<HTMLAudioElement | null>(null)
const lyricContainer = ref<HTMLDivElement | null>(null)
function highlightLyrics(lyrics: LyricLine[]) {
  let currentLyricIndex = 0

  function updateHighlight() {
    const currentTime = audioPlayer.value?.currentTime || 0

    while (currentLyricIndex < lyrics.length && lyrics[currentLyricIndex].time <= currentTime) {
      const currentLyricElement = document.querySelector(
        `.lyric-line:nth-child(${currentLyricIndex})`
      )
      if (currentLyricElement) {
        currentLyricElement.classList.remove('highlight')
      }

      currentLyricIndex++
    }
    if (currentLyricIndex > 0) {
      const currentLyricElement = document.querySelector(
        `.lyric-line:nth-child(${currentLyricIndex})`
      )
      if (currentLyricElement) {
        currentLyricElement.classList.add('highlight')

        scrollLrc(currentLyricElement)
      }
    }
  }

  audioPlayer.value?.addEventListener('timeupdate', updateHighlight)
}

function scrollLrc(currentLyricElement) {
  // 滚动到高亮歌词
  const container = lyricContainer.value
  if (container) {
    const containerRect = container.getBoundingClientRect()
    const lyricRect = currentLyricElement.getBoundingClientRect()
    const targetPosition =
      lyricRect.top - containerRect.top - containerRect.height / 2 + lyricRect.height / 2
    container.scrollTop += targetPosition
  }
}

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
  addLyr(val)
}

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
  <div id="lyrics-container" ref="lyricContainer"></div>
  <!-- <LrcView :curTime="curTime"></LrcView> -->
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
#lyrics-container {
  max-height: 300px;
  overflow-y: scroll;
  margin: 10px 0;
  transition: scrollTop 0.3s;
}

#lyrics-container::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
}

#lyrics-container::-webkit-scrollbar-track {
  background: transparent; /* 轨道背景颜色 */
}

#lyrics-container::-webkit-scrollbar-thumb {
  background-color: #888; /* 滚动条滑块颜色 */
  border-radius: 4px; /* 滚动条滑块圆角 */
}

#lyrics-container::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 滚动条滑块悬停时的颜色 */
}
#lyrics-container .lyric-line {
  color: #666;
}
#lyrics-container .highlight {
  color: yellow;
}
</style>
