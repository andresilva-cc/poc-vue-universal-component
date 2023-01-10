import { h as hDemi, isVue2 } from 'vue-demi'

interface Options {
  attrs?: Object
  props?: Object
  domProps?: Object
  on?: Object
}

const adaptOnsV3 = (ons: Object) => {
  if (!ons) return null
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1)
    key = `on${key}`
    return { ...ret, [key]: handler }
  }, {})
}

const h = (type: String | Object, options: Options & any = {}, chidren?: any) => {
  if (isVue2)
    return hDemi(type, options, chidren)

  const { attrs, props, domProps, on, ...extraOptions } = options

  let ons = adaptOnsV3(on)
  const params = { ...extraOptions, ...attrs, ...props, ...domProps, ...ons }
  console.log(params)
  return hDemi(type, params, chidren)
}

const slot = (s: any, attrs?: any) => {
  if (typeof s == 'function') return s(attrs)
  return s
}
export { slot }

export default h