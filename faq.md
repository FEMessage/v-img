## 在 TypeScript 中指定组件的类型

```html
<template>
  <v-img ref="vImg" :src="url" />
</template>
<script lang="ts">
// 需要引入这个
// import { VImgType } from '@femessage/v-img'
export default {
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    (this.$refs.vImg as VImgType).src = 'src'
  },
}
</script>
```
