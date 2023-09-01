<template>
    <form-item>
        <a-space>
            <a-trigger position="lt" trigger="click" :popup-offset="10">
                <div class="base-color-wrapper" :trigger="['click']">
                    <div class="base-color-inner" :style="{ background: model }"></div>
                </div>
                <template #content>
                    <color-picker
                        class="color"
                        theme="light"
                        :color="model"
                        :sucker-hide="true"
                        :sucker-canvas="suckerCanvas"
                        :sucker-area="suckerArea"
                        @changeColor="changeColor"
                    />
                </template>
            </a-trigger>
            <div class="base-color-reset"><a-button type="text" @click="reset">重置</a-button></div>
        </a-space>
    </form-item>
</template>
<script lang="ts" setup>
import colorPicker from "@caohenghu/vue-colorpicker";
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

const suckerCanvas = ref(null);
const suckerArea = ref([]);

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
    set: (newVal) => {
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
</style>
