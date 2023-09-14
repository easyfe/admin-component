<template>
    <form-item>
        <a-space>
            <a-trigger position="lt" trigger="click" :popup-offset="10">
                <div class="base-color-wrapper" :trigger="['click']">
                    <div class="base-color-inner" :style="{ background: model }"></div>
                </div>
                <template #content>
                    <color-picker v-model:pureColor="model" disable-history is-widget format="hex"></color-picker>
                </template>
            </a-trigger>
            <!-- <div class="base-color-wrapper" :trigger="['click']">
                <color-picker v-model:pureColor="model" disable-history></color-picker>
            </div> -->
            <div class="base-color-reset">
                <a-button type="text" @click="reset">重置</a-button>
            </div>
        </a-space>
    </form-item>
</template>
<script lang="ts" setup>
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import { computed, onMounted, ref } from "vue";
import { rgbaToHex } from "./untils";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "Color"
});

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    defaultColor: {
        type: String,
        default: ""
    }
});

onMounted(() => {
    if (!props.modelValue) reset();
});

const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const reset = (): void => {
    emits("update:modelValue", props.defaultColor);
};

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal: any) => {
        emits("update:modelValue", newVal);
    }
});

const changeColor = (color: any): void => {
    // model.value = color.hex;
    const { r, g, b, a } = color.rgba;
    const rgba = `rgba(${r},${g},${b},${a})`;
    model.value = rgbaToHex(rgba);
};
</script>
<style lang="less" scoped>
.base-color-reset {
    margin-right: 10px;
}
.base-color-wrapper {
    cursor: pointer;
    width: 62px;
    height: 32px;
    border-radius: 2px;
    padding: 2px;
    border: 1px solid #e9e9e9;
    .base-color-inner {
        height: 100%;
        border-radius: 2px;
    }
}
// :deep(.vc-color-wrap) {
//     margin-right: 0;
//     width: 100%;
//     height: 100%;
// }
</style>
