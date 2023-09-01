import { App, Plugin } from "vue";
import ArcoTable from "./src/index.vue";

export const ArcoTablePlugin: Plugin = {
    install(app: App) {
        app.component("EfeArcoTable", ArcoTable);
    }
};

export { ArcoTable };
