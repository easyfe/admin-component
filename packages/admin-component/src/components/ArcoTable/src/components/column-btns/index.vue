<template>
    <a-space class="column-btns">
        <template v-for="(btn_item, btn_index) in commonBtns">
            <a-link
                v-if="handleCheckColumnBtnIf(record, rowIndex, btn_item)"
                :key="btn_index"
                class="btn handle-btns"
                :disabled="handleCheckColumnBtnDidsable(record, rowIndex, btn_item)"
                :style="{
                    color: btn_item.color && !btn_item.disabled ? btn_item.color : ''
                }"
                :status="btn_item.status || 'normal'"
                type="text"
                @click.stop="handleClickColumnBtn(record, rowIndex, btn_item)"
                >{{ handleSetColumnBtnLabel(record, rowIndex, btn_item) }}
            </a-link>
        </template>
        <a-dropdown v-if="collspaceShow" trigger="hover">
            <icon-more-vertical></icon-more-vertical>
            <template #content>
                <div class="collspace-btn-content">
                    <template v-for="(btn_item, btn_index) in collspaceBtns">
                        <a-link
                            v-if="handleCheckColumnBtnIf(record, rowIndex, btn_item)"
                            :key="btn_index"
                            class="btn handle-btns"
                            :disabled="handleCheckColumnBtnDidsable(record, rowIndex, btn_item)"
                            :style="{
                                color: btn_item.color && !btn_item.disabled ? btn_item.color : ''
                            }"
                            :status="btn_item.status || 'normal'"
                            type="text"
                            @click.stop="handleClickColumnBtn(record, rowIndex, btn_item)"
                            >{{ handleSetColumnBtnLabel(record, rowIndex, btn_item) }}
                        </a-link>
                    </template>
                </div>
            </template>
        </a-dropdown>
    </a-space>
</template>
<script lang="ts" setup name="ColumnBtns">
import { BaseTableColunmBtn } from "@ap/utils/tableHelper";
import { computed } from "vue";
import { watchEffect, ref } from "vue";
import { IconMoreVertical } from "@arco-design/web-vue/es/icon";
import { handleCheckColumnBtnIf, handleCheckColumnBtnDidsable, handleSetColumnBtnLabel } from "../../util";
const props = withDefaults(
    defineProps<{
        btns?: BaseTableColunmBtn[];
        record: Record<string, any>;
        rowIndex: number;
    }>(),
    {
        btns: undefined
    }
);

let commonBtns = ref<BaseTableColunmBtn[]>([]);
let collspaceBtns = ref<BaseTableColunmBtn[]>([]);

watchEffect(() => {
    if (!props.btns?.length) {
        return;
    }
    commonBtns.value = props.btns.filter((item) => !item.collapse);
    collspaceBtns.value = props.btns.filter((item) => item.collapse === true);
});

const collspaceShow = computed(() => {
    if (collspaceBtns.value.length <= 0) {
        return false;
    }
    return true;
});

/** 操作列按钮点击事件 */
const handleClickColumnBtn = (item: Record<string, any>, index: number, btn: BaseTableColunmBtn): void => {
    btn.handler?.(item, index);
};
</script>
<style lang="scss" scoped>
.collspace-btn-content {
    display: flex;
    flex-direction: column;
    padding: 0 4px;
    :deep(.arco-link) {
        padding: 6px 10px;
    }
}
</style>
