import { ValidateTrigger } from "@arco-design/web-vue";

const ruleHelper = {
    require(message: string, trigger?: ValidateTrigger): any {
        return {
            required: true,
            message,
            trigger
        };
    },
    phone(message?: string, trigger?: ValidateTrigger) {
        return {
            required: true,
            trigger,
            validator: (value: string, callback: any) => {
                if (!value) {
                    callback("请输入");
                    return;
                }
                if (!/^1[3456789]\d{9}$/.test(value)) {
                    callback(message || "格式错误");
                    return;
                }
                callback();
            }
        };
    },
    mail(message?: string, trigger?: ValidateTrigger) {
        return {
            required: true,
            trigger,
            validator: (value: string, callback: any) => {
                if (!value) {
                    callback("请输入");
                    return;
                }
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    callback(message || "格式错误");
                    return;
                }
                callback();
            }
        };
    }
};
export { ruleHelper };
