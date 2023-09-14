import { LinearGradient } from "vue-gpickr";
export function getRangeColor(color: string | Record<string, any>): string {
    try {
        if (!color) {
            return "";
        }
        if (typeof color === "string") {
            return color;
        }
        if (color._stops) {
            const tmpValue = JSON.parse(JSON.stringify(color).replaceAll("_", ""));
            return new LinearGradient(tmpValue).toString();
        }
        return "";
    } catch (err) {
        console.error("获取渐变色失败：", err);
        return "";
    }
}
