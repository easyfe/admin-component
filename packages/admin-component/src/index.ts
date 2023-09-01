/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from "vue";

import { ArcoTablePlugin } from "./components/ArcoTable";
import { ArcoFormPlugin } from "./components/ArcoForm";
import { ArcoModalFormPlugin } from "./components/ArcoModalForm";
import { ArcoModalTablePlugin } from "./components/ArcoModalTable";
import { SvgPlugin } from "./components/Svg";
import { RichTextPlugin } from "./components/RichText";
import { ArcoModalPlugin } from "./components/ArcoModal";

const MYKitPlugin: Plugin = {
    install(app: App) {
        ArcoTablePlugin.install?.(app);
        ArcoFormPlugin.install?.(app);
        ArcoModalFormPlugin.install?.(app);
        ArcoModalTablePlugin.install?.(app);
        SvgPlugin.install?.(app);
        RichTextPlugin.install?.(app);
        ArcoModalPlugin.install?.(app);
    }
};

export default MYKitPlugin;

export * from "./components/ArcoTable";
export * from "./components/ArcoForm";
export * from "./components/ArcoModalForm";
export * from "./components/ArcoModalTable";
export * from "./components/Svg";
export * from "./components/RichText";
export * from "./components/ArcoModal";

import { formHelper } from "./utils/formHelper";
import { tableHelper } from "./utils/tableHelper";
import { ruleHelper } from "./utils/ruleHelper";

export { formHelper, tableHelper, ruleHelper };

import "./style/index.scss";
