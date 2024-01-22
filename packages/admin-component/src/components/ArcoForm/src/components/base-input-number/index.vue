<template>
    <form-item>
        <a-input-number v-model="privateValue" v-bind="$attrs" @input="onInput" @clear="onClear">
            <template v-if="$attrs.prepend" #prepend> {{ $attrs.prepend }} </template>
            <template v-if="$attrs.append" #append> {{ $attrs.append }} </template>
        </a-input-number>
    </form-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";
import { debounce } from "lodash-es";

defineOptions({
    name: "InputNumber"
});

const props = withDefaults(
    defineProps<{
        modelValue?: number;
        debounce?: number;
    }>(),
    {
        modelValue: undefined,
        debounce: undefined
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

const privateValue = ref();

watch(
    () => props.modelValue,
    (newVal) => {
        privateValue.value = newVal;
    },
    {
        immediate: true
    }
);

function onInput(e?: number) {
    if (props.debounce) {
        debounceChange(e);
        return;
    }
    model.value = e;
}

const debounceChange = debounce((e) => {
    model.value = e;
}, props.debounce);

function onClear() {
    model.value = undefined;
}
</script>
<style lang="less" scoped></style>
