# Proof of Concept of Universal Components in Vue.js

## Directories

- `client-vue2.6` - Vue 2.6 app with `@vue/composition-api` plugin to test the universal component
- `client-vue2.7` - Vue 2.7 app with built-in Composition API to test the universal component
- `client-vue3` - Vue 3 app to test the universal component
- `component` - Universal component

## Notes

- It works with Vue 3, Vue 2.7 with built-in Composition API, and Vue <= 2.6 with `@vue/composition-api` plugin

- It uses `vue-demi` to redirect to the correct Vue API. All Vue imports should be made from `vue-demi` instead of `vue`

- While `vue-demi` auto installs `@vue/composition-api` in the Vue instance, the user still needs to install the dependency manually (only for Vue <= 2.6)

- Templates in SFC does not work, you need to manually return the template with a render function (using the `h` function)
  - Alternatively, you can use JSX to make the code more readable and easier to maintain. Check the JSX section to know more

- The second argument of the `h` function is the attributes object, which has a different structure in Vue 3 compared to Vue 2. So, for this to work, there's a custom `h` function (`h-demi.ts`) that uses `vue-demi` to detect if the client is Vue 2 or 3, and depending on the version it forwards the attributes argument in the correct structure (thanks @dnldsht
 for the base `h-demi.ts` file)

- While Vue 3 apps use the Scope ID set in the built JS file, Vue 2 apps don't, so scoped styles do not work on Vue 2. You must use unscoped styles with preferably exclusive names to avoid collision with your client app

- The component package must be published to `npm` before testing in the client apps. Vue has some reactivity bugs when you install the component locally (for example `yarn add ../component`)

## JSX

To make JSX work with the custom `h` function:

- First, downgrade the Vue version of the `component` package to 2.7.14. That's because the `@vue/babel-plugin-jsx` plugin for Vue 3 uses `createVNode` and `createTextVNode` functions that are only available in Vue 3.
  - Although you can change the function used by the plugin with the `pragma` option, it changes just the `createVNode` calls, not the `createTextVNode`
  - Also, the custom `h` function works like the Vue 2 version of the `h` function, because it's easier to adapt from Vue 2 to Vue 3 than the other way around. If we keep using Vue 3, then the plugin would compile to the Vue 3 version of the `h` function, which would be hard to adapt for Vue 2

- Then, we need to install `@vitejs/plugin-vue2-jsx`, which uses `@vue/babel-preset-jsx` (the Vue 2 version of the JSX plugin/preset), and configure it to use our custom `h` function:

```js
import path from 'path'
import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'

export default defineConfig({
  plugins: [
    vue2(),
    vue2Jsx({
      compositionAPI: {
        importSource: path.resolve('./src/h-demi.ts')
      }
    })
  ]
}
```

- Finally, change the `lang` attribute of your `script` tag to `jsx` or `tsx` and return the JSX (like in this example)