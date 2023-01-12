<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2023-01-12 10:26:48
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-12 16:02:23
 * @FilePath: \Q2Q\src\components\common\voxelizeImage.vue
 * @Description: 体素化图片
 * Copyright (c) 2023 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
import type { EChartsOption, EChartsType } from 'echarts'
import image from '~/assets/images/1631441365650.jpg'
import testHdr from '~/assets/hdr/test.hdr'
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
let imgData

let myChart: EChartsType | null = null

const config = {
  scale: 0.3,
  roughness: 0,
  metalness: 1,
  projection: 'orthographic',
  depthOfField: 4,
  lockY: false,
  move: true,
  sameColor: false,
  color: '#777',
  colorContrast: 1.2,
  lightIntensity: 1,
  lightColor: '#fff',
  lightRotate: 30,
  lightPitch: 40,
  AO: 1.5,
  showEnvironment: false,
  barNumber: 80,
  barBevel: 0.18,
  barSize: 1.2,
}

/**
 * @description: 图表配置
 */
const option: EChartsOption = {
  tooltip: {},
  backgroundColor: '#000',
  xAxis3D: { type: 'value' },
  yAxis3D: { type: 'value' },
  zAxis3D: { type: 'value', min: 0, max: 100 },
  grid3D: {
    show: false,
    viewControl: {
      projection: 'perspective',
      alpha: 45,
      beta: -45,
      panSensitivity: config.move ? 1 : 0,
      rotateSensitivity: config.lockY ? [1, 0] : 1,
      damping: 0.9,
      distance: 60,
    },
    postEffect: {
      enable: true,
      bloom: { intensity: 0.2 },
      screenSpaceAmbientOcclusion: {
        enable: true,
        intensity: 1.5,
        radius: 5,
        quality: 'high',
      },
      screenSpaceReflection: { enable: true },
      depthOfField: {
        enable: true,
        blurRadius: config.depthOfField,
        fstop: 10,
        focalDistance: 55,
      },
    },
    boxDepth: 100,
    boxHeight: 20,
    environment: 'none',
    light: {
      main: { shadow: true, intensity: 2 },
      ambientCubemap: { texture: testHdr, exposure: 2, diffuseIntensity: 0.2, specularIntensity: 1.5 },
    },
  },
}

/**
 * @description: 生成echarts配置
 * @param {*} params
 * @param {*} pixelData
 * @return {[r, g, b, 1]}
 */
const generateOption = (params: any, pixelData: any) => {
  const i = params.dataIndex
  let r = pixelData[i * 4] / 255
  let g = pixelData[i * 4 + 1] / 255
  let b = pixelData[i * 4 + 2] / 255
  const lum = 0.2125 * r + 0.7154 * g + 0.0721 * b
  r *= lum * config.colorContrast
  g *= lum * config.colorContrast
  b *= lum * config.colorContrast
  return [r, g, b, 1]
}

/**
 * @description: 图片更新方法
 * @param {Uint8ClampedArray} pixelData 8 位无符号整型固定数组
 * @param {number} width k宽度
 * @param {number} height 高度
 * @return {void}
 */
const updateData = (pixelData: Uint8ClampedArray, width: number, height: number) => {
  consola.info([pixelData, width, height])
  const data = new Float32Array((pixelData.length / 4) * 3)
  let off = 0
  for (let i = 0; i < pixelData.length / 4; i++) {
    const r = pixelData[i * 4]
    const g = pixelData[i * 4 + 1]
    const b = pixelData[i * 4 + 2]
    let lum = 0.2125 * r + 0.7154 * g + 0.0721 * b
    lum = (lum - 125) * config.scale + 50
    data[off++] = i % width
    data[off++] = height - Math.floor(i / width)
    data[off++] = lum
  }
  myChart?.setOption({
    grid3D: { boxWidth: (100 / height) * width },
    series: [{
      animation: false,
      type: 'bar3D',
      shading: 'realistic',
      realisticMaterial: { roughness: config.roughness, metalness: config.metalness },
      barSize: config.barSize,
      bevelSize: config.barBevel,
      silent: true,
      dimensions: ['x', 'y', 'z'],
      itemStyle: { color: config.sameColor ? config.color : (val: EChartsOption['series']) => { generateOption(val, pixelData) } },
      data,
    }],
  })
}

/**
 * @description: 图片加载方法
 * @param {HTMLImageElement} img 图片
 * @return {void}
 */
const loadImage = (img: HTMLImageElement) => {
  const height = (canvas.height = Math.min(config.barNumber, img.height))
  const aspect = img.width / img.height
  const width = (canvas.width = Math.round(height * aspect))
  ctx?.drawImage(img, 0, 0, width, height)
  imgData = ctx?.getImageData(0, 0, width, height)
  imgData?.data && (updateData(imgData?.data, width, height))
}

/**
 * @description: 图片对象
 */
const img: HTMLImageElement = new Image()
/**
 * @description: 图片加载完成方法
 * @return {void}
 */
img.onload = function () {
  loadImage(img)
}

/**
 * @description: 元素节点
 */
const voxelizeImageRef = ref<HTMLElement>()
onMounted(() => {
  voxelizeImageRef.value && (myChart = eCharts.init(voxelizeImageRef.value))
  img.src = image
  myChart?.setOption(option)
})
</script>

<template>
  <div w-100 h-100>
    <div ref="voxelizeImageRef" w-100 h-100 />
  </div>
</template>
