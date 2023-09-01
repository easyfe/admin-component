import { App, Plugin } from "vue";
import Svg from "./src/index.vue";

export const SvgPlugin: Plugin = {
    install(app: App) {
        app.component("EfeSvg", Svg);
    }
};

export { Svg };
