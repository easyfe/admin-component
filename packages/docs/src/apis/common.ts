import request from "@/utils/request";
import { RequestOption } from "@arco-design/web-vue";

export function testList(params: Record<string, any>): Promise<{ title: string }> {
    return request({
        url: "https://jsonplaceholder.typicode.com/posts",
        params
    });
}

/**
 * 基于arco-request的上传文件方法
 * @param option
 * @returns
 */
export function uploadFile(option: RequestOption): any {
    return new Promise((resolve, reject) => {
        const { onProgress, onError, onSuccess, fileItem, name } = option;
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        if (xhr.upload) {
            xhr.upload.onprogress = function (event) {
                let percent = 0;
                if (event.total > 0) {
                    // 0 ~ 1
                    percent = event.loaded / event.total;
                }
                onProgress(percent, event);
            };
        }
        xhr.onerror = function error(e) {
            reject(e);
            onError(e);
        };
        xhr.onload = function onload() {
            if (xhr.status < 200 || xhr.status >= 300) {
                reject(xhr.responseText);
                return onError(xhr.responseText);
            }
            try {
                const res = JSON.parse(xhr.response);
                fileItem.url = res.data;
                resolve(res);
                onSuccess(res);
            } catch (e) {
                reject(e);
                return onError(e);
            }
        };

        const formData = new FormData();
        formData.append("file", fileItem.file as any);
        formData.append("step", "0");
        formData.append("type", "image/jpeg");
        xhr.open("post", "https://www.uhsea.com/Frontend/upload", true);
        xhr.send(formData);
    });
}
