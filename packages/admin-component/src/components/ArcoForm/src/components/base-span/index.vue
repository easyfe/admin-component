<template>
    <form-item>
        <rich-text :content="model"></rich-text>
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";
import { RichText } from "@/components/RichText";

defineOptions({
    name: "Span"
});

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    defaultValue: {
        type: String,
        default: ""
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
<style lang="less" scoped>
// :deep(.n-form-item-blank) {
//     flex-direction: column;
// }
</style>
