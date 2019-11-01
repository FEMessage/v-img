该例子展示了使用阿里云图片参数实现图片处理

This example shows using alibaba image service to process images.

```vue
<template>
  <div>
    <div>Before</div>
    <v-img :src="src" width="400"/>
    <br><br>
    <div>After</div>
    <v-img :src="src" extra-query="crop,x_4,y_-50,w_100,h_100,g_center" width="100"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: 'http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg'
    }
  }
}
</script>
```
