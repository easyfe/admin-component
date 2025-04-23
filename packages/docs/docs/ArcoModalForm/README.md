<!-- 正文开始 -->

# 弹窗表单组件

基于`arco-modal`组件和`arco-form`组件，封装了方便的弹窗表单。

支持组件式调用和函数式调用。

组件式调用：引入`ArcoModalForm`。

函数式调用：引入`ArcoModalFormShow`

:::warning
弹窗调用表单时，往往涉及到编辑操作，受引用关系影响，传入默认表单 value 数据的时候，请务必深拷贝一下。

如果编辑的时候，涉及到对表单项的动态显示/隐藏，可以传入 change 方法 prop，来进行编辑值的判断。
:::

## 基础用法

<preview path="./demo.vue"></preview>

## 属性

|         参数          |                          说明                           |                      类型                      | 可选值 |   默认值    | 是否必填 |
| :-------------------: | :-----------------------------------------------------: | :--------------------------------------------: | :----: | :---------: | :------: |
| visible **(v-model)** |                        是否可见                         |                    boolean                     |   -    |   `false`   |    是    |
|         value         |                        表单数据                         |              Record<string, any>               |   -    |    `{}`     |    否    |
|      modalConfig      | [弹窗配置](https://arco.design/vue/component/modal#API) |              Record<string, any>               |   -    |    `{}`     |    否    |
|      formConfig       |                        表单配置                         |             Record<string, any>[]              |   -    |    `[]`     |    否    |
|     arcoFormProps     | [弹窗配置](https://arco.design/vue/component/form#API)  |              Record<string, any>               |   -    |    `{}`     |    否    |
|        change         |                      表单数据变化                       |     `(data: Record<string, any>) => void`      |   -    | `undefined` |    否    |
|          ok           |                        表单确认                         | `(data: Record<string, any>) => Promise<void>` |   -    | `undefined` |    否    |
