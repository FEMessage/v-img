使用指令 `v-img` 可以对 background-image 进行图片优化。

与 v-img 一样的参数设置，如 `v-img="{src: '', provider: 'qiniu'}"`


use `v-img` directive, can let background-image to use webp。

`v-img="{src: '', provider: 'qiniu'}"`

```vue
<template>
  <div v-img="{src}" style="width:100px;height:100px;background-repeat:no-repeat;" />
</template>

<script>
export default {
  data() {
    return {
      src: 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/panda.png'
    }
  }
}
</script>
```
