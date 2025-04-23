import { App, Plugin, VNode } from "vue";
import ArcoModal from "./src/index.vue";
import { Modal } from "@arco-design/web-vue";
import { modalShow } from "../../utils/util";

type Options = {
    config?: InstanceType<typeof Modal>["$props"]; //modal配置
    content?: () => VNode;
    ok?: () => Promise<void>; //确定方法
};

export type ModalInstance = {
    destroy: () => void;
};

export const ArcoModalPlugin: Plugin = {
    install(app: App) {
        app.component("EfeArcoModal", ArcoModal);
    }
};

const ArcoModalShow = (opt: Options): ModalInstance => {
    return modalShow(ArcoModal, opt);
};

export { ArcoModal, ArcoModalShow };
