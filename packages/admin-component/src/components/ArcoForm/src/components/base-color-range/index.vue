<template>
    <form-item>
        <div class="base-color-reset"><a-button type="text" @click="reset">重置</a-button></div>
        <a-trigger class="color-range" position="lt" trigger="click" :popup-offset="10">
            <div class="base-color-wrapper" :trigger="['click']">
                <div class="base-color-inner" :style="'background:' + model"></div>
            </div>
            <template #content>
                <vue-gpickr v-model="model" />
            </template>
        </a-trigger>
    </form-item>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { VueGpickr, LinearGradient } from "vue-gpickr";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "ColorRange"
});

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({
            _angle: 0,
            _stops: [
                ["#eeeeee", 0],
                ["#eeeeee", 1]
            ],
            _limit: 2
        })
    },
    defaultColor: {
        type: Object,
        default: () => ({
            _angle: 0,
            _stops: [
                ["#eeeeee", 0],
                ["#eeeeee", 1]
            ],
            _limit: 2
        })
    }
});

const emits = defineEmits<{
    (e: "update:modelValue", data: any): void;
}>();

const reset = (): void => {
    emits(
        "update:modelValue",
        props.defaultColor ||
            new LinearGradient({
                angle: 0,
                stops: [
                    ["#eeeeee", 0],
                    ["#eeeeee", 1]
                ],
                limit: 2
            })
    );
};

const model = computed({
    get: () => {
        if (props.modelValue?._angle !== null && props.modelValue?._angle !== undefined) {
            return new LinearGradient({
                angle: props.modelValue?._angle,
                stops: [
                    [props.modelValue?._stops?.[0]?.[0], props.modelValue?._stops?.[0]?.[1]],
                    [props.modelValue?._stops?.[1]?.[0], props.modelValue?._stops?.[1]?.[1]]
                ],
                limit: props.modelValue?._limit
            });
        }
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});
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
.line {
    color: #999999;
    margin: 0 6px;
}
</style>
