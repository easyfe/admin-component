<template>
    <form-item>
        <a-input-number v-model="model" v-bind="$attrs">
            <template v-if="$attrs.prepend" #prepend> {{ $attrs.prepend }} </template>
            <template v-if="$attrs.append" #append> {{ $attrs.append }} </template>
        </a-input-number>
    </form-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "InputNumber"
});

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
        min: Number
    }
});
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
