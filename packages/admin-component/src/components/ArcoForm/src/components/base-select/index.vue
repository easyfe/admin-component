<template>
    <form-item>
        <a-select v-model="model" v-bind="$attrs"> </a-select>
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "Select"
});

const props = withDefaults(
    defineProps<{
        modelValue?: string | number | number[] | string[];
    }>(),
    {
        modelValue: [] as any
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
