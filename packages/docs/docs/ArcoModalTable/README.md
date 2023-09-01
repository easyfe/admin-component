<!-- 正文开始 -->

# 弹窗表格组件

基于`arco-modal`组件和`arco-table`组件，封装了方便的弹窗表格。

支持组件式调用和函数式调用。

组件式调用：引入`ArcoModalTable`。

函数式调用：引入`ArcoModalTableShow`。

:::warning
arco-table 的 filter-data 和 props 里的 tableConfig，会通过引用关系相互绑定。

如果弹窗表格内，筛选框需要根据筛选值做不同的判断，可以通过 filterChange 方法，存一份新的数据到临时文件，进行判断（参考 arco-modal-form）。

:::

顶顶顶

## 基础用法

<preview path="./demo.vue"></preview>

## 属性

|         参数          |                          说明                           |                      类型                      | 可选值 |   默认值    | 是否必填 |
| :-------------------: | :-----------------------------------------------------: | :--------------------------------------------: | :----: | :---------: | :------: |
| visible **(v-model)** |                        是否可见                         |                    boolean                     |   -    |   `false`   |    是    |
|      modalConfig      | [弹窗配置](https://arco.design/vue/component/modal#API) |              Record<string, any>               |   -    |    `{}`     |    否    |
|      tableConfig      |                   arco-table 表格配置                   |              Record<string, any>               |   -    |    `[]`     |    否    |
|    defaultSelected    |                       默认选中项                        |        Recort<string,any>[] \| rowKey[]        |   -    |    `[]`     |    否    |
|        export         |                      导出请求结果                       |     ` (data: Record<string, any>) => void`     |   -    | `undefined` |    否    |
|     filterChange      |                   筛选框表单数据变化                    |     `(data: Record<string, any>) => void`      |   -    | `undefined` |    否    |
|          ok           |                        异步确认                         | `(data: Record<string, any>) => Promise<void>` |   -    | `undefined` |    否    |
