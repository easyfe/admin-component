import { ButtonProps, TableColumnInstance } from "@arco-design/web-vue";
import { _TableConfig } from "./types";

export type BaseTableColunmExtra = {
    enable?: boolean;
    width?: string | number;
    align?: "left" | "right" | "center";
    leftExtra?: string | number;
    rightExtra?: string | number;
    minWidth?: string | number;
    fixed?: true | "left" | "right";
    color?: string;
} & TableColumnInstance["$props"];
export type BaseTableColunmBtn = {
    /** 标签（按钮文字） */
    label: string | ((row: Record<string, any>, index: number) => string);
    /** 点击事件 */
    handler?: (row: any, index: number) => void;
    /** 是否展示，仅false时隐藏 */
    if?: boolean | ((row: Record<string, any>, index: number) => boolean);
    /** 是否禁用，仅true时禁用 */
    disabled?: boolean | ((row: Record<string, any>, index: number) => boolean);
    /** 按钮颜色 */
    color?: string;
} & ButtonProps;
const tableHelper = {
    /**
     * 创建table参数
     * @param params
     * @returns
     */
    create(params: _TableConfig): _TableConfig {
        return params;
    },
    /**
     * 时间列
     * @param label
     * @param prop
     * @param extra
     * @returns
     */
    date(
        label: string,
        prop: string,
        extra?: BaseTableColunmExtra & {
            format?: "YYYY-MM-DD" | "YYYY-MM-DD HH-mm-ss" | string;
            split?: string;
        }
    ): any {
        return {
            type: "date",
            label,
            prop,
            ...extra
        };
    },
    /**
     * 默认列
     * @param label
     * @param prop
     * @param extra
     * @returns
     */
    default(label: string, prop: string, extra?: BaseTableColunmExtra): any {
        return {
            type: "default",
            label,
            prop,
            ...extra
        };
    },
    /**
     * 字典列
     * @param label
     * @param prop
     * @param dictionary  value:label
     * @param extra
     * @returns
     */
    dictionary(
        label: string,
        prop: string,
        dictionary: ({ label?: string; value?: string | number } & Record<string | number, string | number>)[],
        extra?: BaseTableColunmExtra & {
            labelKey?: string;
            valueKey?: string;
        }
    ): any {
        return {
            type: "dictionary",
            label,
            prop,
            dictionary,
            ...extra
        };
    },
    /**
     * 插槽列
     * @param prop
     * @param extra
     * @returns
     */
    slot(prop: string, extra?: BaseTableColunmExtra): any {
        return {
            type: "slot",
            prop,
            ...extra
        };
    },
    /**
     * 操作列
     * @param label
     * @param btns
     * @param extra
     * @returns
     */
    btns(label: string, btns: BaseTableColunmBtn[], extra?: BaseTableColunmExtra): any {
        return {
            type: "btns",
            label,
            btns,
            ...extra
        };
    },
    /**
     * 状态列
     * @param label
     * @param prop
     * @param callback
     * @param extra
     * @returns
     */
    status(
        label: string,
        prop: string,
        handler: (item: Record<string, any>) => {
            status: "normal" | "processing" | "success" | "warning" | "danger";
            text: string;
        },
        extra?: BaseTableColunmExtra
    ): any {
        return {
            type: "status",
            label,
            prop,
            handler,
            ...extra
        };
    },
    /**
     * 链接列
     * @param label
     * @param prop
     * @param handler
     * @param extra
     * @returns
     */
    link(label: string, prop: string, handler: (item: Record<string, any>) => void, extra?: BaseTableColunmExtra): any {
        return {
            type: "link",
            handler,
            label,
            prop,
            ...extra
        };
    },
    /**
     * html列
     * @param label
     * @param prop
     * @param handler
     * @param extra
     * @returns
     */
    html(label: string, prop: string, extra?: BaseTableColunmExtra): any {
        return {
            type: "html",
            label,
            prop,
            ...extra
        };
    }
};

export { tableHelper };
