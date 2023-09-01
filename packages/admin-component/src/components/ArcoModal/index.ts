import { App, Plugin } from "vue";
import ArcoModal from "./src/index.vue";

export const ArcoModalPlugin: Plugin = {
    install(app: App) {
        app.component("EfeArcoModal", ArcoModal);
    }
};

export { ArcoModal };
