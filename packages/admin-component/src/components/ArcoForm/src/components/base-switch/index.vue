<template>
    <form-item>
        <a-switch v-model="model" v-bind="$attrs" />
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "Switch"
});

const props = withDefaults(
    defineProps<{
        modelValue: any;
    }>(),
    {
        modelValue: false
    }
);
const emits = defineEmits<{
    (e: "update:modelValue", data: boolean): void;
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
