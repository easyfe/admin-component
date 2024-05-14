import { reactive } from "vue";

const config = reactive({ i18n: <null | any>null }); // 使用reactive创建响应式对象
export const useStore = () => {
    const register = (data: { i18n: any }) => {
        config.i18n = data.i18n; // 直接修改属性，不需要使用config.value
    };
    return {
        config,
        register
    };
};
