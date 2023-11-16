import type {
    CheckboxOption,
    SelectProps,
    SelectOption,
    FieldRule,
    Input,
    Switch,
    InputNumber,
    Radio,
    RadioGroup,
    DatePicker,
    TimePicker,
    RangePicker,
    MonthPicker,
    YearPicker,
    QuarterPicker,
    WeekPicker,
    Textarea,
    Cascader,
    CascaderOption,
    TreeSelect,
    FormItem
} from "@arco-design/web-vue";
/** form表单元素基础配置 */
export type BaseFormExtra = {
    clearable?: boolean;
    rules?: FieldRule | FieldRule[];
    if?: boolean | ((...args: any) => boolean);
    span?: number;
    labelTips?: string | (() => string);
    inputTips?: string | (() => string);
    width?: string | number;
} & InstanceType<typeof FormItem>["$props"];
//radio选择器扩展
export type BaseFormRadioGroup = BaseFormExtra & {
    type?: "button" | "radio";
} & InstanceType<typeof RadioGroup>["$props"];
export type BaseFormRadio = InstanceType<typeof Radio>["$props"] & { label: string };
//颜色选择器扩展
export type BaseFormColor = {
    defaultColor?: string;
};
//文本输入框扩展
export type BaseFormInput = BaseFormExtra &
    InstanceType<typeof Input>["$props"] & {
        append?: string;
        prepend?: string;
        debounce?: number;
    };
//多文本输入框扩展
export type BaseFormTextarea = BaseFormExtra & InstanceType<typeof Textarea>["$props"];
//数字输入框扩展
export type BaseFormInputNumber = BaseFormExtra &
    InstanceType<typeof InputNumber>["$props"] & {
        append?: string;
        prepend?: string;
        debounce?: number;
    };
//多选扩展
type CheckboxGroupProps = {
    max?: number;
    options?: Array<string | number | CheckboxOption>;
    direction?: "horizontal" | "vertical";
    disabled?: boolean;
};
type CheckboxProps = CheckboxOption;
export type BaseFormCheckboxGroup = Partial<CheckboxGroupProps> &
    BaseFormExtra & { labelKey?: string; valueKey?: string };
export type BaseFormCheckbox = Partial<CheckboxProps>;
//下拉框
export type BaseFormSelect = BaseFormExtra & Partial<SelectProps>;
export type BaseFormSelectOptions = Partial<SelectOption>;
//级联选择器
export type BaseFormCascader = BaseFormExtra & InstanceType<typeof Cascader>["$props"];
export type BaseFormCascaderOptions = Partial<CascaderOption>;
//切换框
export type BaseFormSwitch = BaseFormExtra & InstanceType<typeof Switch>["$props"];
//日期选择框
export type DateType = "date" | "month" | "year" | "quarter" | "week" | "range";
export type BaseFormDate = BaseFormExtra &
    InstanceType<typeof DatePicker>["$props"] & {
        allowClear?: boolean;
        type: DateType;
    };
export type BaseFormDatePicker = BaseFormDate & InstanceType<typeof DatePicker>["$props"];
export type BaseFormMonthPicker = BaseFormDate & InstanceType<typeof MonthPicker>["$props"];
export type BaseFormYearPicker = BaseFormDate & InstanceType<typeof YearPicker>["$props"];
export type BaseFormQuarterPicker = BaseFormDate & InstanceType<typeof QuarterPicker>["$props"];
export type BaseFormWeekPicker = BaseFormDate & InstanceType<typeof WeekPicker>["$props"];
export type BaseFormRangePicker = BaseFormDate & InstanceType<typeof RangePicker>["$props"];
//时间选择框
export type BaseFormTime = BaseFormExtra & InstanceType<typeof TimePicker>["$props"];
//上传组件
export type BaseFormUpload = BaseFormExtra & {
    remove?: boolean;
    independent?: boolean;
    limit?: number;
    disabled?: boolean;
};
//树选择器
export type BaseTreeSelect = BaseFormExtra & InstanceType<typeof TreeSelect>["$props"];

//=====================以下为table相关=====================

import { TableSortable, ButtonProps } from "@arco-design/web-vue";
import type { Table } from "@arco-design/web-vue";

export type _TableColumn = {
    /** 类型，默认default */
    type?: "default" | "slot" | "btns" | "image" | "time" | "dictionary" | "date" | "status" | "link";
    /** prop */
    prop: string;
    /** 标签 */
    label?: string;
    /** 是否显示 */
    if?: boolean;
    /** 宽度 */
    width?: number;
    /** 按钮组 */
    btns?: _Btn[];
    /** 点击事件 */
    handler?: (row?: any, index?: number) => void;
    /** 水平对齐方式 */
    align: "left" | "right" | "center";
    /** 是否固定列 */
    fixed: "left" | "right";
    /** 字典自定义key */
    labelKey?: string;
    valueKey?: string;
    /** 是否支持排序 */
    sortable?: TableSortable;
    /** 字典 */
    dictionary?: ({ label?: string; value?: string | number } & Record<string | number, string | number>)[];
    /** 左侧扩展 */
    leftExtra?: string;
    /** 右侧扩展 */
    rightExtra?: string;
    /** 时间格式分割 */
    format?: string;
    tooltip?: Record<string, any>;
    /** 颜色 */
    color?: string;
    /** 默认key */
    rowKey: "id";
    /** 时间格式分割 */
    split?: string;
};

/** 表格配置定义 */
export type _TableConfig = {
    //是否自动最大高度
    autoMaxHeight?: boolean;
    /** 左上角标签 */
    tlBtns?: _Tabs;
    /** 右上角按钮 */
    trBtns?: _Btn[];
    /** 左下角按钮 */
    blBtns?: _Btn[];
    /** 是否禁用选中行 */
    disableSelectedRow?: boolean;
    /** 列表组 */
    columns?: _TableColumn[];
    //数据存在的key，比如返回数据是{code:200,data:{rows:[],total:100},msg:'xxx'}，则传递rows，如果还在rows下面层级，则传递rows.xxx.xx.xx，依此递归
    rowKey?: string;
    //总数key
    totalKey?: string;
    //焦点key，防止多个列表共存的情况下，重复加载（传入active的时候，必须同时传入key）
    active?: string | number;
    //分页数量
    sizeList?: number[];
    //当前分页
    size?: number;
    //分页page变量
    pageKey?: string;
    //分页size变量
    sizeKey?: string;
    //最大选择数量
    selectLimit?: number;
    //是否允许平铺
    allowFlatten?: boolean;
    //表格props
    arcoProps: InstanceType<typeof Table>["$props"];
};

/** 表格请求事件定义 */
export type _TableReq = {
    fn: (params: any) => Promise<any>;
    params?: Record<string, any>;
};

/** 按钮定义 */
export type _Btn = {
    /** 标签（按钮文字） */
    label: string | ((row: any) => string);
    /** 点击事件 */
    handler?: (item: _Btn) => void;
    /** 是否展示，仅false时隐藏 */
    if?: boolean | (() => boolean);
    /** 是否禁用，仅true时禁用 */
    disabled?: boolean | (() => boolean);
    /** 颜色 */
    color?: string;
    /** 加载文案 */
    loadingText?: string;
    /** 图标 */
    icon?: string;
} & ButtonProps;

/** 表格tabs定义 */
export type _Tabs = {
    /** 标题 */
    label: string;
    /** 值 */
    value: string | number;
    /** 计数 */
    count?: string | number;
    /** 是否显示 */
    if?: boolean;
}[];
