<template>
    <div>
        <a-button @click="visible = true">点击显示</a-button>
        <arco-modal v-model:visible="visible" title="测试弹窗" :ok="onBeforeOk">
            <p>这是弹窗主体</p>
            <br />
            <p>点击确定测试一下异步关闭吧</p>
        </arco-modal>
    </div>
</template>
<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { ArcoModal } from "@easyfe/admin-component";
const visible = ref(false);

function sleep(t: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, t);
    });
}

async function onBeforeOk() {
    await sleep(2 * 1000);
    Message.success("提交成功");
}
</script>
