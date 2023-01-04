<script setup lang="ts">
import { ref, computed } from 'vue-demi'

const string = ref('Universal Component')

const length = computed(() => {
  return string.value.length
})
</script>

<template>
  <div>
    <input v-model="string">
    <p>Length: {{ length }}</p>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  font-family: sans-serif;
}

input {
  padding: 10px 15px;
  border: none;
  border: 2px solid tomato;
  color: #000;
  border-radius: 5px;
}

input:focus {
  outline: none;
  border: 2px solid sienna;
}
</style>