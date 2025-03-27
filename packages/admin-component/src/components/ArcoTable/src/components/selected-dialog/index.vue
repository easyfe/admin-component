<template>
    <a-modal
        v-model:visible="dialogVisible"
        :title="`已选择 ${selectedData.length} 个项目`"
        :footer="false"
        :mask-closable="true"
        width="800px"
    >
        <div class="selected-items-container">
            <a-empty v-if="!selectedData.length" />
            <template v-else>
                <a-table :data="selectedData" :pagination="false" :bordered="false" size="small">
                    <template #columns>
                        <!-- 使用主表格的列配置，但排除特定列类型 -->
                        <template v-for="(item, index) in dialogColumns" :key="index">
                            <a-table-column v-bind="getColumnConfig(item)">
                                <template #cell="{ record, rowIndex }">
                                    <template v-if="item.type === 'default'">
                                        <template v-if="record[item.prop] !== undefined && record[item.prop] !== null">
                                            {{ `${item.leftExtra || ""}${record[item.prop]}${item.rightExtra || ""}` }}
                                        </template>
                                        <template v-else>-</template>
                                    </template>

                                    <template v-if="item.type === 'custom'">
                                        {{ item.callback?.(record, rowIndex) }}
                                    </template>

                                    <template v-if="item.type === 'date'">
                                        <template
                                            v-for="(dItem, dIndex) in getSplitDate(record[item.prop], item)"
                                            :key="dIndex"
                                        >
                                            {{ dItem }}<br />
                                        </template>
                                    </template>

                                    <template v-if="item.type === 'dictionary'">
                                        {{ setDictionaryValue(item.prop, record[item.prop]) }}
                                    </template>

                                    <template v-if="item.type === 'status'">
                                        <a-badge v-bind="item?.handler?.(record) || {}"></a-badge>
                                    </template>

                                    <template v-if="item.type === 'link'">
                                        <span>
                                            {{
                                                record[item.prop]
                                                    ? `${item.leftExtra || ""}${record[item.prop]}${
                                                          item.rightExtra || ""
                                                      }`
                                                    : "-"
                                            }}
                                        </span>
                                    </template>

                                    <template v-if="item.type === 'html'">
                                        <rich-text :content="record[item.prop]"></rich-text>
                                    </template>
                                </template>
                            </a-table-column>
                        </template>

                        <!-- 删除操作列 -->
                        <a-table-column title="操作" align="center" :width="80">
                            <template #cell="{ record }">
                                <a-button type="text" status="danger" @click="handleRemove(record)">
                                    <template #icon><icon-delete /></template>
                                </a-button>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>

                <div class="dialog-footer">
                    <a-button type="primary" status="danger" @click="handleClearAll">清空全部</a-button>
                </div>
            </template>
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { _TableColumn } from "@ap/utils/types";
import { IconDelete } from "@arco-design/web-vue/es/icon";
import { RichText } from "@ap/components/RichText";
import { dateHelper } from "@ap/utils/dateHelper";

defineOptions({
    name: "SelectedDialog"
});

const props = defineProps<{
    visible: boolean;
    columns: _TableColumn[];
    selectedData: any[];
    tableRowKey: string | number;
    dictionaryObj: any;
}>();

const emit = defineEmits<{
    (e: "update:visible", value: boolean): void;
    (e: "remove", record: any): void;
    (e: "clear"): void;
}>();

// 双向绑定对话框可见状态
const dialogVisible = computed({
    get: () => props.visible,
    set: (val) => emit("update:visible", val)
});

// 获取弹窗中使用的列配置
const dialogColumns = computed(() => {
    if (!props.columns) return [];

    return props.columns
        .filter((column: _TableColumn) => {
            // 排除操作按钮列和插槽类型列
            return column.type !== "btns" && column.type !== "slot" && !column.hideInDialog;
        })
        .slice(0, 6); // 限制最多显示6列，避免弹窗过宽
});

// 获取列配置
function getColumnConfig(item: _TableColumn) {
    let config: Record<string, any> = {
        ellipsis: true,
        align: item.align || "left",
        title: item.label,
        width: item.width,
        fixed: item.fixed
    };

    if (item.type !== "btns") {
        config = {
            ...config,
            tooltip: item.tooltip || { position: "top" },
            showOverflowTooltip: true,
            dataIndex: item.prop,
            ...item
        };
    }

    return config;
}

// 获取分割后的日期
function getSplitDate(value: string | number, item?: any) {
    const v = dateHelper.formatDate(value, item.format);
    const split = item?.split;
    if (!split) {
        return [v];
    }
    return v.split(split);
}

// 设置字典显示
const setDictionaryValue = (prop: string, value: string | number): string | number => {
    if (!props.dictionaryObj) {
        return "";
    }
    return props.dictionaryObj[prop][value];
};

// 删除单个选中项
const handleRemove = (record: any) => {
    emit("remove", record);
};

// 清空所有选中项
const handleClearAll = () => {
    emit("clear");
    dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.selected-items-container {
    max-height: 400px;
    overflow-y: auto;

    :deep(.arco-table-th) {
        background-color: var(--color-bg-2);
    }

    :deep(.arco-table-tr) {
        &:hover {
            background-color: var(--color-fill-2);
        }
    }

    .dialog-footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
        padding-right: 8px;
    }
}
</style>
