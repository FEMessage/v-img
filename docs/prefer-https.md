if `preferHttps` enable and the provider is not (none | self):<br>
1. //img-url will transform to https://img-url <br>
2. http://img-url will get warning on the console

```vue
<template>
  <div>
  <!-- will transform -->
    <v-img
     width="100"
     height="100"
     src="//via.digital.com/100"
     />

  <!-- warning -->
    <v-img
     width="100"
     height="100"
     src="http://via.digital.com/100"
     />

  <!-- nothing happen -->
    <v-img
     width="100"
     height="100"
     provider="none"
     src="http://via.digital.com/100"
     />

  <!-- nothing happen -->
    <v-img
     width="100"
     height="100"
     :preferHttps="false"
     src="http://via.digital.com/100"
     />

  </div>
</template>
```
