不需要任何配置，即可拥有：
- 懒加载
- 优先返回webp
- 默认使用阿里云的图片优化服务

these features are out of box:
- lazyload
- webp first
- set up alibaba image transform services

```vue
<template>
  <div>
    <p>👇往下滑动，显示图片</p>
    <div v-for="_ in 2" class="padding" :style="{height}">height: {{height}}</div>
    <button @click="i = +!i">点击切换src</button>
    <v-img :src="srcs[i]" width="100"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: '500px',
      i: 0,
      srcs: [
        'https://image-demo.oss-cn-hangzhou.aliyuncs.com/panda.png',
        'https://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg',
      ]
    }
  }
}
</script>

<style>
.padding {
  background-color: green; 
  color: white; 
  font-size: 50px; 
  border: 1px solid yellow;
}
</style>
```
