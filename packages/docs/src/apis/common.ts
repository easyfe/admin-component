import request from "@/utils/request";

export function testList(params: Record<string, any>): Promise<{ title: string }> {
    return request({
        url: "https://jsonplaceholder.typicode.com/posts",
        params
    });
}
