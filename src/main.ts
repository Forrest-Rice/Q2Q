/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 16:34:35
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-11-30 20:04:16
 * @FilePath: \Q2Q\src\main.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

// import '@unocss/reset/tailwind.css'
import './styles/css/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)
consola.info(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(Previewer)
  },
)
