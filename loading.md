懒加载时，会先出现 loading 的图片；图片加载失败，会出现 reload 的占位图。
不同尺寸时的样式如下

```vue
<template>
  <div>
    <v-img width="64" height="64"/>
    <v-img width="128" height="128"/>
    <v-img width="375" height="375"/>
    <v-img width="100%" height="100"/>
    <v-img src="none" width="64" height="64"/>
    <v-img src="none" width="128" height="128"/>
    <v-img src="none" width="375" height="375"/>
    <v-img src="none" width="100%" height="100"/>
  </div>
</template>
```
