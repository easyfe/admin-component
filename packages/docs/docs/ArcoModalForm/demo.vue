<template>
    <div>
        <a-space>
            <a-button @click="formVisible1 = true">组件式表单</a-button>
            <a-button @click="openForm">函数式表单</a-button>
        </a-space>
        <a-row>
            {{ formData }}
        </a-row>
        <ArcoModalForm
            v-model:visible="formVisible1"
            :value="tempData"
            :modal-config="modalConfig"
            :form-config="formConfig"
            :ok="save1"
            :change="onValueChange"
        >
        </ArcoModalForm>
    </div>
</template>
<script lang="ts" setup>
import { Message } from "@arco-design/web-vue";
import { cloneDeep, reject } from "lodash-es";
import { ArcoModalForm, ArcoModalFormShow, formHelper, ruleHelper } from "@easyfe/admin-component";

const formVisible1 = ref(false);

const modalConfig = computed(() => {
    return {
        title: "测试"
    };
});

const formConfig = computed(() => {
    return [
        formHelper.section("基础信息"),
        formHelper.span("介绍", "text"),
        formHelper.input("文本", "key1", {
            maxLength: 20,
            showWordLimit: true,
            rules: [ruleHelper.require("必填", "blur")],
            inputTips: `示文案这是示文案是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案`
        }),
        formHelper.checkbox(
            "多选框",
            "key2",
            [
                {
                    label: "label1",
                    value: 1
                },
                { label: "label2", value: 2 }
            ],
            {
                rules: [
                    ruleHelper.require("必选", "blur"),
                    {
                        validator: (value, callback) => {
                            if (!value) {
                                callback("至少选择两个");
                            }
                            if (value.length < 2) {
                                callback("至少选择两个");
                            } else {
                                callback();
                            }
                        }
                    }
                ]
            }
        ),
        formHelper.radio(
            "单选框",
            "key3",
            [
                { label: "label1", value: 1, disabled: true },
                { label: "label2", value: 2 }
            ],
            {
                type: "radio"
            }
        ),
        formHelper.inputNumber("数字输入框", "key4", {}),
        formHelper.select(
            "下拉框",
            "key5",
            [
                { label: "label1", value: 1, disabled: true },
                { label: "label2", value: 2 }
            ],
            {
                if: () => {
                    return tempData.value.key2.length === 2;
                }
            }
        ),
        formHelper.switch("切换", "key7"),
        formHelper.datePicker("日期", "key10", {
            type: "date"
        }),
        formHelper.time("时间", "key11"),
        formHelper.editor("富文本", "key6")
    ];
});
const formData = ref<Record<string, any>>({
    key2: [1, 2],
    key1: "文本苏入口",
    key5: [],
    key6: "",
    text: `这是一段介绍文字<font style='color:red;padding-left:10px;font-weight:bold'>支持HTML</font>`
});

const tempData = ref<any>({});

async function save1(v: any) {
    await saveData(v);
    formData.value = v;
}

watchEffect(() => {
    tempData.value = cloneDeep(formData.value);
});

function onValueChange(v: any) {
    tempData.value = v;
}

function openForm() {
    ArcoModalFormShow({
        modalConfig: modalConfig.value,
        formConfig: formConfig.value,
        value: tempData.value,
        ok: async (v: any) => {
            await saveData(v);
        }
    });
}

async function saveTest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("失败");
        }, 1500);
    });
}

async function saveData(value: Record<string, any>) {
    try {
        await saveTest();
        Message.success("保存成功");
        formData.value = value;
    } catch (e: any) {
        reject("失败");
        Message.error("保存失败");
        //需要通过throw new Error(e)抛出异常，否则会被catch捕获，导致弹窗直接关闭
        throw new Error(e);
    }
}
</script>
<style lang="scss" scoped></style>
