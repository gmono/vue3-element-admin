<template>
  <div ref="ele">

  </div>
</template>

<script setup lang="ts">
import { useSVGAPlayer } from './svgaLib';

const { url } = $defineProps<{
  url: string
}>()
let ele = $shallowRef<HTMLDivElement>()
let control = useSVGAPlayer(true);
onMounted(() => {
  if (!control.inited.value && ele)
    control.initSvga(ele)

  seturl()
})

function seturl() {
  if (!control.inited.value && ele)
    control.initSvga(ele);
  if (control.inited && url)
    control.playani(url)
}
watch(() => url, v => {
  seturl()
})
</script>

<style scoped></style>
