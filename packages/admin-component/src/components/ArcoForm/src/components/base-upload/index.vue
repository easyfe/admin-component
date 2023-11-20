<template>
    <form-item>
        <a-upload
            list-type="picture-card"
            :image-preview="true"
            :default-file-list="fileList"
            accept="image/*"
            :on-before-upload="onBeforeUpload"
            :on-before-remove="onBeforeRemove"
            v-bind="$attrs"
            @success="onSuccess"
        ></a-upload>
    </form-item>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import FormItem from "../form-item/index.vue";
import { FileItem, Message } from "@arco-design/web-vue";

defineOptions({
    name: "Upload"
});

const props = withDefaults(
    defineProps<{
        modelValue: string | string[];
        maxSize?: number;
    }>(),
    {
        modelValue: () => "",
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

const fileList = computed<any[]>(() => {
    if (Array.isArray(model.value)) {
        return model.value.map((item) => {
            return {
                uid: item,
                name: item,
                status: "done",
                url: item
            };
        });
    } else {
        return [
            {
                uid: model.value,
                name: model.value,
                status: "done",
                url: model.value
            }
        ];
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

function onBeforeRemove(file: FileItem): Promise<boolean> {
    return new Promise((resolve) => {
        const index = fileList.value.findIndex((item) => item.url === file.url);
        if (index > -1) {
            fileList.value.splice(index, 1);
            model.value = fileList.value.map((item) => item.url);
        }
        resolve(true);
    });
}

function onSuccess(file: FileItem): void {
    if (file.url) {
        if (Array.isArray(model.value)) {
            model.value.push(file.url);
        } else {
            model.value = file.url;
        }
    }
}
</script>

<style lang="less" scoped></style>
