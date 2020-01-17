## 自定义 loading 和 error 时的图案有两种方法

### 注册组件时全局设置，适合全局修改
```javascript
import Vue from 'vue'
import VImg from '@femessage/v-img'

Vue.ues(VImg, {
  placeholder: 'https://deepexi-moby.oss-cn-shenzhen.aliyuncs.com/femessage/bean_eater.svg',
  error: 'https://deepexi-moby.oss-cn-shenzhen.aliyuncs.com/femessage/iconmonstr-refresh-6.svg'
})
```

### 使用组件时，单独给组件设置
自定义图案的使用逻辑： 组件属性设置 > 全局设置 > 默认设置

```vue
<template>
  <div>
    自定义 loading 图案 </br>
    <v-img width="375" height="375" placeholder="https://deepexi-moby.oss-cn-shenzhen.aliyuncs.com/femessage/bean_eater.svg"/></br>
    自定义 error 的图案 </br>
    <v-img src="none" width="375" height="375" error="https://deepexi-moby.oss-cn-shenzhen.aliyuncs.com/femessage/iconmonstr-refresh-6.svg"/>
  </div>
</template>
```
