import { h as hDemi, isVue2 } from 'vue-demi'

interface Options {
  attrs?: object
  props?: object
  domProps?: object
  on?: object
}

const adaptOnsV3 = (ons: object) => {
  if (!ons) return null
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1)
    key = `on${key}`
    return { ...ret, [key]: handler }
  }, {})
}

const h = (type: string | object, options: Options & any = {}, children?: any) => {
  if (isVue2) {
    return hDemi(type, options, children)
  }

  const hasOptions = !Array.isArray(options) && typeof options !== 'string'

  let params = {}

  if (hasOptions) {
    const { attrs, props, domProps, on, ...extraOptions } = options
  
    let ons = adaptOnsV3(on)
    params = { ...extraOptions, ...attrs, ...props, ...domProps, ...ons }
  }

  console.log(type)
  console.log(params)
  console.log(children)
  console.log('---')

  if (hasOptions) {
    return hDemi(type, params, children)
  }

  return hDemi(type, options)
}

const slot = (s: any, attrs?: any) => {
  if (typeof s == 'function') return s(attrs)
  return s
}
export { slot, h }

export default h