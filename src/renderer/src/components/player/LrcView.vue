<template>
  <div>
    <div id="lyrics-container" ref="lyricContainer">
      <div class="lyric-line" :class="highLight_index === index ? 'highlight': ''" v-for="(line, index) in musicStore.lyrics" :key="index">{{ line.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed ,useTemplateRef, onMounted } from "vue";
  import {useMusicStore} from '@renderer/store/music'

  const props = defineProps(['curTime'])
  const lyricContainer = useTemplateRef('lyricContainer')
  let contaner = null ;
  onMounted(() => {
    contaner = lyricContainer.value;
  })

  const musicStore = useMusicStore()

  let currentLyricIndex = 0

  const highLight_index = computed(() => {
    while (currentLyricIndex < musicStore.lyrics.length && musicStore.lyrics[currentLyricIndex].time <= props.curTime) {
      currentLyricIndex++
    }
    if (currentLyricIndex > 0 && contaner) {
      // 滚动到高亮歌词
      const containerRect = contaner.getBoundingClientRect();

      const currentLyricElement = contaner.querySelector(`.lyric-line:nth-child(${currentLyricIndex})`);
      if (currentLyricElement) {
        const lyricRect = currentLyricElement.getBoundingClientRect();
        const targetPosition =
        lyricRect.top - containerRect.top - containerRect.height / 2 + lyricRect.height / 2;
        contaner.scrollTop += targetPosition
      }
    }
    return currentLyricIndex
  })
</script>

<style>

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
