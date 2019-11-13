使用指令 `v-img:background` 使得 background-image 可以获得与 v-img 本身一样的功能：

- 图片地址依然使用 `src` 参数
- 与 v-img 一样的参数设置，如 `v-img:background="{provider: 'qiniu'}"`


use `v-img:background` directive, let background-image's feature the same as v-img by itself

- image source just use `src` attribute
- all from `v-img` parameters likes `v-img:background="{provider: 'qiniu'}"`

```vue
<template>
  <div v-img:background :src="src" style="width:200px;height:200px" />
</template>

<script>
export default {
  data() {
    return {
      src: 'http://image-demo.oss-cn-hangzhou.aliyuncs.com/panda.png'
    }
  }
}
</script>
```