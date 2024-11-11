import { FormInstance } from "@arco-design/web-vue";
import type { TreeNodeData } from "@arco-design/web-vue";
import {
    BaseFormCheckbox,
    BaseFormCheckboxGroup,
    BaseFormColor,
    BaseFormExtra,
    BaseFormInput,
    BaseFormInputNumber,
    BaseFormRadio,
    BaseFormRadioGroup,
    BaseFormSelect,
    BaseFormSelectOptions,
    BaseFormSwitch,
    BaseFormTime,
    BaseFormUpload,
    BaseFormDatePicker,
    BaseFormMonthPicker,
    BaseFormQuarterPicker,
    BaseFormRangePicker,
    BaseFormWeekPicker,
    BaseFormYearPicker,
    DateType,
    BaseFormTextarea,
    BaseFormCascaderOptions,
    BaseFormCascader,
    BaseTreeSelect,
    BaseEditor,
    BaseModalSelect
} from "./types";
import { nextTick } from "vue";
import { getI18nValue } from "./util";

function genrateDateForm(label: string, field: string, dateType: DateType, extra?: Record<string, any>) {
    extra = {
        ...extra,
        type: dateType,
        placeholder:
            extra?.placeholder ??
            (dateType === "range" ? [getI18nValue("开始时间"), getI18nValue("结束时间")] : getI18nValue("请选择")),
        allowClear: extra?.allowClear ?? true
    };
    return {
        inputType: "date",
        label,
        field,
        ...extra
    };
}

const formHelper = {
    /**
     * 验证器
     * @param value
     * @returns
     */
    validate(value: FormInstance) {
        return new Promise((resolve, reject) => {
            value.validate().then((res) => {
                if (!res) {
                    resolve(true);
                } else {
                    nextTick(() => {
                        const isError = value.$el.getElementsByClassName("arco-form-item-message")[0];
                        isError.classList.add("shake-horizontal");
                        isError.scrollIntoView({
                            block: "center",
                            behavior: "smooth"
                        });
                        isError.addEventListener("animationend", () => {
                            isError.classList.remove("shake-horizontal");
                        });
                    });
                    reject(res);
                }
            });
        });
    },
    /**
     * 段落文案
     * @param value
     * @returns
     */
    section(value: string, extra?: BaseFormInput) {
        return {
            inputType: "section",
            value,
            ...extra
        };
    },
    /**
     * 普通文本
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    span(label: string, field: string, extra?: BaseFormInput) {
        extra = {
            ...extra
        };
        return {
            inputType: "span",
            label,
            field,
            ...extra
        };
    },
    /**
     * 普通输入框
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    input(label: string, field: string, extra?: BaseFormInput) {
        extra = {
            ...extra,
            allowClear: extra?.allowClear ?? true,
            placeholder: extra?.placeholder ?? getI18nValue("请输入")
        };
        return {
            inputType: "input",
            label,
            field,
            ...extra
        };
    },
    /**
     * textarea输入框
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    textarea(label: string, field: string, extra?: BaseFormTextarea) {
        extra = {
            ...extra,
            allowClear: extra?.allowClear ?? true,
            placeholder: extra?.placeholder ?? getI18nValue("请输入")
        };
        return {
            inputType: "textarea",
            label,
            field,
            ...extra
        };
    },
    /**
     * 日期输入框
     * @param label
     * @param field
     * @param extra
     */
    datePicker(label: string, field: string, extra?: BaseFormDatePicker) {
        return genrateDateForm(label, field, "date", extra);
    },
    monthPicker(label: string, field: string, extra?: BaseFormMonthPicker) {
        return genrateDateForm(label, field, "month", extra);
    },
    yearPicker(label: string, field: string, extra?: BaseFormYearPicker) {
        return genrateDateForm(label, field, "year", extra);
    },
    quarterPicker(label: string, field: string, extra?: BaseFormQuarterPicker) {
        return genrateDateForm(label, field, "quarter", extra);
    },
    weekPicker(label: string, field: string, extra?: BaseFormWeekPicker) {
        return genrateDateForm(label, field, "week", extra);
    },
    rangePicker(label: string, field: string, extra?: BaseFormRangePicker) {
        return genrateDateForm(label, field, "range", extra);
    },
    /**
     * 时间输入框
     * @param label
     * @param field
     * @param extra
     */
    time(label: string, field: string, extra?: BaseFormTime) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? getI18nValue("请选择"),
            allowClear: extra?.allowClear ?? true
        };
        return {
            inputType: "time",
            label,
            field,
            ...extra
        };
    },
    /**
     * 颜色选择器
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    color(label: string, field: string, extra?: BaseFormExtra & BaseFormColor) {
        return {
            inputType: "color",
            label,
            field,
            ...extra
        };
    },
    /**
     * 复选框
     * @param label
     * @param field
     * @param options
     * @param extra
     * @returns
     */
    checkbox(label: string, field: string, options: BaseFormCheckbox[], extra?: BaseFormCheckboxGroup) {
        return {
            inputType: "checkbox",
            label,
            options,
            field,
            ...extra
        };
    },
    /**
     * 单选框
     * @param label
     * @param field
     * @param options
     * @param extra
     * @returns
     */
    radio(label: string, field: string, options: BaseFormRadio[], extra?: BaseFormRadioGroup) {
        return {
            inputType: "radio",
            label,
            options,
            field,
            ...extra
        };
    },
    /**
     * 选择器
     * @param label
     * @param field
     * @param options
     * @param extra
     * @returns
     */
    select(
        label: string,
        field: string,
        options: BaseFormSelectOptions[] | (() => BaseFormSelectOptions[]),
        extra?: BaseFormSelect
    ) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? getI18nValue("请选择"),
            allowClear: extra?.allowClear ?? true
        };
        return {
            inputType: "select",
            label,
            options,
            field,
            ...extra
        };
    },
    /**
     * 级联选择器
     * @param label
     * @param field
     * @param options
     * @param extra
     * @returns
     */
    cascader(label: string, field: string, options: BaseFormCascaderOptions[], extra?: BaseFormCascader) {
        extra = {
            ...extra,
            placeholder: extra?.placeholder ?? getI18nValue("请选择"),
            allowClear: extra?.allowClear ?? true
        };
        return {
            inputType: "cascader",
            label,
            options,
            field,
            ...extra
        };
    },
    /**
     * 切换器
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    switch(label: string, field: string, extra?: BaseFormSwitch) {
        return {
            inputType: "switch",
            label,
            field,
            ...extra
        };
    },
    /**
     * 富文本
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    editor(label: string, field: string, extra?: BaseEditor) {
        extra = {
            ...extra
        };
        return {
            inputType: "editor",
            label,
            field,
            ...extra
        };
    },
    /**
     * 插槽
     * @param label
     * @param prop
     * @param extra
     * @returns
     */
    slot(field: string, extra?: BaseFormExtra) {
        return {
            inputType: "slot",
            field,
            ...extra
        };
    },
    /**
     * 数字输入框
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    inputNumber(label: string, field: string, extra?: BaseFormInputNumber) {
        extra = {
            ...extra,
            allowClear: extra?.allowClear ?? true,
            placeholder: extra?.placeholder ?? getI18nValue("请输入")
        };
        return {
            inputType: "inputNumber",
            label,
            field,
            ...extra
        };
    },
    /**
     * 树选择器
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    treeSelect(label: string, field: string, data: TreeNodeData[], extra?: BaseTreeSelect) {
        extra = {
            ...extra,
            allowClear: extra?.allowClear ?? true,
            placeholder: extra?.placeholder ?? getI18nValue("请输入")
        };
        return {
            inputType: "treeSelect",
            label,
            field,
            data,
            ...extra
        };
    },
    /**
     * 上传文件
     * @param label
     * @param field 绑定值key
     * @param extra
     * @returns
     */
    upload(label: string, field: string, extra?: BaseFormUpload) {
        return {
            inputType: "upload",
            label,
            field,
            ...extra
        };
    },
    /**
     * 图片上传
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    picUpload(label: string, field: string, extra?: BaseFormUpload) {
        return {
            inputType: "picUpload",
            label,
            field,
            ...extra
        };
    },
    /**
     * 弹窗选择器
     * @param label
     * @param field
     * @param extra
     * @returns
     */
    modalSelect(label: string, field: string, extra?: BaseModalSelect) {
        extra = {
            ...extra,
            allowClear: extra?.allowClear ?? true,
            placeholder: extra?.placeholder ?? getI18nValue("请选择")
        };
        return {
            inputType: "modalSelect",
            label,
            field,
            ...extra
        };
    }
};

export { formHelper };
