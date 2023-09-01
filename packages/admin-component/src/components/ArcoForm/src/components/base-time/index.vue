<template>
    <form-item>
        <a-time-picker v-model="model" v-bind="$attrs" />
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "Time"
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
.n-time-picker {
    width: 100%;
}
</style>
