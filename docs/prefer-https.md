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
     width="101"
     height="101"
     src="http://via.digital.com/101"
     />

  <!-- nothing happen -->
    <v-img
     width="102"
     height="102"
     provider="none"
     src="http://via.digital.com/102"
     />

  <!-- nothing happen -->
    <v-img
     width="103"
     height="103"
     :preferHttps="false"
     src="http://via.digital.com/103"
     />

  </div>
</template>
```
