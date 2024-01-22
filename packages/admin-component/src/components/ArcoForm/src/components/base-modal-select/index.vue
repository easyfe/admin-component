<template>
    <form-item>
        <a-input v-model="model" v-bind="$attrs" readonly>
            <template #append>
                <div class="my-append" @click="appendClick">
                    <icon-settings />
                </div>
            </template>
        </a-input>
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";

const attrs: any = useAttrs();

defineOptions({
    name: "Input"
});

const props = withDefaults(
    defineProps<{
        modelValue: string;
    }>(),
    {
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

function appendClick() {
    attrs?.modalClick?.();
}
</script>
<style lang="less" scoped>
:deep(.arco-input-wrapper) {
    background-color: var(--color-fill-2);
}
:deep(.arco-input-append) {
    padding: 0;
}
.my-append {
    cursor: pointer;
    padding: 0 12px;
    &:hover {
        color: rgb(var(--primary-6));
    }
}
</style>
