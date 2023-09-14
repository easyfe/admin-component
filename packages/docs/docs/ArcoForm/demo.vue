<template>
    <div>
        <arco-form ref="form" v-model="formData" :config="formConfig">
            <template #s1>
                <a-form-item label="插槽"> 这是自定义插槽 </a-form-item>
            </template>
        </arco-form>
        <a-button @click="testFn">提交</a-button>
    </div>
</template>
<script setup lang="ts">
import { ArcoForm, formHelper, ruleHelper } from "@easyfe/admin-component";
import { Message } from "@arco-design/web-vue";
const form = ref();
const formData = ref({
    key12: "https://cdn.v2ex.com/avatar/1b4e/0a2d/614153_xlarge.png?m=1681735508",
    key1: "这是input组件value",
    key8: "#000",
    key5: [],
    key6: "",
    text: `这是一段介绍文字<font style='color:red;padding-left:10px;font-weight:bold'>支持HTML</font>`
});
const formConfig = computed(() => {
    return [
        formHelper.section("基础信息1"),
        formHelper.span("介绍", "text"),
        formHelper.slot("s1"),
        formHelper.input("文本", "key1", {
            maxLength: 20,
            showWordLimit: true,
            rules: [ruleHelper.require("必填", "blur")],
            labelTips: `提示内容第一点`,
            inputTips: `示文案这是示文案是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案`
        }),
        formHelper.color("颜色", "key8", {
            defaultColor: "#f5511e"
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
                        validator: (value: any, callback: any) => {
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
        formHelper.uploadPic("图片", "key12", {
            remove: true,
            inputTips: "推荐使用400*400的图片"
        }),
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
        formHelper.inputNumber("数字输入框", "key4"),
        formHelper.section("基础信息2"),
        formHelper.select(
            "下拉框",
            "key5",
            [
                { label: "label1", value: 1, disabled: true },
                { label: "label2", value: 2 }
            ],
            {
                rules: [ruleHelper.require("必选", "blur")]
            }
        ),
        formHelper.switch("切换", "key7"),
        formHelper.rangePicker("日期", "key10", {
            type: "date",
            placeholder: ["开始时间1", "结束时间1"]
        }),
        formHelper.time("时间", "key11"),
        formHelper.editor("富文本", "key6")
    ];
});

function testFn() {
    formHelper
        .validate(form.value)
        .then(() => {
            Message.success("保存成功");
        })
        .catch((err) => {
            console.log("error", err);
        });
}
</script>
