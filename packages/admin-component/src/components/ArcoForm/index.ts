import { App, Plugin } from "vue";
import ArcoForm from "./src/index.vue";

export const ArcoFormPlugin: Plugin = {
    install(app: App) {
        app.component("EfeArcoForm", ArcoForm);
    }
};

export { ArcoForm };
