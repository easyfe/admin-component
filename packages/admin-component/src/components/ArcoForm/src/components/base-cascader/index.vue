<template>
    <form-item>
        <a-cascader v-model="model" v-bind="$attrs"> </a-cascader>
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "Cascader"
});

const props = withDefaults(
    defineProps<{
        labelKey?: string;
        valueKey?: string;
        modelValue?: string | number | number[] | string[];
    }>(),
    {
        labelKey: "label",
        valueKey: "value",
        options: [] as any,
        modelValue: ""
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
