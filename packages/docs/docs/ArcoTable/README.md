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

|         参数         |          说明          |                         类型                          | 可选值 |   默认值    | 是否必填 |
| :------------------: | :--------------------: | :---------------------------------------------------: | :----: | :---------: | :------: |
|     filterConfig     |      筛选表单配置      |                 Record<string,any>[]                  |   -    |    `[]`     |    否    |
|      filterData      |         筛选值         | { tabsData?: string \| number } & Record<string, any> |   -    |    `{}`     |    否    |
| defaultSelectionData | 复选框默认选中数据集合 |                         any[]                         |   -    |    `[]`     |    否    |
|         req          |        构造请求        |                       TableReq                        |   -    | `undefined` |    否    |
|     tableConfig      |        表格配置        |                      TableConfig                      |   -    |    `[]`     |    是    |
|  list**(v-model)**   |      双向绑定数据      |                         any[]                         |   -    |    `[]`     |    否    |

### TableConfig

| 参数               | 说明           | 类型                                   | 默认值 | 必填 |
| ------------------ | -------------- | -------------------------------------- | ------ | ---- |
| maxHeight          | 表格高度       | string\|number\|'auto'                 | -      | 否   |
| showRefresh        | 显示刷新按钮   | boolean                                | true   | 否   |
| refreshFn          | 自定义刷新方法 | Function                               | -      | 否   |
| tlBtns             | 左上角标签     | \_Tabs                                 | -      | 否   |
| trBtns             | 右上角按钮     | \_Btn[]                                | -      | 否   |
| blBtns             | 左下角按钮     | \_Btn[]                                | -      | 否   |
| disableSelectedRow | 是否禁用选中行 | boolean                                | -      | 否   |
| columns            | 列表组         | \_TableColumn[]                        | -      | 否   |
| rowKey             | 数据存在的 key | string                                 | -      | 否   |
| totalKey           | 总数 key       | string                                 | -      | 否   |
| active             | 焦点 key       | string \| number                       | -      | 否   |
| sizeList           | 分页数量       | number[]                               | -      | 否   |
| size               | 当前分页       | number                                 | -      | 否   |
| pageKey            | 分页 page 变量 | string                                 | -      | 否   |
| sizeKey            | 分页 size 变量 | string                                 | -      | 否   |
| selectLimit        | 最大选择数量   | number                                 | -      | 否   |
| allowFlatten       | 是否允许平铺   | boolean                                | -      | 否   |
| arcoProps          | 表格 props     | `InstanceType<typeof Table>["$props"]` | -      | 是   |

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
| status   | 按钮的状态             | "success" \| "warning" \| "danger" \| "default"                                  | "default" | 否   |
| icon     | 按钮的图标             | string                                                                           | -         | 否   |
| handler  | 按钮的点击事件处理程序 | (row?: any, index?: number) => void                                              | -         | 否   |
| disabled | 指定按钮是否禁用       | boolean \| (() => boolean)                                                       | -         | 否   |
| hidden   | 指定按钮是否隐藏       | boolean                                                                          | -         | 否   |
| if       | 判断按钮是否显示       | (row?: any, index?: number) => boolean                                           | -         | 否   |
| collapse | 是否折叠到更多菜单     | boolean                                                                          | false     | 否   |

### TableColumn

| 参数       | 说明                 | 类型                                                                                                          | 默认值    | 必填 |
| ---------- | -------------------- | ------------------------------------------------------------------------------------------------------------- | --------- | ---- |
| type       | 列的类型             | "default" \| "slot" \| "btns" \| "image" \| "time" \| "dictionary" \| "date" \| "status" \| "link"            | "default" | 否   |
| prop       | 列的属性键           | string                                                                                                        | -         | 是   |
| label      | 列的标签             | string                                                                                                        | -         | 否   |
| if         | 指定列是否可见       | boolean                                                                                                       | -         | 否   |
| width      | 列的宽度             | number                                                                                                        | -         | 否   |
| btns       | 与列关联的按钮数组   | \_Btn[]                                                                                                       | -         | 否   |
| handler    | 列的点击事件处理程序 | (row?: any, index?: number) => void                                                                           | -         | 否   |
| align      | 列的水平对齐方式     | "left" \| "right" \| "center"                                                                                 | "left"    | 否   |
| fixed      | 指定列是否固定       | "left" \| "right"                                                                                             | -         | 否   |
| labelKey   | 字典标签的自定义键   | string                                                                                                        | -         | 否   |
| valueKey   | 字典值的自定义键     | string                                                                                                        | -         | 否   |
| sortable   | 指定列是否可排序     | TableSortable                                                                                                 | -         | 否   |
| dictionary | 列的字典             | ({ label?: string; value?: string \| number; color?: string } & Record<string \| number, string \| number>)[] | -         | 否   |
| leftExtra  | 列的左侧扩展         | string                                                                                                        | -         | 否   |
| rightExtra | 列的右侧扩展         | string                                                                                                        | -         | 否   |
| format     | 列的时间格式         | string                                                                                                        | -         | 否   |
| tooltip    | 列的工具提示配置     | Record<string, any>                                                                                           | -         | 否   |
| color      | 列的颜色             | string                                                                                                        | -         | 否   |
| rowKey     | 列的默认键           | string                                                                                                        | "id"      | 否   |
| split      | 列的时间格式分隔符   | string                                                                                                        | -         | 否   |

## 事件

|      事件名       |       说明       |              参数               |
| :---------------: | :--------------: | :-----------------------------: |
| update:filterData |   更新筛选数据   | filterData: Record<string, any> |
|    update:list    |   更新列表数据   |           list: any[]           |
|  selectionChange  | 选择项发生变化时 |         selected: any[]         |
|     rowClick      |   单击行时触发   |            row: any             |
|      export       |  导出数据时触发  |         exportData: any         |

## 外部调用 (defineExpose)

|       名称       |      说明       |                  参数说明                  |
| :--------------: | :-------------: | :----------------------------------------: |
|    `refresh`     |    刷新表格     | 外部通过 ref，调用该方法，可以主动刷新表格 |
| `resetSelection` |  重置所有选择   |     清空当前所有选择，包括跨页的选择项     |
|   `baseTable`    | arco-table 实例 |     可以通过该实例调用 arco-table 方法     |
