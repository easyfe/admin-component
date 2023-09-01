import { defineConfig } from "vitepress";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import { vitePluginForArco } from "@arco-plugins/vite-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import AutoComponents from "unplugin-vue-components/vite";
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Easyfe Admin Component",
    description: "A VitePress Site",
    base: "/admin-component/",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "Home", link: "/" },
            { text: "Examples", link: "/docs/ArcoTable/README" }
        ],

        sidebar: [
            {
                text: "基础组件",
                items: [
                    { text: "arco表格", link: "/docs/ArcoTable/README" },
                    { text: "arco表单", link: "/docs/ArcoForm/README" },
                    { text: "arco弹窗表格", link: "/docs/ArcoModalTable/README" },
                    { text: "arco弹窗表单", link: "/docs/ArcoModalForm/README" },
                    { text: "arco对话框", link: "/docs/ArcoModal/README" },
                    { text: "svg图片", link: "/docs/Svg/README" },
                    { text: "富文本", link: "/docs/RichText/README" }
                ]
            }
        ],

        socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }]
    },
    markdown: {
        theme: {
            light: "vitesse-light",
            dark: "vitesse-dark"
        },
        lineNumbers: true,
        config(md) {
            md.use(containerPreview);
            md.use(componentPreview);
        }
    },
    vite: {
        ssr: { noExternal: ["@arco-design/web-vue", "@easyfe/web-request", "@easyfe/admin-component"] },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "../src")
            }
        },
        plugins: [
            vitePluginForArco(),
            AutoComponents({
                // dirs 指定组件所在位置，默认为 src/components
                dirs: [],
                // 配置需要将哪些后缀类型的文件进行自动按需引入
                extensions: ["vue"],
                deep: true,
                dts: "src/components.d.ts",
                directoryAsNamespace: false,
                globalNamespaces: [],
                directives: true,
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
                // 解析的 UI 组件库
                resolvers: [ArcoResolver({ sideEffect: true, resolveIcons: true })]
            }),
            AutoImport({
                dts: "src/auto-imports.d.ts",
                imports: ["vue", "vue-router", "@vueuse/core"],
                resolvers: [ArcoResolver()]
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
                // 指定symbolId格式
                symbolId: "svg-[name]"
            })
        ]
    }
});
