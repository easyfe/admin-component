import { App, Plugin } from "vue";
import ArcoModalTable from "./src/index.vue";
import { Modal } from "@arco-design/web-vue";
import { ArcoTable } from "../ArcoTable/index";
import { modalShow } from "../../utils/util";

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
    return modalShow(ArcoModalTable, opt);
};

export { ArcoModalTable, ArcoModalTableShow };
