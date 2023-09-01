<template>
    <a-form-item v-bind="attrs">
        <div :style="getSlotStyle">
            <slot></slot>
        </div>
        <template v-if="attrs.inputTips" #extra>
            <form-extra :tips="getStringValue(attrs.inputTips)"></form-extra>
        </template>
        <template v-if="attrs.labelTips" #label>
            {{ attrs.label }}
            <a-tooltip>
                <template #content>
                    <rich-text :content="getStringValue(attrs.labelTips)"></rich-text>
                </template>
                <icon-question-circle-fill />
            </a-tooltip>
        </template>
    </a-form-item>
</template>
<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { IconQuestionCircleFill } from "@arco-design/web-vue/es/icon";
import FormExtra from "../form-extra/index.vue";
import { RichText } from "@/components/RichText";

defineOptions({
    name: "FormItem"
});

const attrs: Record<string, any> = useAttrs();

const getSlotStyle = computed(() => {
    const { width } = attrs;
    // 如果传入了width，以传入的为准
    if (width) {
        return {
            width: Number.isNaN(Number(width)) ? width : `${width}px`
        };
    }
    // 如果没有传入width，并且是横向布局，宽度为100%
    if (attrs.layout === "row") {
        return {};
    }
    // 如果没有传入width，并且是纵向布局，设置默认宽度
    const defaultWidth: Record<string, string> = {
        input: "400px",
        textarea: "400px",
        inputNumber: "200px",
        date: "400px",
        time: "200px",
        editor: "800px",
        select: "400px"
    };
    return {
        width: defaultWidth[attrs.inputType] || "100%"
    };
});

function getStringValue(value: string | (() => string)) {
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "function") {
        return value();
    }
    return "";
}
</script>
<style scoped lang="less">
:deep(.arco-form-item-label) {
    color: #898b8f !important;
}
:deep(.arco-picker) {
    width: 100%;
}
</style>
