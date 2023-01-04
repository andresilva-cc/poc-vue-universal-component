<script>
// import { InputCounter } from 'universal-input-counter'
// import 'universal-input-counter/dist/style.css'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { useMouse } from 'universal-input-counter'

export default {
  components: {
    // InputCounter,
    HelloWorld,
    TheWelcome
  },
  setup() {
    return useMouse()
  }
}
</script>

<template>
  <div id="app">
    <header>
      {{ x }} {{ y }}
      <!-- <InputCounter /> -->

      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />
      </div>
    </header>

    <main>
      <TheWelcome />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
