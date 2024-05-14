<template>
    <form-item>
        <TinyEditor v-if="isDark" v-model="model" class="editor" :init="initEditor" />
        <TinyEditor v-else v-model="model" class="editor" :init="initEditor" />
        <a-upload style="display: none" v-bind="uploadProps" @success="onSuccess">
            <template #upload-button>
                <a-button ref="myUpload"></a-button>
            </template>
        </a-upload>
    </form-item>
</template>
<script lang="ts" setup>
import tinymce from "tinymce/tinymce";
import TinyEditor from "@tinymce/tinymce-vue";
import "tinymce/models/dom";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default";
import "tinymce/plugins/advlist";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import FormItem from "../form-item/index.vue";
import { FileItem } from "@arco-design/web-vue";

defineOptions({
    name: "Editor"
});

const props = withDefaults(
    defineProps<{
        modelValue: string;
        placeholder?: string;
        theme?: "dark" | "light";
        language?: string;
        uploadProps?: any;
    }>(),
    {
        modelValue: () => "",
        placeholder: () => "",
        theme: () => "light",
        language: () => "zh-Hans",
        uploadProps: () => ({})
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

const myUpload = ref<any>();

const editorInstantce = ref<any>(null);

const isDark = computed(() => {
    return props.theme === "dark";
});

const initEditor = computed(() => {
    const baseUrl = `//iots-cdnaccelerate.lshenergy.com/static/tinymce/6.7.2`;
    return {
        language_url: `${baseUrl}/langs/${props.language}.js`,
        skin_url: `${baseUrl}/skins/ui/oxide${isDark.value ? "-dark" : ""}`,
        content_css: `${baseUrl}/skins/content/${isDark.value ? "dark" : "default"}/content.min.css`,
        language: props.language, // 语言类型
        placeholder: props.placeholder, // textarea中的提示信息
        height: 500, // 高度
        menubar: false,
        branding: false,
        plugins: "image advlist lists",
        toolbar: [
            "undo redo bold italic underline forecolor backcolor lineheight alignleft aligncenter alignright bullist numlist fontsize customImage"
        ],
        content_style: "body {font-size: 14px;}",
        font_size_formats: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
        setup: (editor: any): any => {
            editorInstantce.value = editor;
            editor.ui.registry.addToggleButton("customImage", {
                icon: "image",
                onAction: () => {
                    myUpload.value?.$el.click();
                }
            });
        }
    };
});

function onSuccess(file: FileItem): void {
    if (file.url) {
        tinymce?.activeEditor?.execCommand("mceInsertContent", false, `<img src="${file.url}" />`);
    }
}

watch(
    () => isDark.value,
    () => {
        editorInstantce.value?.destroy?.();
    }
);

onMounted(() => {
    tinymce.init({});
});

onBeforeUnmount(() => {
    editorInstantce.value?.destroy?.();
});
</script>
<style lang="less" scoped>
.title {
    font-size: 14px;
    //color: #252931;
    font-weight: Regular;
    margin-bottom: 16px;
    color: #898b8f;
}
.tip {
    font-size: 14px;
    font-weight: 400;
    color: #898b8f;
    margin-bottom: 16px;
}
:deep(.tox-tinymce) {
    border-radius: 5px;
}
</style>
