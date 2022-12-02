/*
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 17:31:14
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-02 15:09:21
 * @FilePath: \Q2Q\cypress.config.ts
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
 */
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    chromeWebSecurity: false,
    specPattern: 'cypress/e2e/**/*.spec.*',
    supportFile: false,
  },
})
