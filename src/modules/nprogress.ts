/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 18:31:31
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-01 19:55:04
 * @FilePath: \Q2Q\src\modules\nprogress.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import NProgress from 'nprogress'
import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from) => {
      if (to.path !== from.path)
        NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
}
