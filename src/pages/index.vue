<!--
 * @Author: BY by15242952083@outlook.com
 * @Date: 2022-11-30 18:32:00
 * @LastEditors: BY by15242952083@outlook.com
 * @LastEditTime: 2022-12-16 19:19:45
 * @FilePath: \Q2Q\src\pages\index.vue
 * @Description:
 * Copyright (c) 2022 by BY email: by15242952083@outlook.com, All Rights Reserved.
-->
<script lang="ts" setup>
const aa = ref<string>('')
const testPost = async () => {
  const res: any = await testCat()
  aa.value = res
}

testPost()
</script>

<template>
  <div v-text="aa" />
</template>
