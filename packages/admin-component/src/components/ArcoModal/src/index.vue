<template>
    <a-modal :visible="computedVisible" :on-before-ok="handleOk" v-bind="privateModalConfig" @cancel="handleCancel">
        <div class="base-modal-content">
            <component :is="props.content?.()" v-if="props.content" />
            <slot></slot>
        </div>
    </a-modal>
</template>
<script lang="ts" setup>
import type { Modal } from "@arco-design/web-vue";
import { VNode } from "vue";
import { computed, ref } from "vue";

defineOptions({
    name: "ArcModal"
});

const props = withDefaults(
    defineProps<{
        visible: boolean; //是否显示
        config?: InstanceType<typeof Modal>["$props"]; //modal配置
        ok?: () => Promise<void>; //确定方法
        //以下用于函数式调用
        destroy?: () => void; //销毁方法
        content?: () => VNode; //内容
    }>(),
    {
        visible: () => false,
        config: () => <any>{},
        ok: undefined,
        destroy: undefined,
        content: undefined
    }
);

const emits = defineEmits<{
    (e: "update:value", data: Record<string, any>): void;
    (e: "update:visible", data: boolean): void;
    (e: "ok"): void;
    (e: "cancel"): void;
}>();

const fnVisible = ref(true);

const computedVisible = computed(() => {
    return fnVisible.value && props.visible;
});

const privateModalConfig = computed<any>(() => {
    const defaultConfig = {
        maskClosable: false,
        alignCenter: false,
        titleAlign: "start",
        top: "10vh",
        width: "700px"
    };
    return { ...defaultConfig, ...props.config };
});

async function handleOk() {
    if (props.ok) {
        await props.ok();
    } else {
        emits("ok");
    }
    onClose();
}

function handleCancel() {
    emits("cancel");
    onClose();
}

function onClose() {
    emits("update:visible", false);
    //如果存在destroy方法，说明是函数式调用，需要手动销毁
    if (props.destroy) {
        fnVisible.value = false;
        setTimeout(() => {
            props.destroy?.();
        }, 500);
    }
}
</script>
<style lang="scss" scoped>
.base-modal-content {
    max-height: 60vh;
}
</style>
