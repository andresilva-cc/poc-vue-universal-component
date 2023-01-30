import { h as hDemi, isVue2 } from 'vue-demi'
import VNodeData from './vnode-data'

const transformEventHandlers = (eventHandlers: VNodeData['on']) => {
  if (!eventHandlers) {
    return {}
  }

  return Object.entries(eventHandlers).reduce((accumulator, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1)
    key = `on${key}`
    return { ...accumulator, [key]: handler }
  }, {})
}

function h(tag: string | Object | Function, data?: VNodeData, children?: any) {
  if (isVue2) {
    return hDemi(tag, data as any, children)
  }

  const hasData = data && !Array.isArray(data) && typeof data !== 'string'

  let transformedData = {}

  if (hasData) {
    const {
      on,
      attrs,
      props,
      domProps,
      ...others
    } = data
  
    const eventHandlers = transformEventHandlers(on)
    transformedData = {
      ...others,
      ...attrs,
      ...props,
      ...domProps,
      ...eventHandlers
    }
  }

  if (hasData) {
    return hDemi(tag, transformedData, children)
  }

  return hDemi(tag, data)
}

const slot = (s: any, attrs?: any) => {
  if (typeof s == 'function') return s(attrs)
  return s
}

export { slot, h }