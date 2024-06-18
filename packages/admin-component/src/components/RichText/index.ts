import { App, Plugin } from "vue";
import RichText from "./src/index.vue";

export const RichTextPlugin: Plugin = {
    install(app: App) {
        app.component("EfeRichText", RichText);
    }
};

export { RichText };
