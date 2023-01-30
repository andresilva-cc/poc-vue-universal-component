export default interface VNodeData {
  key?: string | number
  slot?: string
  scopedSlots?: { [key: string]: any | undefined }
  ref?: any
  refInFor?: boolean
  tag?: string
  staticClass?: string
  class?: any
  staticStyle?: { [key: string]: any }
  style?: { [key: string]: any}
  props?: { [key: string]: any }
  attrs?: { [key: string]: any }
  domProps?: { [key: string]: any }
  hook?: { [key: string]: Function }
  on?: { [key: string]: Function | Function[] }
  nativeOn?: { [key: string]: Function | Function[] }
  transition?: object
  show?: boolean
  inlineTemplate?: {
    render: Function
    staticRenderFns: Function[]
  }
  directives?: object[]
  keepAlive?: boolean
}
