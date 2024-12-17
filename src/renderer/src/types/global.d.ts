// 或者定义一个具体的类型
interface WeixinJSBridge {
  // 根据实际需求添加方法和属性
  call: (method: string, params: unknown, callback: (res: unknown) => void) => void
  // 其他方法和属性
  invoke: (e, t, n) => void
  on: (e, t) => void
  log: (e, t) => void
}

declare let WeixinJSBridge: WeixinJSBridge
