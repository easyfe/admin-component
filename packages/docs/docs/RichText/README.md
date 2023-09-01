<!-- 正文开始 -->

# 富文本

用于替代`v-html`标签，提供了安全的渲染方式，避免`xss`攻击。

基于[`vue-dompurify-html`](https://www.npmjs.com/package/vue-dompurify-html)封装。

## 基础用法

<preview path="./demo.vue"></preview>

## 属性

|   参数    |    说明    |  类型  | 可选值 | 默认值 | 是否必填 |
| :-------: | :--------: | :----: | :----: | :----: | :------: |
| `content` | 富文本内容 | string |   -    |  `空`  |    否    |
