# canvas-water-button

## 介绍

canvas 波浪按钮插件, 点击任意 `DOM` 元素可显示渐变的波浪效果, 适用于所有框架场景.

## 在 Vue 中使用

1. 引入 js

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入
import "@/js/index";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```

2. 使用方式

```html
<template>
  <button
    class="btn btn-cancel k-water-btn"
    data-k-water-fill-color="#ccc"
    data-k-water-unconstant="true"
    @click="handleCancel"
  >
    <span>取消</span>
  </button>

  <button
    class="btn btn-confirm k-water-btn"
    data-k-water-fill-color="#fff"
    @click="handleConfirm"
  >
    <span>应用</span>
  </button>
</template>
<script>
  export default {};
</script>
```

1. 可配置项

| Name                    | Required | Description                                 |
| ----------------------- | -------- | ------------------------------------------- |
| k-water-btn             | true     | 在需要波浪按钮效果的 `DOM` 元素上添加该类名 |
| data-k-water-fill-color | false    | 波浪的颜色值                                |
| data-k-water-unconstant | false    | 关闭连续波浪(`连续点击会产生多个波浪`)      |
