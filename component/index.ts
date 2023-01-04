// export { default as InputCounter } from './src/index.vue'
import { ref, onMounted, onUnmounted } from 'vue-demi'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  const update = (e: MouseEvent) => {
    console.log('update')
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return {
    x,
    y
  }
}