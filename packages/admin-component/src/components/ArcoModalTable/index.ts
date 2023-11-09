import { App, Plugin, render, h } from "vue";
import ArcoModalTable from "./src/index.vue";
import { Modal } from "@arco-design/web-vue";
import { ArcoTable } from "../ArcoTable/index";

type Options = {
    modalConfig?: InstanceType<typeof Modal>["$props"];
    tableConfig?: InstanceType<typeof ArcoTable>["$props"];
    defaultSelected?: any[];
    ok?: (data: any[]) => Promise<void> | void;
    filterChange?: (data: Record<string, any>) => void;
    export?: (data: Record<string, any>) => void;
} & Record<string, any>;

export const ArcoModalTablePlugin: Plugin = {
    install(app: App) {
        app.component("EfeArcoModalTable", ArcoModalTable);
    }
};

const ArcoModalTableShow = (opt: Options) => {
    const handleDestroy = () => {
        // 从 body 上移除组件
        render(null, document.body);
    };
    // 使用 h 函数创建 vnode
    const vnode = h(ArcoModalTable, {
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

export { ArcoModalTable, ArcoModalTableShow };
