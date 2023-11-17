import DefaultTheme from "vitepress/theme"; //引入默认主题
import "virtual:svg-icons-register";
import "@vitepress-demo-preview/component/dist/style.css";
import { AntDesignContainer, ElementPlusContainer, NaiveUIContainer } from "@vitepress-demo-preview/component";
import "./style.css";
import "@arco-design/web-vue/es/time-picker/style/css.js";

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component("demo-preview", AntDesignContainer);
    }
};
