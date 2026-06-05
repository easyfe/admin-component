<template>
    <a-popover trigger="click" position="br" :content-style="{ padding: '0' }">
        <a-tooltip content="列设置">
            <a-button>
                <template #icon>
                    <icon-settings></icon-settings>
                </template>
            </a-button>
        </a-tooltip>
        <template #content>
            <div class="column-setting">
                <div class="column-setting-header">
                    <a-checkbox :model-value="allChecked" :indeterminate="indeterminate" @change="onToggleAll">
                        列展示
                    </a-checkbox>
                    <a-link @click="onReset">重置</a-link>
                </div>
                <a-divider :margin="0"></a-divider>
                <draggable
                    :list="localColumns"
                    item-key="key"
                    handle=".drag-handle"
                    animation="200"
                    class="column-setting-list"
                    @end="emitChange"
                >
                    <template #item="{ element }">
                        <div class="column-setting-item">
                            <icon-drag-dot-vertical class="drag-handle"></icon-drag-dot-vertical>
                            <a-checkbox
                                class="column-setting-checkbox"
                                :model-value="element.visible"
                                :disabled="element.disableSetting"
                                @change="(v) => onToggle(element, v)"
                            >
                                {{ element.label }}
                            </a-checkbox>
                            <span class="column-setting-fixed">
                                <a-tooltip :content="element.fixed === 'left' ? '取消固定' : '固定到左侧'">
                                    <icon-to-left
                                        :class="['fixed-btn', element.fixed === 'left' ? 'fixed-btn-active' : '']"
                                        @click="onFix(element, 'left')"
                                    ></icon-to-left>
                                </a-tooltip>
                                <a-tooltip :content="element.fixed === 'right' ? '取消固定' : '固定到右侧'">
                                    <icon-to-right
                                        :class="['fixed-btn', element.fixed === 'right' ? 'fixed-btn-active' : '']"
                                        @click="onFix(element, 'right')"
                                    ></icon-to-right>
                                </a-tooltip>
                            </span>
                        </div>
                    </template>
                </draggable>
            </div>
        </template>
    </a-popover>
</template>
<script lang="ts" setup name="ColumnSetting">
import draggable from "vuedraggable";
import { cloneDeep } from "lodash-es";
import { ref, computed, watch } from "vue";
import { IconSettings, IconDragDotVertical, IconToLeft, IconToRight } from "@arco-design/web-vue/es/icon";
import type { ColumnSettingItem } from "@ap/utils/types";

const props = defineProps<{
    columns: ColumnSettingItem[];
}>();

const emits = defineEmits<{
    (e: "update:columns", value: ColumnSettingItem[]): void;
    (e: "reset"): void;
}>();

const localColumns = ref<ColumnSettingItem[]>([]);

watch(
    () => props.columns,
    (val) => {
        localColumns.value = cloneDeep(val || []);
    },
    { immediate: true, deep: true }
);

/** 参与全选/反选统计的列（排除锁定列） */
const configurableColumns = computed(() => localColumns.value.filter((item) => !item.disableSetting));

const allChecked = computed(
    () => configurableColumns.value.length > 0 && configurableColumns.value.every((item) => item.visible)
);

const indeterminate = computed(() => configurableColumns.value.some((item) => item.visible) && !allChecked.value);

const emitChange = (): void => {
    emits("update:columns", cloneDeep(localColumns.value));
};

const onToggle = (item: ColumnSettingItem, visible: boolean): void => {
    item.visible = visible;
    emitChange();
};

const onToggleAll = (visible: boolean | (string | number | boolean)[]): void => {
    localColumns.value.forEach((item) => {
        if (!item.disableSetting) {
            item.visible = visible as boolean;
        }
    });
    emitChange();
};

const onFix = (item: ColumnSettingItem, side: "left" | "right"): void => {
    if (item.disableSetting) {
        return;
    }
    item.fixed = item.fixed === side ? undefined : side;
    emitChange();
};

const onReset = (): void => {
    emits("reset");
};
</script>
<style lang="scss" scoped>
.column-setting {
    width: 240px;
    .column-setting-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
    }
    .column-setting-list {
        max-height: 320px;
        overflow-y: auto;
        padding: 4px 0;
        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 7px;
            background: #b7b9c0;
        }
        &::-webkit-scrollbar-track {
            background: transparent;
        }
    }
    .column-setting-item {
        display: flex;
        align-items: center;
        padding: 6px 12px;
        border-radius: 4px;
        &:hover {
            background-color: var(--color-fill-2);
        }
        .drag-handle {
            cursor: move;
            color: var(--color-text-3);
            margin-right: 8px;
            flex-shrink: 0;
        }
        .column-setting-checkbox {
            flex: 1;
            min-width: 0;
            margin-right: 8px;
            :deep(.arco-checkbox-label) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .column-setting-fixed {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
            .fixed-btn {
                cursor: pointer;
                color: var(--color-text-3);
                &:hover {
                    color: rgb(var(--primary-6));
                }
            }
            .fixed-btn-active {
                color: rgb(var(--primary-6));
            }
        }
    }
}
</style>
