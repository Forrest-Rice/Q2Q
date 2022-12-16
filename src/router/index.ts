/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-12-16 17:47:41
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-16 17:50:21
 * @FilePath: \Q2Q\src\router\index.ts
 * @Description: router
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import type { Router } from 'vue-router'

// eslint-disable-next-line import/no-mutable-exports
let router: Router | null = null

/**
 * @description: serRouter
 * @param {Router} r Router
 * @return {void}
 */
export const setRouter = (r: Router): void => {
  router = r
}

export { router }
