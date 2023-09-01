import { ValidateTrigger } from "@arco-design/web-vue";

const ruleHelper = {
    require(message: string, trigger?: ValidateTrigger): any {
        return {
            required: true,
            message,
            trigger
        };
    },
    price(message: string): any {
        return {
            pattern: new RegExp(/^([1-9]\d*|0)(\.\d{1,2})?$/),
            message
        };
    },
    int(message: string): any {
        return {
            pattern: new RegExp(/^[1-9]\d*|0$/),
            message
        };
    }
};
export { ruleHelper };
