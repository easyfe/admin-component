import dayjs from "dayjs";
import { typeHelper } from "./typeHelper";
const dateHelper = {
    /**
     * 时间格式化
     * @param date 时间
     * @param format 格式,如：YYYY-MM-DD
     * @returns
     */
    formatDate: (
        date: number | string | Date | dayjs.Dayjs,
        format = "YYYY-MM-DD",
        sourceFomat?: dayjs.OptionType
    ): string => {
        let DATE = "";
        if (sourceFomat) {
            return dayjs(date, sourceFomat).format(format);
        }
        // 秒
        if ((typeHelper.isNumber(date) || typeHelper.isString(date)) && String(date).length === 10) {
            DATE = dayjs.unix(Number(date)).format(format);
        }
        // 毫秒
        else if ((typeHelper.isNumber(date) || typeHelper.isString(date)) && String(date).length === 13) {
            DATE = dayjs(Number(date)).format(format);
        } else {
            DATE = dayjs(date).format(format);
        }
        return DATE;
    },
    /**
     * 字符串时间转时间戳
     * https://dayjs.gitee.io/docs/zh-CN/parse/string-format
     * @param date 时间
     * @param sourceFomat 为了保证结果一致，当解析除了 ISO 8601 格式以外的字符串时，您应该使用 String + Format
     * @returns
     */
    toUnix: (date: number | string | Date | dayjs.Dayjs, sourceFomat?: dayjs.OptionType): number => {
        return dayjs(date, sourceFomat).unix();
    },
    /**
     * 转Date格式
     * https://dayjs.gitee.io/docs/zh-CN/parse/string-format
     * @param date
     * @param sourceFomat 为了保证结果一致，当解析除了 ISO 8601 格式以外的字符串时，您应该使用 String + Format
     */
    toDate: (date: number | string | Date | dayjs.Dayjs, sourceFomat?: dayjs.OptionType): Date => {
        let tmpDate = date;
        if (typeHelper.isString(tmpDate) || typeHelper.isNumber(tmpDate)) {
            if (tmpDate.toString().length === 10) {
                tmpDate = Number(tmpDate) * 1000;
            }
        }
        return dayjs(tmpDate, sourceFomat).toDate();
    },
    /**
     * 转dayjs格式
     * @param date
     * @param sourceFomat
     */
    toDayjs: (date: number | string | Date | dayjs.Dayjs, sourceFomat?: dayjs.OptionType): dayjs.Dayjs => {
        return dayjs(date, sourceFomat);
    },
    /**
     * 获取今天周几
     * @param date
     * @param sourceFomat
     * @returns
     */
    getWeek(date: number | string | Date | dayjs.Dayjs, sourceFomat?: dayjs.OptionType): number {
        return dayjs(date, sourceFomat).day();
    }
};
export { dateHelper };
