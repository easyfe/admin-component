import { App, Plugin } from 'vue';
import RichText from './src/index.vue';

export const RichTextPlugin: Plugin = {
  install(app: App) {
    app.component('efe-rich-text', RichText);
  },
};

export {
  RichText,
};
