<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-11 17:48:28
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-12 16:26:13
 * @FilePath: \Q2Q\src\components\TheMenu.vue
 * @Description:
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { EChartsOption, EChartsType } from 'echarts'

/**
 * @description: logo节点
 */
const logoRef = ref<HTMLElement>()

/**
 * @description: logo配置
 */
const logoOpt: EChartsOption = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        cursor: 'pointer',
        style: {
          text: 'BY',
          fontSize: 80,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          stroke: '#ced6e0',
          fill: '#ced6e0',
          shadowColor: '#ced6e0',
          lineWidth: 1,
          fontFamily: 'BRADHITC',
        },
        keyframeAnimation: {
          duration: 5000,
          loop: false,
          keyframes: [
            {
              percent: 0.7,
              style: { fill: 'transparent', lineDashOffset: 200, lineDash: [200, 0] },
            },
            { percent: 0.8, style: { fill: 'transparent' } },
            { percent: 1, style: { fill: '#2f3640' } },
          ],
        },
      },
    ],
  },
}

/**
 * @description: logo chart对象
 */
let logoChart: EChartsType | null = null

document.fonts.ready.then(() => {
  consola.info(111)
  logoRef.value && (logoChart = eCharts.init(logoRef.value))
  logoChart?.setOption(logoOpt)
})
</script>

<template>
  <div w-100 h-100>
    <div ref="logoRef" w-100 h-10 />
  </div>
</template>
