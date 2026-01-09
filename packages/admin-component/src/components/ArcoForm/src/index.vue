<template>
    <div class="efe-arco-form">
        <a-form ref="formRef" :model="model" size="medium" auto-label-width v-bind="arcoFormProps">
            <a-row :gutter="24" :style="getRowStyle">
                <template v-for="(item, index) in props.config" :key="index">
                    <a-col
                        v-if="handleCheckIf(item.if) && shouldShowItem(index)"
                        class="form-items"
                        :span="getSpan(item)"
                    >
                        <div v-if="item.inputType === 'section'" class="section">{{ item.value }}</div>
                        <slot v-else-if="item.inputType === 'slot'" :name="item.field"></slot>
                        <component :is="item.content?.(model)" v-else-if="item.inputType === 'render'" />
                        <component
                            :is="componentList[item.inputType]"
                            v-else
                            :model-value="getNestedFieldValue(item.field)"
                            :layout="props.layout"
                            v-bind="item"
                            @update:modelValue="setNestedFieldValue(item.field, $event)"
                        ></component>
                    </a-col>
                </template>

                <!-- 展开/收起按钮 -->
                <a-col v-if="collapsible && hasMoreItems" class="form-items expand-btn-col" :span="2">
                    <a-link @click="toggleCollapse">
                        <template v-if="isCollapsed">
                            展开
                            <icon-down />
                        </template>
                        <template v-else>
                            收起
                            <icon-up />
                        </template>
                    </a-link>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>
<script lang="ts" setup>
import { typeHelper } from "@ap/utils/typeHelper";
import { cloneDeep } from "lodash-es";
import { FormInstance, ValidatedError, Form } from "@arco-design/web-vue";
import { IconDown, IconUp } from "@arco-design/web-vue/es/icon";
import componentList from "./components/index";
import { computed, ref, onMounted } from "vue";

defineOptions({
    name: "AroForm"
});

const props = withDefaults(
    defineProps<{
        arcoFormProps?: Partial<InstanceType<typeof Form>["$props"]>;
        config: Record<string, any>[];
        modelValue: any;
        layout?: "column" | "row";
        // 折叠相关属性
        collapsible?: boolean; // 是否可折叠
        defaultCollapsed?: boolean; // 默认是否折叠
        collapsedRows?: number; // 折叠时显示的行数
    }>(),
    {
        arcoFormProps: () => <any>{},
        layout: "column",
        collapsible: false,
        defaultCollapsed: true,
        collapsedRows: 1
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

// 折叠状态
const isCollapsed = ref(props.defaultCollapsed);

// 计算折叠时显示的项目数量（基于一行能容纳的数量）
const collapsedItemCount = computed(() => {
    if (!props.collapsible) return props.config.length;

    let totalSpan = 0;
    let count = 0;
    const maxSpanPerRow = 24 - 2; // 减去展开按钮占用的2栏

    // 计算 collapsedRows 行能显示多少个
    let currentRowSpan = 0;
    let rowCount = 0;

    for (const item of props.config) {
        if (!handleCheckIf(item.if)) continue;

        const span = item.span || 24;

        if (currentRowSpan + span <= maxSpanPerRow) {
            currentRowSpan += span;
            count++;
        } else {
            // 换行
            rowCount++;
            if (rowCount >= props.collapsedRows) {
                break;
            }
            currentRowSpan = span;
            count++;
        }
    }

    return Math.max(count, 1);
});

// 是否有更多项目需要展开
const hasMoreItems = computed(() => {
    const visibleCount = props.config.filter((item) => handleCheckIf(item.if)).length;
    return visibleCount > collapsedItemCount.value;
});

// 判断某个索引的项是否应该显示
const shouldShowItem = (index: number) => {
    if (!props.collapsible || !isCollapsed.value) {
        return true;
    }

    // 计算实际可见项的索引
    let visibleIndex = 0;
    for (let i = 0; i < index; i++) {
        if (handleCheckIf(props.config[i].if)) {
            visibleIndex++;
        }
    }

    return visibleIndex < collapsedItemCount.value;
};

// 切换折叠状态
const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
};

const getNestedFieldValue = (field: string) => {
    const fields = field.split(".");
    let temp = model.value;
    for (let i = 0; i < fields.length; i++) {
        temp = temp[fields[i]];
    }
    return temp;
};

const setNestedFieldValue = (field: string, event: any) => {
    const fields = field.split(".");
    let temp = model.value;
    for (let i = 0; i < fields.length - 1; i++) {
        temp = temp[fields[i]];
    }
    temp[fields[fields.length - 1]] = event;
};

//获取宽度
const getSpan = computed(() => (item: any): any => {
    if (!handleCheckIf(item.if)) {
        return 0;
    }
    return item.span || 24;
});

const getRowStyle = computed(() => {
    return {
        flexDirection: props.layout,
        flexWrap: props.layout === "row" ? "wrap" : "nowrap"
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
    clearValidate,
    toggleCollapse,
    isCollapsed
});

onMounted(() => {
    restoreValue = cloneDeep(model.value);
});
</script>
<style lang="scss" scoped>
.efe-arco-form {
    .form-items {
        .section {
            font-weight: bold;
            height: 42px;
            background-color: rgb(var(--gray-2));
            display: flex;
            align-items: center;
            padding-left: 24px;
            margin-bottom: 24px;
            color: rgb(var(--gray-8));
            &::before {
                margin-right: 8px;
                margin-bottom: 2px;
                content: "";
                display: inline-block;
                width: 3px;
                height: 12px;
                background-color: rgb(var(--primary-6));
            }
        }
        :deep(.arco-form-item-content > div) {
            width: 100%;
        }
    }

    .expand-btn-col {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 32px;

        .arco-link {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 14px;
            white-space: nowrap;
        }
    }
}
</style>
