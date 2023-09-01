<template>
    <form-item>
        <TinyEditor v-if="isDark" v-model="model" class="editor" :init="initEditor" />
        <TinyEditor v-else v-model="model" class="editor" :init="initEditor" />
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

defineOptions({
    name: "Editor"
});

const props = withDefaults(
    defineProps<{
        modelValue: string;
        placeholder?: string;
        theme?: "dark" | "light";
    }>(),
    {
        modelValue: () => "",
        placeholder: () => "请输入",
        theme: () => "light"
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

const editorInstantce = ref<any>(null);
const baseUrl = `https://syycdn.dongchali.net/static/syy-business-center-ide-v2`;

const isDark = computed(() => {
    return props.theme === "dark";
});

const initEditor = computed(() => {
    const baseSkinUrl = `https://cdn.staticfile.org/tinymce/6.5.1/skins`;
    return {
        language_url: `${baseUrl}/tinymce/langs/zh-Hans.js`,
        skin_url: `${baseSkinUrl}/ui/oxide${isDark.value ? "-dark" : ""}`,
        content_css: `${baseSkinUrl}/content/${isDark.value ? "dark" : "default"}/content.min.css`,
        language: "zh-Hans", // 语言类型
        placeholder: "在这里输入文字", // textarea中的提示信息
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
                    console.log("拉起图片弹窗");
                    // theFileManager({ limit: 0, confirm: onFileConfirm });
                }
            });
        }
    };
});

watch(
    () => isDark.value,
    () => {
        editorInstantce.value?.destroy?.();
    }
);

// const onFileConfirm = (fileList: any): void => {
//     for (const file of fileList) {
//         const filePath = file?.filePath || false;
//         if (filePath) {
//             tinymce.activeEditor.execCommand("mceInsertContent", false, `<img src="${filePath}" />`);
//         } else {
//             MMessage.error("添加图片失败！");
//         }
//     }
// };

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
