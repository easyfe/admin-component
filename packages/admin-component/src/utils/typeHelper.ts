/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** 检测对象类型 */
const typeHelper = {
    /**
     * 检测对象类型是否是Object
     *  @param {any} o 检测对象
     */
    isObject: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object Object]") {
            return true;
        }
        return false;
    },
    /**
     * 检测对象类型是否是Date
     *  @param {any} o 检测对象
     */
    isDate: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object Date]") {
            return true;
        }
        return false;
    },

    /**
     * 检测对象类型是否是String
     *  @param {any} o 检测对象
     */
    isString: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object String]") {
            return true;
        }
        return false;
    },

    /**
     * 检测对象类型是否是Array
     *  @param {any} o 检测对象
     */
    isArray: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object Array]") {
            return true;
        }
        return false;
    },

    /**
     * 检测对象类型是否是Number
     *  @param {any} o 检测对象
     */
    isNumber: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object Number]") {
            return true;
        }
        return false;
    },

    /**
     * 检测对象类型是否是Undefined
     *  @param {any} o 检测对象
     */
    isUndefined: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object Undefined]") {
            return true;
        }
        return false;
    },

    /**
     * 检测对象类型是否是Boolean
     *  @param {any} o 检测对象
     */
    isBoolean: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object Boolean]") {
            return true;
        }
        return false;
    },

    /**
     * 检测对象类型是否是Function
     *  @param {any} o 检测对象
     */
    isFunction: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object Function]") {
            return true;
        }
        return false;
    },

    /**
     * 检测对象类型是否是Null
     *  @param {any} o 检测对象
     */
    isNull: (o: any): boolean => {
        if (Object.prototype.toString.call(o) === "[object Null]") {
            return true;
        }
        return false;
    }
};

export { typeHelper };
