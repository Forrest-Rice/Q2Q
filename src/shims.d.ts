/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-16 13:55:55
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-12 14:27:36
 * @FilePath: \Q2Q\src\shims.d.ts
 * @Description: 
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
declare interface Window {
  // extend the window
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
  export default component
}

declare module 'postcss-px-to-viewport' {
  const content: any
  export default content
}

declare module 'postcss-pxtorem' {
  const content: any
  export default content
}

declare module 'vite-plugin-restart' {
  const content: any
  export { ViteRestart as default, content }

}

declare module '*.json.ref' {
  const content: Ref<any>
  export default content
}

declare module '*.ref' {
  const content: Ref<string>
  export default content
}


declare module "*.hdr"