<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 20:05:45
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-01 20:02:42
 * @FilePath: \Q2Q\src\layouts\BYY.vue
 * @Description: BYY-LAYOUTS
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<template>
  <div po-r w-100 h-100>
    <header h-5>
      <page-header />
      <el-button type="primary">
        Primary
      </el-button>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <page-footer />
    </footer>
  </div>
</template>
