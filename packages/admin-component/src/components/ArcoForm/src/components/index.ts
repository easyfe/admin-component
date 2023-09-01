import { defineAsyncComponent } from "vue";

const list: Record<string, any> = {
    span: defineAsyncComponent(() => import("./base-span/index.vue")),
    input: defineAsyncComponent(() => import("./base-input/index.vue")),
    textarea: defineAsyncComponent(() => import("./base-textarea/index.vue")),
    inputNumber: defineAsyncComponent(() => import("./base-input-number/index.vue")),
    date: defineAsyncComponent(() => import("./base-date/index.vue")),
    time: defineAsyncComponent(() => import("./base-time/index.vue")),
    switch: defineAsyncComponent(() => import("./base-switch/index.vue")),
    color: defineAsyncComponent(() => import("./base-color/index.vue")),
    colorRange: defineAsyncComponent(() => import("./base-color-range/index.vue")),
    checkbox: defineAsyncComponent(() => import("./base-checkbox/index.vue")),
    radio: defineAsyncComponent(() => import("./base-radio/index.vue")),
    select: defineAsyncComponent(() => import("./base-select/index.vue")),
    editor: defineAsyncComponent(() => import("./base-editor/index.vue")),
    uploadPic: defineAsyncComponent(() => import("./base-upload/index.vue"))
};

export default list;
