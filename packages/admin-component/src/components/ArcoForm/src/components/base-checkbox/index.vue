<template>
    <form-item>
        <a-space direction="vertical" size="large">
            <a-checkbox-group v-model="model" class="checkbox" v-bind="$attrs">
                <a-checkbox v-for="(item, index) in props.options" :key="index" v-bind="item">{{
                    item[props.labelKey]
                }}</a-checkbox>
            </a-checkbox-group>
        </a-space>
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "CheckBox"
});

const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        modelValue: number[] | string[];
        options?: any[];
    }>(),
    {
        labelKey: "label",
        valueKey: "value",
        modelValue: () => [],
        options: () => []
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
<style lang="less" scoped></style>
