<template>
    <div class="efe-arco-form">
        <a-form ref="formRef" :model="model" size="medium" auto-label-width v-bind="$attrs">
            <a-row :gutter="24" :style="getRowStyle">
                <template v-for="(item, index) in props.config" :key="index">
                    <a-col v-if="handleCheckIf(item.if)" class="form-items" :span="getSpan(item)">
                        <div v-if="item.inputType === 'section'" class="section">{{ item.value }}</div>
                        <slot v-else-if="item.inputType === 'slot'" :name="item.field"></slot>
                        <component
                            :is="componentList[item.inputType]"
                            v-else
                            v-model="model[item.field]"
                            :layout="props.layout"
                            v-bind="item"
                        ></component>
                    </a-col>
                </template>
            </a-row>
        </a-form>
    </div>
</template>
<script lang="ts" setup>
import { typeHelper } from "@ap/utils/typeHelper";
import { cloneDeep } from "lodash-es";
import { FormInstance, ValidatedError } from "@arco-design/web-vue";
import componentList from "./components/index";
import { computed, ref, onMounted } from "vue";

defineOptions({
    name: "AroForm"
});

const props = withDefaults(
    defineProps<{
        config: Record<string, any>[];
        modelValue: any;
        layout?: "column" | "row";
    }>(),
    {
        layout: "column"
    }
);
const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
}>();

const model = computed({
    get: () => {
        return props.modelValue;
    },
    set: (newVal) => {
        emits("update:modelValue", newVal);
    }
});

//获取宽度
const getSpan = computed(() => (item: any): any => {
    if (!handleCheckIf(item.if)) {
        return 0;
    }
    return item.span || 24;
});

const getRowStyle = computed(() => {
    return {
        flexDirection: props.layout
    };
});

/** 检查是否显示 */
const handleCheckIf = (e: undefined | boolean | (() => boolean)): boolean => {
    if (typeHelper.isFunction(e)) {
        const fn = e as (data: any) => boolean;
        return fn(model.value);
    }
    if (e === undefined) {
        return true;
    }
    return e as boolean;
};

//表格实例
const formRef = ref<FormInstance | null>();

/**
 * 校验数据
 */
const validate = (): Promise<Record<string, ValidatedError> | undefined> | undefined => {
    return formRef.value?.validate();
};
/**
 * 重置表单数据
 */
const resetFields = (): void => {
    model.value = restoreValue;
};
/**
 * 清空校验状态
 */
const clearValidate = (): void => {
    return formRef.value?.clearValidate();
};

//保留重置数据
let restoreValue: any = null;

//暴露事件
defineExpose({
    validate,
    resetFields,
    clearValidate
});

onMounted(() => {
    restoreValue = cloneDeep(model.value);
});
</script>
<style lang="scss" scoped>
.efe-arco-form {
    .form-items {
        .section {
            height: 42px;
            background-color: rgb(var(--gray-1));
            display: flex;
            align-items: center;
            padding-left: 24px;
            margin-bottom: 24px;
            color: rgb(var(--gray-8));
        }
        :deep(.arco-form-item-content > div) {
            width: 100%;
        }
    }
}
</style>
