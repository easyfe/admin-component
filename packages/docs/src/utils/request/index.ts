import WbRequest from "@easyfe/web-request";
import loading from "./loading";

const service = new WbRequest({
    base: {
        timeout: 60 * 1000,
        baseURL: "",
        prefix: "",
        enableCancel: false,
        merge: true,
        randomKey: "_t"
    },
    loading,
    interceptors: {
        request: (config): Promise<any> => {
            return Promise.resolve(config);
        },
        response: (response): Promise<any> => {
            return Promise.resolve(response.data);
        },
        responseError: (errorResponse): Promise<any> => {
            return Promise.reject(errorResponse);
        }
    }
});

const request = service.request;

export function clearRequest(): void {
    service.clearQueue();
}

export default request;
