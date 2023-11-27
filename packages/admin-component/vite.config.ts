import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import AutoComponents from "unplugin-vue-components/vite";

function resolvePath(paths: string): string {
    return path.resolve(__dirname, paths);
}

export default defineConfig({
    resolve: {
        alias: {
            "@ap": resolvePath("src")
        }
    },
    build: {
        outDir: "dist",
        // minify: false,
        lib: {
            entry: `${resolvePath("src")}/index.ts`,
            name: require("./package.json").name,
            fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            // external: [/node_modules/],
            external: [
                ...Object.keys(require("./package.json").dependencies),
                ...Object.keys(require("./package.json").peerDependencies)
            ],
            output: {
                exports: "named",
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: "Vue"
                }
            }
        }
    },
    plugins: [
        AutoComponents({
            // dirs 指定组件所在位置，默认为 src/components
            dirs: [],
            // 配置需要将哪些后缀类型的文件进行自动按需引入
            extensions: ["vue"],
            deep: true,
            dts: "components.d.ts",
            directoryAsNamespace: false,
            globalNamespaces: [],
            directives: true,
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
            // 解析的 UI 组件库
            resolvers: [ArcoResolver({ sideEffect: true, resolveIcons: true })]
        }),
        vue(),
        dts()
    ]
});
