与 v-img-preview 指令组合使用

v-img 内部提供了一个未经过裁剪的 url 属性(data-uncropped-src), 因此可以向 v-img-preview 指令传递这个参数

由于 v-img 内部不提供 @femessage/img-preview 组件, 因此需要安装并且通过 Vue.use(ImgPreview), 才能使用这个指令

```vue
<template>
  <v-img
    v-img-preview:data-uncropped-src
    :src="src"
    height="100"
    width="100"
  />
</template>

<script>
export default {
  data() {
    return {
      src: 'https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg'
    }
  }
}
</script>
```