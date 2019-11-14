使用指令 `v-img` 使得 background-image 可以获得与 v-img 本身一样的功能：

- 图片地址依然使用 `src` 参数，如 `v-img="{src: ''}"`
- 与 v-img 一样的参数设置，如 `v-img="{provider: 'qiniu'}"`


use `v-img` directive, let background-image's feature the same as v-img by itself

- image source just use `src` attribute likes `v-img="{src: ''}"`
- all from `v-img` parameters likes `v-img="{provider: 'qiniu'}"`

```vue
<template>
  <div v-img="{src}" style="width:200px;height:200px" />
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