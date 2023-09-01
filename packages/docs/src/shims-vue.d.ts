/* eslint-disable */
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module "vue-dompurify-html";
declare module "weixin-js-sdk";
declare module "@caohenghu/vue-colorpicker";
declare module "vue-gpickr";

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.png";
declare module "*.svg";

declare module "vue-plyr";
