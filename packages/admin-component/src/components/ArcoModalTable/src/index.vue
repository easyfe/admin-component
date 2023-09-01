<template>
    <a-modal
        :visible="computedVisible"
        :on-before-ok="handleOk"
        top="10vh"
        ok-text="确定"
        v-bind="privateModalConfig"
        @cancel="handleCancel"
    >
        <div class="base-modal-content">
            <arco-table
                ref="baseModalTable"
                v-model:filter-data="privateFilterData"
                :default-selection-keys="selectionKeys"
                v-bind="privateTableConfig"
                @selection-change="onSelectionChange"
                @export="onExport"
            >
                <template v-for="(_, slotName) in $slots" #[slotName]>
                    <slot :name="slotName"></slot>
                </template>
            </arco-table>
        </div>
    </a-modal>
</template>
<script setup lang="ts">
import type { Modal } from "@arco-design/web-vue";
// import { cloneDeep } from "lodash-es";
import { ArcoTable } from "@/components/ArcoTable";
import { ref, computed, watch, watchEffect } from "vue";

defineOptions({
    name: "AroModalTable"
});

const props = withDefaults(
    defineProps<{
        visible: boolean;
        modalConfig?: InstanceType<typeof Modal>["$props"];
        tableConfig?: InstanceType<typeof ArcoTable>["$props"];
        defaultSelected?: any[];
        //以下用于函数式调用
        export?: (data: Record<string, any>) => void;
        destroy?: () => void;
        ok?: (data: any[]) => Promise<void>;
        filterChange?: (data: Record<string, any>) => void; //表单数据变化
    }>(),
    {
        visible: () => false,
        modalConfig: () => <any>{},
        tableConfig: undefined,
        defaultSelected: () => [],
        destroy: undefined,
        ok: undefined,
        filterChange: undefined,
        export: undefined
    }
);

const baseModalTable = ref();

const fnVisible = ref(true);

const selectList = ref<any[]>([]);

const selectionKeys = ref<string[] | number[]>([]);

const privateFilterData = ref<any>({});

const emits = defineEmits<{
    (e: "update:visible", data: any): void;
    (e: "ok", data: any): void;
}>();

const computedVisible = computed(() => {
    return fnVisible.value && props.visible;
});

const privateModalConfig = computed<any>(() => {
    const defaultConfig = {
        maskClosable: false,
        alignCenter: false,
        titleAlign: "start",
        top: "10vh",
        okText: "确定",
        width: "700px"
    };
    return { ...defaultConfig, ...props.modalConfig };
});

//props里的tableConfig.filterData 需要一直同步给getData的req事件

//arco-table内，是监听props.filterData、props.req值发生变化的时候，重新发起了请求获取数据。
//由于arco-modal-table绑定的筛选是在本组件内的私有privateFilterData，因此，需要在组件内部，重新封装req请求，否则
//私有privateFilterData需要通过引用关系同步到外部组件，因为可能需要根据筛选值，进行一些判断，比如columns的显示、req的切换等。

//在这个计算方法内，通过引用关系的方式，让arco-table的filter-data和props里的tableConfig，双向绑定
const privateTableConfig = computed<any>(() => {
    const defaultConfig = {
        tableProps: {
            rowKey: "id"
        }
    };
    if (props.tableConfig?.req?.params) {
        // eslint-disable-next-line vue/no-mutating-props, vue/no-side-effects-in-computed-properties
        props.tableConfig.req.params = { ...props.tableConfig.req.params, ...privateFilterData.value };
    }
    return { ...defaultConfig, ...props.tableConfig };
    // const tableConfig = cloneDeep(props.tableConfig);
    // if (tableConfig?.req) {
    //     tableConfig.req.params = { ...tableConfig.req.params, ...privateFilterData.value };
    // }
    // return { ...defaultConfig, ...tableConfig };
});

watchEffect(() => {
    privateFilterData.value = props.tableConfig?.filterData;
});

watch(
    () => computedVisible.value,
    (newVal) => {
        if (newVal) {
            baseModalTable.value?.refresh();
            selectionKeys.value = props.defaultSelected?.map((item: any) => {
                if (typeof item === "object") {
                    return item[props.tableConfig?.tableConfig.tableProps?.rowKey || "id"];
                } else {
                    return item;
                }
            });
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
