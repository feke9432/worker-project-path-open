// src/service/lrcService.ts
export interface LyricLine {
  time: number; // 时间戳（以秒为单位）
  text: string; // 歌词文本
}

export class LyricService {
  async loadLyrics(url: string): Promise<LyricLine[]> {
    const response = await fetch(url);
    const lrcText = await response.text();
    let arr = this.parseLyrics(lrcText);
    return this.uniqueByText(arr);
  }

  parseLyrics(lrcText: string): LyricLine[] {
    const lines = lrcText.split('\n').map(line => line.trim()).filter(line => line.startsWith('['));
    const lyricLines: LyricLine[] = [];
    const seenTexts = new Set<string>(); // 用于存储已经出现过的歌词文本

    for (const line of lines) {
      const timeTags = line.match(/\[(\d{2}:\d{2}\.\d{2,3})\]/g) || [];
      const text = line.replace(/\[(\d{2}:\d{2}\.\d{2,3})\]/g, '').trim();

      if (!seenTexts.has(text)) {
        seenTexts.add(text);

        for (const timeTag of timeTags) {
          const timeMatch = timeTag.match(/(\d{2}):(\d{2})\.(\d{2,3})/);
          if (timeMatch) {
            const minutes = parseInt(timeMatch[1], 10);
            const seconds = parseInt(timeMatch[2], 10);
            const milliseconds = parseInt(timeMatch[3], 10);
            const time = minutes * 60 + seconds + milliseconds / 1000;
            lyricLines.push({ time, text });
          }
        }
      }
    }

    return lyricLines;
  }

  uniqueByText(items: any[]): any[] {
    const seen = {};
    const result: any[] = [];

    for (const item of items) {
        if (!seen[item.text]) {
            seen[item.text] = true;
            result.push(item);
        }
    }

    return result;
}
}
