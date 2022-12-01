/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 17:18:42
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-01 19:47:01
 * @FilePath: \Q2Q\src\shims.d.ts
 * @Description: 
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
declare interface Window {
  // extend the window
}

declare module 'postcss-pxtorem' {
  const content: any
  export default content
}

declare module 'vite-plugin-zip-file' {
  const content: any
  const viteZip: any
  export { content, viteZip }
}

declare module '@vitejs/plugin-basic-ssl' {
  const content: any
  export default content 
}


declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  // const component:HTMLElement
  export default component
}

declare module 'postcss-px-to-viewport' {
  const content: any
  export default content
}

declare module 'swiper/vue' {
  import _Vue from 'vue'
  export class Swiper extends _Vue {}
  export class SwiperSlide extends _Vue {}
}


declare module 'postcss-pxtorem' {
  const content: any
  export default content
}

declare module 'vue-core-video-player' {
  const content: any
  export default content
}