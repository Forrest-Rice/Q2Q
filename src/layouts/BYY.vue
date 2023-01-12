<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 20:05:45
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2023-01-12 10:14:28
 * @FilePath: \Q2Q\src\layouts\BYY.vue
 * @Description: BYY-LAYOUTS
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<template>
  <div bg="#2f3542" class="byy-layouts-box" po-r w-100 h-100>
    <el-container w-100 h-100 class="el-container-box">
      <el-aside width="200px">
        <the-menu />
      </el-aside>
      <el-container>
        <el-header> <the-header /> </el-header>
        <el-main>
          <RouterView />
        </el-main>
        <el-footer><the-footer /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>

</style>
