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