import { App, Plugin } from "vue";
import { Modal } from "@arco-design/web-vue";
import ArcoModalForm from "./src/index.vue";
import { Form } from "@arco-design/web-vue";
import { modalShow } from "../../utils/util";
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
    return modalShow(ArcoModalForm, opt);
};

export { ArcoModalForm, ArcoModalFormShow };
