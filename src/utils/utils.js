/**
 * 节流函数，(限制函数的执行频率)返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param immediate 是否立即执行 true 则先调用，false不先调用
 * @return {function}             返回客户调用函数
 */
export function throttle(func, wait, immediate) {
  let timeoutID
  let lastExec = 0

  function wrapper() {
    const self = this
    const elapsed = Number(new Date()) - lastExec
    const args = arguments

    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }
    }

    function clear() {
      timeoutID = undefined
    }

    function exec() {
      lastExec = Number(new Date())
      func.apply(self, args)
    }

    if (immediate && !timeoutID) {
      exec()
    }
    clearExistingTimeout()
    if (immediate === undefined && elapsed > wait) {
      exec()
    } else {
      timeoutID = setTimeout(immediate ? clear : exec, immediate === undefined ? wait - elapsed : wait)
    }
  }

  return wrapper
}

/**
 * 防抖函数，(限制函数的执行频率) 保证再一系列调用时间内，只调用一次
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @return {function}             返回客户调用函数
 */
export function debounce(func, wait) {
  return throttle(func, wait, false)
}
