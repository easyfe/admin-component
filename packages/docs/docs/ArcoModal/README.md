<!-- 正文开始 -->

# 对话框

基于`arco-design`封装的对话框组件，做了一些统一配置：

-   点击蒙层禁止关闭
-   取消垂直居中，放置弹窗高度变化的时候位置移动
-   对话框标题`左侧`
-   对话框距离顶部`10vh`
-   okText 文本为`确认`
-   宽度为`700px`
-   content 最高高度为`60vh`

以上设置都可以传入`arco-modal组件`原 props 进行覆盖。

## 基础用法

<preview path="./demo.vue"></preview>

## 属性

继承了原组件的全部 Props，[点击查看](https://arco.design/vue/component/modal#API)。

新增一个 prop：

| 参数 |     说明     |         类型          |   默认值    | 是否必填 |
| :--: | :----------: | :-------------------: | :---------: | :------: |
| `ok` | 异步确认回调 | `() => Promise<void>\|void` | `undefined` |    否    |

当传入该 prop 的时候，将不会触发 event 的 ok 事件。

## 事件

继承了原组件的全部 Events，[点击查看](https://arco.design/vue/component/modal#API)。
