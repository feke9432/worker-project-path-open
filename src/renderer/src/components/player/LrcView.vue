<template>
  <div id="lyrics-container" ref="lyricContainer">
    <div class="lyric-line" :class="highLight_index === index" v-for="(line, index) in musicStore.lyrics" :key="index">{{ line.text }}</div>
  </div>
</template>

<script setup>
  import { ref, computed  } from "vue";
  import {useMusicStore} from '@renderer/stores/music'

  defineProps(['curTime'])
  const lyricContainer = ref<HTMLDivElement>(null)

  const musicStore = useMusicStore()
  let currentLyricIndex = 0
  const highLight_index = computed(() => {
    while (currentLyricIndex < musicStore.lyrics.length && musicStore.lyrics[currentLyricIndex].time <= curTime) {
      currentLyricIndex++
    }
    if (currentLyricIndex > 0) {
      // 滚动到高亮歌词
      const containerRect = lyricContainer.value.getBoundingClientRect()
      const currentLyricElement = lyricContainer.value.querySelector(`.lyric-line:nth-child(${currentLyricIndex})`);
      if (currentLyricElement) {
        const lyricRect = currentLyricElement.getBoundingClientRect();
        const targetPosition =
        lyricRect.top - containerRect.top - containerRect.height / 2 + lyricRect.height / 2;
        lyricContainer.value.scrollTop += targetPosition
      }
    }
    return currentLyricIndex
  })
</script>
