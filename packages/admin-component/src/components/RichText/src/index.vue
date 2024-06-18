<template>
    <div v-dompurify-html="content" class="rich-text"></div>
</template>

<script lang="ts" setup>
import { buildVueDompurifyHTMLDirective } from "vue-dompurify-html";

defineOptions({
    name: "RichText"
});
const vDompurifyHtml = buildVueDompurifyHTMLDirective();
defineProps({
    content: {
        type: String,
        default: ""
    }
});
</script>

<style lang="scss" scoped>
:deep(img) {
    max-width: 100%;
}
.rich-text {
    white-space: normal;
}
</style>
