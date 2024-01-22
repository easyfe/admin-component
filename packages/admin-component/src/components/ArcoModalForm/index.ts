import { App, Plugin, render, h } from "vue";
import { Modal } from "@arco-design/web-vue";
import ArcoModalForm from "./src/index.vue";
import { Form } from "@arco-design/web-vue";
type Options = {
    value?: Record<string, any>;
    modalConfig?: InstanceType<typeof Modal>["$props"];
    formConfig?: Record<string, any>[];
    arcoFormProps?: Partial<InstanceType<typeof Form>["$props"]>;
    ok?: (data: Record<string, any>) => Promise<void> | void;
    change?: (data: Record<string, any>) => void;
};
export const ArcoModalFormPlugin: Plugin = {
    install(app: App) {
        app.component("EfeArcoModalForm", ArcoModalForm);
    }
};

const ArcoModalFormShow = (opt: Options) => {
    const handleDestroy = () => {
        // 从 body 上移除组件
        render(null, document.body);
    };
    // 使用 h 函数创建 vnode
    const vnode = h(ArcoModalForm as any, {
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

export { ArcoModalForm, ArcoModalFormShow };
