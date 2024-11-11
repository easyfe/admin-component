<template>
    <img v-if="isHttp" :src="props.name" :style="getUrlSvgStyle" />
    <svg v-else :class="svgClass" aria-hidden="true" :style="svgStyle">
        <use :xlink:href="iconName"></use>
    </svg>
</template>

<script lang="ts" setup>
import { hexToCSSFilter } from "hex-to-css-filter";
import { ref, computed } from "vue";

defineOptions({
    name: "Svg"
});

const getRealPx = (value: number | string): string => {
    if (!value) {
        return "";
    }
    if (Number.isNaN(Number(value))) {
        return value as string;
    }
    return `${value}px`;
};

const props = withDefaults(
    defineProps<{
        // 名称，链接
        name: string;
        // 类型
        type?: "svg" | "img";
        // 宽度
        width: number | string;
        // 高度
        height: number | string;
        // 颜色
        color?: string;
    }>(),
    {
        name: "",
        type: "svg",
        width: "",
        height: "",
        color: ""
    }
);

/** 拼接svg名称 */
const iconName = computed(() => {
    return `#svg-${props.name}`;
});
const svgClass = ref("svg-icon");
/** 拼接svg样式 */
const svgStyle = computed(() => {
    return {
        width: props.width ? getRealPx(props.width) : "inherit",
        height: props.height ? getRealPx(props.height) : "inherit",
        color: props.color || "inherit"
    };
});
const svgfilter = computed(() => {
    if (!isHttp.value) {
        return "";
    }
    if (!props.name || !props.color) {
        return "";
    }
    if (!/^(#)((?:[A-Fa-f0-9]{3}){1,2})$/.test(props.color)) {
        console.error("svg匹配hex颜色失败：", props.color);
        return "";
    }
    const cssFilter = hexToCSSFilter(props.color).filter.replace(";", "");
    return cssFilter;
});
const isHttp = computed(() => {
    if (props.type === "img") {
        return true;
    }
    return /^http(s)?:\/\/.*$/.test(props.name);
});
/** 设置url格式引入svg的样式 */
const getUrlSvgStyle = computed(() => {
    const v: any = {
        width: props.width ? getRealPx(props.width) : "inherit",
        height: props.height ? getRealPx(props.height) : "inherit"
    };
    if (isHttp.value) {
        v.filter = svgfilter.value;
    }
    return v;
});
</script>

<style lang="scss" scoped>
.svg-icon {
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
