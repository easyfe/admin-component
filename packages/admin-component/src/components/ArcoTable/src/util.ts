import { BaseTableColunmBtn } from "@ap/utils/tableHelper";
import { typeHelper } from "@ap/utils/typeHelper";
import { _Btn } from "@ap/utils/types";

/** 检查右上角按钮是否显示 */
export function handleCheckBtnIf(btn: _Btn): boolean {
    if (typeHelper.isBoolean(btn.if)) {
        const e = btn.if as boolean;
        return e;
    } else if (typeHelper.isFunction(btn.if)) {
        const fn = btn.if as () => boolean;
        return fn();
    } else if (typeHelper.isUndefined(btn.if)) {
        return true;
    } else {
        console.warn("Button组的IF类型错误，请检查：", btn.if);
        return false;
    }
}
/** 检查右上角按钮是否禁用 */
export function handleCheckBtnDidsable(btn: _Btn): boolean {
    if (typeHelper.isBoolean(btn.disabled)) {
        const e = btn.disabled as boolean;
        return e;
    } else if (typeHelper.isFunction(btn.disabled)) {
        const fn = btn.disabled as () => boolean;
        return fn();
    } else if (typeHelper.isUndefined(btn.disabled)) {
        return false;
    } else {
        console.warn("Button组的DISABLED类型错误，请检查：", btn.disabled);
        return false;
    }
}
/** 检查操作列的按钮是否显示 */
export function handleCheckColumnBtnIf(item: Record<string, any>, index: number, btn: BaseTableColunmBtn): boolean {
    if (typeHelper.isBoolean(btn.if)) {
        const e = btn.if as boolean;
        return e;
    } else if (typeHelper.isFunction(btn.if)) {
        const fn = btn.if as (item: Record<string, any>, index: number) => boolean;
        return fn(item, index);
    } else if (typeHelper.isUndefined(btn.if)) {
        return true;
    } else {
        console.warn("按钮组的IF类型错误，请检查：", btn.if);
        return false;
    }
}

/** 检查操作列的按钮是否禁用 */
export function handleCheckColumnBtnDidsable(
    item: Record<string, any>,
    index: number,
    btn: BaseTableColunmBtn
): boolean {
    if (typeHelper.isBoolean(btn.disabled)) {
        const e = btn.disabled as boolean;
        return e;
    } else if (typeHelper.isFunction(btn.disabled)) {
        const fn = btn.disabled as (item: Record<string, any>, index: number) => boolean;
        return fn(item, index);
    } else if (typeHelper.isUndefined(btn.disabled)) {
        return false;
    } else {
        console.warn("按钮组的DISABLE类型错误，请检查：", btn.disabled);
        return false;
    }
}

/** 设置操作列按钮的label */
export function handleSetColumnBtnLabel(item: Record<string, any>, index: number, btn: BaseTableColunmBtn): string {
    if (typeHelper.isString(btn.label)) {
        const e = btn.label as string;
        return e;
    } else if (typeHelper.isFunction(btn.label)) {
        const fn = btn.label as (item: Record<string, any>, index: number) => string;
        return fn(item, index);
    } else {
        console.warn("按钮组的LABEL类型错误，请检查：", btn.label);
        return "";
    }
}

/**
 * arr1数组是否包含arr2数组
 * @param arr1
 * @param arr2
 */
export function arrIncludes(arr1: any[], arr2: any[]): number {
    let total = 0;
    for (const item of arr2) {
        if (arr1.includes(item)) {
            total = total + 1;
        }
    }
    return total;
}
