import { App, Plugin, render, h, VNode } from "vue";
import ArcoModal from "./src/index.vue";
import { Modal } from "@arco-design/web-vue";

type Options = {
    config?: InstanceType<typeof Modal>["$props"]; //modal配置
    content?: () => VNode;
    ok?: () => Promise<void>; //确定方法
};

export const ArcoModalPlugin: Plugin = {
    install(app: App) {
        app.component("EfeArcoModal", ArcoModal);
    }
};
const ArcoModalShow = (opt: Options) => {
    const handleDestroy = () => {
        // 从 body 上移除组件
        render(null, document.body);
    };
    // 使用 h 函数创建 vnode
    const vnode = h(ArcoModal as any, {
        ...opt,
        visible: true,
        destroy: handleDestroy
    });
    //i18n 或 route相关
    if (Modal._context) {
        vnode.appContext = Modal._context;
    }
    // 使用 render 函数将 vnode 渲染为真实DOM并挂载到 body 上
    render(vnode, document.body);
};
export { ArcoModal, ArcoModalShow };
