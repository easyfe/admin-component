<template>
    <arco-modal :visible="computedVisible" :config="props.modalConfig" :ok="handleOk" @cancel="handleCancel">
        <div class="base-modal-content">
            <arco-table
                ref="baseModalTable"
                v-model:filter-data="privateFilterData"
                v-bind="privateTableConfig"
                @selection-change="onSelectionChange"
                @export="onExport"
            >
                <template v-for="(_, slotName) in $slots" #[slotName]>
                    <slot :name="slotName"></slot>
                </template>
            </arco-table>
        </div>
    </arco-modal>
</template>
<script setup lang="ts">
import type { Modal } from "@arco-design/web-vue";
import { ArcoTable } from "@ap/components/ArcoTable";
import { ArcoModal } from "@ap/components/ArcoModal";
import { ref, computed, watch, watchEffect } from "vue";

defineOptions({
    name: "AroModalTable"
});

const props = withDefaults(
    defineProps<{
        visible: boolean;
        modalConfig?: InstanceType<typeof Modal>["$props"];
        tableConfig?: InstanceType<typeof ArcoTable>["$props"];
        //以下用于函数式调用
        export?: (data: Record<string, any>) => void;
        destroy?: () => void;
        ok?: (data: any[]) => Promise<void> | void;
        filterChange?: (data: Record<string, any>) => void; //表单数据变化
    }>(),
    {
        visible: () => false,
        modalConfig: () => <any>{},
        tableConfig: undefined,
        destroy: undefined,
        ok: undefined,
        filterChange: undefined,
        export: undefined
    }
);

const baseModalTable = ref();

const fnVisible = ref(true);

const selectList = ref<any[]>([]);

const privateFilterData = ref<any>({});

const emits = defineEmits<{
    (e: "update:visible", data: any): void;
    (e: "ok", data: any): void;
}>();

const computedVisible = computed(() => {
    return fnVisible.value && props.visible;
});

const privateTableConfig = computed<any>(() => {
    const defaultConfig = {
        arcoProps: {
            rowKey: "id"
        }
    };

    // 处理配置
    const config = { ...defaultConfig, ...props.tableConfig };

    // 包装 req 对象，将 filterData 合并到 params 中
    if (config.req) {
        const originalReq = config.req;
        config.req = {
            fn: originalReq.fn,
            get params() {
                // 每次访问 params 时，都合并最新的 filterData
                // 如果外部使用了 getter 定义 params，这里会自动获取最新值
                const baseParams = originalReq.params || {};
                return { ...baseParams, ...privateFilterData.value };
            }
        };
    }

    // 拦截 onSorterChange 事件，在排序变化时触发刷新
    if (config.tableConfig?.arcoProps?.onSorterChange) {
        const originalOnSorterChange = config.tableConfig.arcoProps.onSorterChange;
        config.tableConfig.arcoProps.onSorterChange = (dataIndex: string, direction: string) => {
            // 先调用原始的排序回调，让外部更新排序数据（如 orderData.value）
            originalOnSorterChange(dataIndex, direction);
        };
    }

    return config;
});

watchEffect(() => {
    privateFilterData.value = props.tableConfig?.filterData;
});

watch(
    () => computedVisible.value,
    (newVal) => {
        if (newVal) {
            baseModalTable.value?.refresh();
        }
    },
    {
        immediate: true
    }
);

watch(
    () => privateFilterData.value,
    (v) => {
        if (props.filterChange) {
            props.filterChange(v);
        }
    },
    {
        deep: true
    }
);

function onSelectionChange(e: any[]) {
    selectList.value = e;
}

function onExport(e: any[]) {
    props.export?.(e);
}

async function handleOk() {
    if (props.ok) {
        await props.ok(selectList.value);
    } else {
        emits("ok", selectList.value);
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
