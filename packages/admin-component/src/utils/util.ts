import { Modal } from "@arco-design/web-vue";
import { render, createVNode } from "vue";
import { useStore } from "./store";
export const modalShow = (ModalNode: any, opt: Record<string, any>) => {
    const container = document.createElement("div");
    const handleDestroy = () => {
        // 从 body 上移除组件
        render(null, container);
        document.body.removeChild(container);
    };
    // 创建 vnode
    const vnode = createVNode(ModalNode, {
        ...opt,
        visible: true,
        destroy: handleDestroy
    });
    //i18n 或 route相关
    if (Modal._context) {
        vnode.appContext = Modal._context;
    }
    // 使用 render 函数将 vnode 渲染为真实DOM并挂载到 body 上
    render(vnode, container);
    document.body.appendChild(container);
};
const { config } = useStore();

export function getI18nValue(key: string) {
    if (config.i18n?.global?.t) {
        return config.i18n.global?.t(key);
    }
    return key;
}
