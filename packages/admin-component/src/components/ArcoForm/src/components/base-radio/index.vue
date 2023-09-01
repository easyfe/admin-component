<template>
    <form-item>
        <div v-if="pixel" class="pixel">{{ model }}px</div>
        <a-space direction="vertical" size="large">
            <a-radio-group v-model="model" class="radio" :type="type" :disabled="disabled" @change="change">
                <a-radio
                    v-for="(item, index) in props.options"
                    :key="index"
                    :value="item[props.valueKey]"
                    :disabled="item.disabled"
                    >{{ item[props.labelKey] }}</a-radio
                >
            </a-radio-group>
        </a-space>
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "Radio"
});

const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        show?: boolean;
        modelValue: number | string | boolean;
        options: Record<string, any>[];
        type?: "button" | "radio";
        pixel?: boolean;
        disabled?: boolean;
        change?: (value: string | number | boolean, ev: Event) => any;
    }>(),
    {
        modelValue: "",
        labelKey: "label",
        valueKey: "value",
        type: "button",
        show: true,
        pixel: false,
        options: () => [],
        disabled: false,
        change: (value, ev) => undefined
    }
);
const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});
</script>
<style lang="less" scoped>
:deep(.mo-form-item-content) {
    .pixel {
        flex: 1;
        font-size: 14px;
        color: #55585c;
        font-weight: bold;
    }
}
</style>
