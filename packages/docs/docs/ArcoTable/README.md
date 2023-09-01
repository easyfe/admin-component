<!-- 正文开始 -->

# 表格组件

基于`arco-design`封装的表格，增加了以下封装：

-   顶部筛选框（基于 arco-form）
-   左上侧 tabs
-   右上侧操作按钮
-   左下侧全选&操作按钮
-   右下侧分页
-   数据自动请求&分页配置，无需重复写请求、分页逻辑
-   对外数据暴露，方便进行部分数据特殊处理

同时提供了以下方法，用于表单快速构建：

-   `tableHelper`方法，用于生成各类组件对象、校验表单等

如果以上方法不满足需求，可以自行定义符合`arco-design`表格项的对象。

## 基础用法

<preview path="./demo.vue"></preview>

## 属性

|         参数         |             说明             |                        类型                        | 可选值 |         默认值         | 是否必填 |
| :------------------: | :--------------------------: | :------------------------------------------------: | :----: | :--------------------: | :------: |
|     filterConfig     |         筛选表单配置         |                Record<string,any>[]                |   -    |          `[]`          |    否    |
|      filterData      |            筛选值            | { tabsData?: string ,number } &Record<string, any> |   -    |          `{}`          |    否    |
| defaultSelectionKeys |   复选框默认选中 key 集合    |                 number[]\|string[]                 |   -    |          `[]`          |    否    |
|         req          |           构造请求           |     `{fn:Function,params:Record<string,any>}`      |   -    |          `[]`          |    否    |
|     tableConfig      |           表格配置           |                 Record<string,any>                 |   -    |          `[]`          |    否    |
|        rowKey        |       请求结果列表 key       |                       string                       |   -    |          `[]`          |    否    |
|       totalKey       |           总数 key           |                       string                       |   -    |          `[]`          |    否    |
|        active        | 焦点 key，多个表格共存时传入 |                       string                       |   -    |      `undefined`       |    否    |
|       sizeList       |           分页筛选           |                      number[]                      |   -    | `[10, 20, 30, 40, 50]` |    否    |
|         size         |         当前分页数量         |                       number                       |   -    |          `20`          |    否    |
|  list**(v-model)**   |         双向绑定数据         |                       any[]                        |   -    |          `[]`          |    否    |
|       pageKey        |        分页 page 变量        |                       string                       |   -    |         `page`         |    否    |
|       sizeKey        |        分页 size 变量        |                       string                       |   -    |         `size`         |    否    |
|     selectLimit      |         复选最大数量         |                       number                       |   -    |          `0`           |    否    |
|     allowFlatten     |        平铺+列表布局         |                      boolean                       |   -    |        `false`         |    否    |

### TableConfig

| 参数               | 说明                                                           | 类型                                   | 默认值 | 必填 |
| ------------------ | -------------------------------------------------------------- | -------------------------------------- | ------ | ---- |
| tabs               | 左上角的选项卡                                                 | \_Tabs                                 | -      | 否   |
| btns               | 右上角的按钮数组                                               | \_Btn[]                                | -      | 否   |
| bats               | 左下角的按钮数组                                               | \_Btn[]                                | -      | 否   |
| disableSelectedRow | 指定是否禁用选择行                                             | boolean                                | -      | 否   |
| tableProps         | [arco-table 配置](https://arco.design/vue/component/table#API) | `InstanceType<typeof Table>["$props"]` | -      | 否   |
| columns            | 表格的列列表                                                   | \_TableColumn[]                        | -      | 否   |

### TableReq

| 参数   | 说明             | 类型                            | 默认值 | 必填 |
| ------ | ---------------- | ------------------------------- | ------ | ---- |
| fn     | 请求所调用的函数 | `(params: any) => Promise<any>` | -      | 是   |
| params | 请求的参数       | Record<string, any>             | -      | 否   |

### Btn

| 参数     | 说明                   | 类型                                                                             | 默认值    | 必填 |
| -------- | ---------------------- | -------------------------------------------------------------------------------- | --------- | ---- |
| label    | 按钮的标签             | string                                                                           | -         | 是   |
| type     | 按钮的类型             | "primary" \| "success" \| "warning" \| "danger" \| "info" \| "text" \| "default" | "default" | 否   |
| icon     | 按钮的图标             | string                                                                           | -         | 否   |
| handler  | 按钮的点击事件处理程序 | () => void                                                                       | -         | 否   |
| disabled | 指定按钮是否禁用       | boolean                                                                          | -         | 否   |
| hidden   | 指定按钮是否隐藏       | boolean                                                                          | -         | 否   |

### TableColumn

| 参数       | 说明                 | 类型                                                                                               | 默认值    | 必填 |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------- | --------- | ---- |
| type       | 列的类型             | "default" \| "slot" \| "btns" \| "image" \| "time" \| "dictionary" \| "date" \| "status" \| "link" | "default" | 否   |
| prop       | 列的属性键           | string                                                                                             | -         | 是   |
| label      | 列的标签             | string                                                                                             | -         | 否   |
| if         | 指定列是否可见       | boolean                                                                                            | -         | 否   |
| width      | 列的宽度             | number                                                                                             | -         | 否   |
| btns       | 与列关联的按钮数组   | \_Btn[]                                                                                            | -         | 否   |
| handler    | 列的点击事件处理程序 | (row?: any, index?: number) => void                                                                | -         | 否   |
| align      | 列的水平对齐方式     | "left" \| "right" \| "center"                                                                      | -         | 是   |
| fixed      | 指定列是否固定       | "left" \| "right"                                                                                  | -         | 是   |
| labelKey   | 字典标签的自定义键   | string                                                                                             | -         | 否   |
| valueKey   | 字典值的自定义键     | string                                                                                             | -         | 否   |
| sortable   | 指定列是否可排序     | TableSortable                                                                                      | -         | 否   |
| dictionary | 列的字典             | ({ label?: string; value?: string \| number } & Record<string \| number, string \| number>)[]      | -         | 否   |
| leftExtra  | 列的左侧扩展         | string                                                                                             | -         | 否   |
| rightExtra | 列的右侧扩展         | string                                                                                             | -         | 否   |
| format     | 列的时间格式         | string                                                                                             | -         | 否   |
| tooltip    | 列的工具提示配置     | Record<string, any>                                                                                | -         | 否   |
| color      | 列的颜色             | string                                                                                             | -         | 否   |
| rowKey     | 列的默认键           | "id"                                                                                               | -         | 是   |
| split      | 列的时间格式分隔符   | string                                                                                             | -         | 否   |

## 外部调用 defineExpose

|  事件名   |   说明   |                  参数说明                  |
| :-------: | :------: | :----------------------------------------: |
| `refresh` | 刷新表格 | 外部通过 ref，调用该方法，可以主动刷新表格 |
