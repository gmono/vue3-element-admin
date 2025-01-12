import svga from "svgaplayerweb"

/**
 * 创建播放器
 */
export function useSVGAPlayer(loop_v = false) {
  let player = $shallowRef<svga.Player>();
  let parser = $shallowRef<svga.Parser>()
  let loop = ref(loop_v)
  /**
   * 播放svga文件
   * @param s url svga文件
   */
  function playani(s) {
    parser!.load(s, (video) => {
      player!.setVideoItem(video)
      player!.startAnimation();
    }, (e) => {
      alert("错误:" + e)
    })
  }

  /**
   * 初始化播放器
   * @param ele 播放器容器
   */
  function initSvga(ele) {
    player = new svga.Player(ele);
    // player.loops = 10;
    parser = new svga.Parser();
    player.onFinished(() => {
      if (!loop.value)
        player!.stopAnimation(true);
    })
  }
  let inited = computed(() => player != null)
  return {
    initSvga,
    playani,
    player: $$(player),
    parser: $$(player),
    inited,
    loop
  }
}
