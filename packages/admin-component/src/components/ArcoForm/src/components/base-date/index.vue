<template>
    <form-item>
        <a-date-picker v-if="$attrs.type === 'date'" v-model="model" v-bind="$attrs" />
        <a-month-picker v-if="$attrs.type === 'month'" v-model="model" v-bind="$attrs" />
        <a-year-picker v-if="$attrs.type === 'year'" v-model="model" v-bind="$attrs" />
        <a-quarter-picker v-if="$attrs.type === 'quarter'" v-model="model" v-bind="$attrs" />
        <a-week-picker v-if="$attrs.type === 'week'" v-model="model" v-bind="$attrs" />
        <a-range-picker v-if="$attrs.type === 'range'" v-model="model" v-bind="$attrs" />
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "Date"
});

const props = withDefaults(
    defineProps<{
        modelValue?: any;
    }>(),
    {
        modelValue: null
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
.n-date-picker {
    width: 100%;
}
</style>
