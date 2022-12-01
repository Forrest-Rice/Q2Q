/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 16:34:35
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-01 15:44:22
 * @FilePath: \Q2Q\vite.config.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import path from 'path'
import { fileURLToPath } from 'url'
import { env } from 'node:process'
import { defineConfig } from 'vite'
import generateSitemap from 'vite-ssg-sitemap'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism'
import LinkAttributes from 'markdown-it-link-attributes'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Icons from 'unplugin-icons/vite'
import Inspect from 'vite-plugin-inspect'
import pxToRem from 'postcss-pxtorem'
import autoPreFixer from 'autoprefixer'
import legacy from '@vitejs/plugin-legacy'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ViteRestart from 'vite-plugin-restart'
import Preview from 'vite-plugin-vue-component-preview'
import { viteZip } from 'vite-plugin-zip-file'
import basicSsl from '@vitejs/plugin-basic-ssl'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const markdownWrapperClasses = 'prose prose-sm m-auto text-left'
const loader_pxToRem = pxToRem({ rootValue: 37.5, unitPrecision: 2, propList: ['*'], exclude: /(node_module)/, selectorBlackList: [], mediaQuery: true, minPixelValue: 1 })
const loader_autoPreFixer = autoPreFixer({ overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', 'last 10 versions'], grid: true })

const viteRestartValue = (() => {
  try {
    return ViteRestart({ restart: ['vite.config.ts'] })
  }
  catch {
    return ViteRestart.default({ restart: ['vite.config.ts'] })
  }
})()

export default defineConfig({

  resolve: { alias: { '~/': `${path.resolve(__dirname, 'src')}/` } },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    Preview(),

    Pages({ extensions: ['vue', 'md'] }),

    Layouts({ layoutsDirs: 'src/layouts', defaultLayout: 'BYY' }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
        { animejs: [['default', 'anime']] },
        { consola: [['default', 'consola']] },
        { 'axios-mapper': [['default', 'HttpClient']] },
        { pinia: [['default', 'pinia']] },
        { nprogress: [['default', 'nprogress']] },
        { 'big.js': [['default', 'Big']] },
        { echarts: [['*', 'eCharts']] },
        { xlsx: [['default', 'XLSX']] },
        { mock: [['default', 'Mock']] },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store', 'src/utils'],
      vueTemplate: true,
      resolvers: [IconsResolver({ prefix: 'Icon' }), ElementPlusResolver()],
    }),

    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [
        IconsResolver({ enabledCollections: ['ep'] }),
        ElementPlusResolver(),
      ],
    }),

    viteMockServe({
      mockPath: 'mock',
      supportTs: false,
    }),

    Unocss(),

    Markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: { target: '_blank', rel: 'noopener' },
        })
      },
    }),

    // 渐进式网页配置 --- https://github.com/vite-pwa/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        theme_color: '#ffffff',
        icons: [],
      },
    }),

    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),

    Inspect(),

    // 旧版浏览器支持  https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),

    // 通过 HMR 提供 Vue 3 JSX 和 TSX 支持。 https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx
    vueJsx({
      exclude: /(node_module)/,
    }),

    // 提供自动重启服务器功能  https://github.com/antfu/vite-plugin-restart
    viteRestartValue,

    // 提供打包附带zip功能 https://github.com/Ssis53/vite-plugin-zip
    viteZip({
      folderPath: path.resolve(__dirname, 'dist'),
      outPath: path.resolve(__dirname, 'dist/'),
      zipName: 'DIST.zip',
      enabled: env.NODE_ENV === 'production',
    }),

    // 提供Https功能，自动创建和缓存一个自签名的证书 https://github.com/vitejs/vite-plugin-basic-ssl
    basicSsl(),
  ],

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() { generateSitemap() },
  },

  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: { inline: ['@vue', '@vueuse', 'vue-demi'] },
  },

  css: {
    preprocessorOptions: {
      scss: { additionalData: '@import \'~/assets/scss/mixin.scss\';' },
    },
    postcss: { plugins: [loader_pxToRem, loader_autoPreFixer] },
  },

  server: { port: 12138, strictPort: true, open: true, https: true, hmr: true },
})
