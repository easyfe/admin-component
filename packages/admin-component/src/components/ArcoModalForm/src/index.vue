<template>
    <arco-modal :visible="computedVisible" :config="props.modalConfig" :ok="handleOk" @cancel="handleCancel">
        <div class="base-modal-content">
            <!-- 当value不是响应式的时候，可以用来处理一些表单响应式更新问题 -->
            <div style="display: none">{{ privateFormData }}</div>
            <arco-form
                ref="modalForm"
                v-model="privateFormData"
                :config="props.formConfig"
                :arco-form-props="arcoFormProps"
            >
                <template v-for="(_, slotName) in $slots" #[slotName]>
                    <slot :name="slotName"></slot>
                </template>
            </arco-form>
        </div>
    </arco-modal>
</template>
<script setup lang="ts">
import { formHelper } from "@ap/utils/formHelper";
import type { Modal } from "@arco-design/web-vue";
import { ArcoForm } from "@ap/components/ArcoForm";
import { ArcoModal } from "@ap/components/ArcoModal";
import { Form } from "@arco-design/web-vue";
import { ref, computed, watch } from "vue";

defineOptions({
    name: "AroModalForm"
});

const props = withDefaults(
    defineProps<{
        visible: boolean; //是否显示
        value?: Record<string, any>; //表单数据
        modalConfig?: InstanceType<typeof Modal>["$props"]; //modal配置
        formConfig?: Record<string, any>[]; //表单配置
        arcoFormProps?: InstanceType<typeof Form>["$props"]; //表单props
        //以下用于函数式调用
        destroy?: () => void; //销毁方法
        ok?: (data: Record<string, any>) => Promise<void> | void; //确定方法
        change?: (data: Record<string, any>) => void; //表单数据变化
    }>(),
    {
        visible: () => false,
        value: () => ({}),
        modalConfig: () => <any>{},
        formConfig: () => [],
        arcoFormProps: () => <any>{},
        destroy: undefined,
        ok: undefined,
        change: undefined
    }
);

const emits = defineEmits<{
    (e: "update:visible", data: boolean): void;
    (e: "ok", data: Record<string, any>): void;
}>();

const modalForm = ref();

const fnVisible = ref(true);

const computedVisible = computed(() => {
    return fnVisible.value && props.visible;
});

const privateFormData = ref({});

watch(
    () => props.value,
    (newVal) => {
        if (newVal) {
            privateFormData.value = newVal;
        }
    },
    {
        immediate: true
    }
);

watch(
    () => privateFormData.value,
    (v) => {
        if (props.change) {
            props.change(v);
        }
    },
    {
        deep: true
    }
);

watch(
    () => computedVisible.value,
    (v) => {
        if (v) {
            modalForm.value.clearValidate();
        }
    }
);

async function handleOk() {
    if (modalForm.value) {
        await formHelper.validate(modalForm.value);
    }
    if (props.ok) {
        await props.ok(privateFormData.value);
    } else {
        emits("ok", privateFormData.value);
    }
    onClose();
}

function handleCancel() {
    onClose();
}

function onClose() {
    emits("update:visible", false);
    //如果存在destroy方法，说明是函数式调用，需要手动销毁
    if (props.destroy) {
        fnVisible.value = false;
        setTimeout(() => {
            props.destroy?.();
        }, 500);
    }
}
</script>
<style scoped lang="scss">
.base-modal-content {
    max-height: 60vh;
}
</style>
