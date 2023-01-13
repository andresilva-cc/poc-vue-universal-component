<script lang="tsx">
import { h, ref, computed, defineComponent } from 'vue-demi'

export default defineComponent({
  setup() {
    const string = ref('Universal Component')
    
    const length = computed(() => {
      return string.value.length
    })

    function handleInput(event: any) {
      console.log('event: ', event)
      console.log('event.target.value: ', event.target.value)
      console.log('string.value: ', string.value)
      string.value = event.target.value
      console.log('string.value: ', string.value)
    }

    return () => (
      <div class="universal-input-counter">
        <input
          class="universal-input-counter__input"
          value={string.value}
          onInput={handleInput}
        />
        <p>Length: {length.value}</p>
      </div>
    )

  }
})
</script>

<style>
.universal-input-counter {
  text-align: center;
  font-family: sans-serif;
}

.universal-input-counter__input {
  padding: 10px 15px;
  border: none;
  border: 2px solid tomato;
  color: #000;
  border-radius: 5px;
}

.universal-input-counter__input:focus {
  outline: none;
  border: 2px solid sienna;
}
</style>