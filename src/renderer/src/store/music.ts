import { LyricService } from "@renderer/service/lrcService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMusicStore = defineStore("music", () => {
  const lyrics = ref<any[]>([]);
  const name = ref("");
  const music_path = ref("");
  const lrc_path = ref("");
  const lyricService = new LyricService()
  async function setMusicByPath(path: string) {
    music_path.value = path;
    lrc_path.value = path.replace(/(flac|mp3)/, 'lrc')
    lyrics.value = await lyricService.loadLyrics(lrc_path.value)
  }
  return {
    lyrics,
    name,
    lrc_path,
    music_path,
    setLyrics(lyric: any[]) {
      lyrics.value = lyric;
    },
    setName(n: string) {
      name.value = n;
    },
    setMusicByPath
   };
})
