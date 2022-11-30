/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 20:09:05
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-30 20:09:21
 * @FilePath: \Q2Q\src\utils\dom.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
/**
 * @description: 获取节点信息 --- DOMRect转Object
 * @param {*} element 操作节点
 * @return {*}
 */
import _ from 'lodash'
/**
  * @description: 获取元素属性信息
  * @param {HTMLElement} element
  * @return {*}
  */
export const getBoundingClientRect = (element: HTMLElement) => {
  const { top, right, bottom, left, width, height, x, y } = element.getBoundingClientRect()
  return { top, right, bottom, left, width, height, x, y }
}

/**
  * @description: 字号转换方法
  * @return {*}
  */
export const setDomFontSize = (): void => {
  const width = document.documentElement.clientWidth || document.body.clientWidth
  const scale = 37.5 * Math.min((width <= 1200 ? 1200 : width) / 1920, 2)
  const fontsize = `${scale}px`;
  (document.getElementsByTagName('html')[0].style as any)['font-size'] = fontsize
}

const setDomFontSizeDebounce = _.debounce(setDomFontSize, 400)
window.addEventListener('resize', setDomFontSizeDebounce) // 浏览器加入收缩监听防抖，重新计算rem配置
