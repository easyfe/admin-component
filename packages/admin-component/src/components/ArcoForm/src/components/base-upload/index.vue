<template>
    <form-item>
        <a-upload
            v-model:file-list="model"
            :on-before-upload="onBeforeUpload"
            v-bind="$attrs"
            @exceed-limit="onExceedLimit"
        ></a-upload>
    </form-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";
import { FileItem, Message } from "@arco-design/web-vue";
import "@arco-design/web-vue/es/upload/style/css";
import "@arco-design/web-vue/es/image/style/css";

defineOptions({
    name: "Upload"
});

const props = withDefaults(
    defineProps<{
        modelValue: FileItem[];
        maxSize?: number;
    }>(),
    {
        modelValue: () => [],
        maxSize: 0
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

function formatFileSize(size: number): string {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;
    const gigabyte = megabyte * 1024;

    if (size < kilobyte) {
        return size + " B";
    } else if (size < megabyte) {
        return (size / kilobyte).toFixed(2) + " KB";
    } else if (size < gigabyte) {
        return (size / megabyte).toFixed(2) + " MB";
    } else {
        return (size / gigabyte).toFixed(2) + " GB";
    }
}

function onBeforeUpload(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (props.maxSize && file.size > props.maxSize * 1024) {
            const maxValue = formatFileSize(props.maxSize * 1024);
            Message.error(`文件大小不能超过${maxValue}`);
            reject(false);
        }
        resolve(true);
    });
}

function onExceedLimit() {
    Message.error("超出文件数量限制");
}
</script>

<style lang="less" scoped></style>
