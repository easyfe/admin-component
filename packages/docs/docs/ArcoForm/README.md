<!-- 正文开始 -->

# 表单组件

基于`arco-design`封装的表单，结合日常使用，集合了以下组件：

-   checkbox（复选框）
-   color（颜色选择器）
-   color-range（渐变色选择器）
-   date（日期选择器，支持年、月、日）
-   editor（富文本编辑框）
-   input（文本输入框）
-   input-number（数字输入框）
-   radio（单选框）
-   select （下拉选择框）
-   span（表单分割提示）
-   switch（开关）
-   textarea（文本域）
-   time（时间选择框）
-   upload（上传组件）
-   cascader（级联选择组件）

如果以上不满足需求的，可以通过`slot`插槽使用自定义组件。

同时提供了以下方法，用于表单快速构建：

-   `formHelper`方法，用于生成各类组件对象、校验表单等
-   `ruleHelper`方法，用于生成校验类

如果以上方法不满足需求，可以自行定义符合`arco-design`表单项的对象。

## 基础用法

<preview path="./demo.vue"></preview>

## 属性

继承了原组件的全部 Props，[点击查看](https://arco.design/vue/component/form#API)。

新增了以下 props：

|           参数            |      说明      |         类型          | 可选值 |  默认值  | 是否必填 |
| :-----------------------: | :------------: | :-------------------: | :----: | :------: | :------: |
|          config           | 表单 item 配置 | Record<string, any>[] |   -    |   `[]`   |    是    |
| model-value **(v-model)** |     表单值     |  Record<string, any>  |   -    |   `{}`   |    是    |
|          layout           |    表单布局    |      column,row       |   -    | `column` |    否    |
