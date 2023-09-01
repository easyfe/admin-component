<!-- 正文开始 -->

# SVG 图片

支持多种方式使用 svg、png 图片，主要用于多色`icon`场景。

## 基础用法

支持 name/http 链接方式引入资源。

直接使用 name，需要安装[`vite-plugin-svg-icons`](https://www.npmjs.com/package/vite-plugin-svg-icons)插件,使 svg 图片能够自动引入。

http 方式，svg、png 图片都可以实现自定义颜色。

<preview path="./demo.vue"></preview>

## 属性

|   参数   |     说明      |     类型      | 可选值 | 默认值 | 是否必填 |
| :------: | :-----------: | :-----------: | :----: | :----: | :------: |
|  `name`  | 图片名称/链接 |    string     |   -    |  `无`  |    是    |
| `color`  |     颜色      |    string     |   -    |  `无`  |    是    |
| `width`  |     宽度      | string,number |   -    |  `无`  |    是    |
| `height` |     高度      | string,number |   -    |  `无`  |    是    |

## 事件
