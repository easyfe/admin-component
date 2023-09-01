<template>
    <a-modal :visible="computedVisible" :on-before-ok="handleOk" v-bind="privateModalConfig" @cancel="handleCancel">
        <div class="base-modal-content">
            <slot></slot>
        </div>
    </a-modal>
</template>
<script lang="ts" setup>
import type { Modal } from "@arco-design/web-vue";
import { computed } from "vue";

defineOptions({
    name: "ArcModal"
});

const props = withDefaults(
    defineProps<{
        visible: boolean; //是否显示
        config?: InstanceType<typeof Modal>["$props"]; //modal配置
        ok?: () => Promise<void>; //确定方法
    }>(),
    {
        visible: () => false,
        config: () => <any>{},
        ok: undefined
    }
);

const emits = defineEmits<{
    (e: "update:value", data: Record<string, any>): void;
    (e: "update:visible", data: boolean): void;
    (e: "ok"): void;
}>();

const computedVisible = computed({
    get() {
        return props.visible;
    },
    set(val) {
        emits("update:visible", val);
    }
});

const privateModalConfig = computed<any>(() => {
    const defaultConfig = {
        maskClosable: false,
        alignCenter: false,
        titleAlign: "start",
        top: "10vh",
        okText: "确定",
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
    onClose();
}

function onClose() {
    emits("update:visible", false);
}
</script>
<style lang="scss" scoped>
.base-modal-content {
    max-height: 60vh;
}
</style>
