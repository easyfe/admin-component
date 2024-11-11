<template>
    <form-item>
        <a-select v-model="model" v-bind="$attrs" :options="privateOptions"> </a-select>
    </form-item>
</template>
<script lang="ts" setup>
import { computed, useAttrs } from "vue";
import FormItem from "../form-item/index.vue";
import { typeHelper } from "@ap/utils/typeHelper";

defineOptions({
    name: "Select"
});

const attrs: any = useAttrs();

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

const privateOptions = computed(() => {
    if (!attrs.options) {
        return [];
    }
    if (typeHelper.isFunction(attrs.options)) {
        return attrs.options();
    }
    return attrs.options;
});
</script>
<style lang="less" scoped></style>
