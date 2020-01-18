## 自动裁剪
如果传入 width 或 height 属性，会默认按照客户端的 devicePixelRatio（默认是 2） 获取合适大小的图片。节省流量的同时，保证图片最佳显示效果

```vue
<template>
  <div>
    <p> 原图 宽：400 高：267 </p>
    <v-img src="//image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg"/>
    <p> 按宽度等比缩放 宽：100 高：等比缩放<p/>
    <v-img src="//image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg" width="100"/>
    <p> 按高度等比缩放 高：100 宽：等比缩放<p/>
    <v-img src="//image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg" height="100"/>
    <p> 固定宽高剪裁，宽高：100，居中裁剪，不拉伸图片 </p>
    <v-img src="//image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg" height="100" width="100"/>
  </div>
</template>
```