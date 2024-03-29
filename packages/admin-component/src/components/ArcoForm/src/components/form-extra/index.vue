<template>
    <div class="form-extra">
        <template v-if="inputTips">
            <p v-if="inputTips.type === 'string'" class="tips">{{ inputTips.value }}</p>
            <component :is="inputTips.value" v-else />
        </template>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { VNode } from "vue";

defineOptions({
    name: "FormExtra"
});
const props = withDefaults(
    defineProps<{
        tips: string | (() => VNode | string);
    }>(),
    {
        tips: ""
    }
);

const inputTips = computed(() => {
    if (typeof props.tips === "string") {
        return { type: "string", value: props.tips };
    }
    if (typeof props.tips === "function") {
        const v = props.tips();
        if (typeof v === "string") {
            return { type: "string", value: v };
        } else {
            return { type: "vnode", value: v };
        }
    }
    return "";
});
</script>
<style lang="less" scoped>
.form-extra {
    width: 100%;
    text-align: left;
    .tips {
        width: 100%;
        font-size: 12px;
        text-align: left;
        margin-top: 4px;
        margin-bottom: 0;
    }
}
</style>
