<template>
    <div class="efe-arco-table">
        <!-- 顶部筛选器 -->
        <div v-if="props.filterConfig?.length" class="filter">
            <arco-form v-model="privateFilterData" :config="privateFilterConfig" layout="row"></arco-form>
        </div>
        <div v-if="topShow" class="top">
            <!-- table左上角切换tab -->
            <div class="tabs">
                <a-radio-group v-if="tabsShow" v-model="privateFilterData.tabsData" type="button">
                    <template v-for="(item, index) in privateTableConfig?.tlBtns">
                        <a-radio v-if="item.if !== false" :key="index" :value="item.value"
                            >{{ item.label }}
                            <template v-if="item.count">
                                （<span class="tabs-count">{{ item.count }}</span
                                >）
                            </template>
                        </a-radio>
                    </template>
                </a-radio-group>
                <!-- 左侧插槽 -->
                <slot name="tlBtns"></slot>
            </div>
            <!-- table右上角功能按钮 -->
            <div class="btns">
                <a-space>
                    <!-- 右侧插槽 -->
                    <slot name="trBtns"></slot>
                    <template v-if="btnsShow">
                        <template v-for="(item, index) in privateTableConfig?.trBtns">
                            <a-button
                                v-if="handleCheckBtnIf(item)"
                                :key="index"
                                :type="item.type || 'primary'"
                                :status="item.status || 'normal'"
                                :disabled="handleCheckBtnDidsable(item) || item.loading || false"
                                :loading="item.loading || false"
                                @click="handleExtraButtonClick(item)"
                                >{{ item.label }}
                                <template v-if="item.icon" #icon> <component :is="item.icon" /> </template>
                            </a-button>
                        </template>
                        <a-button v-if="privateTableConfig.showRefresh" @click="onRefresh">
                            <template #icon>
                                <icon-refresh></icon-refresh>
                            </template>
                        </a-button>
                    </template>
                    <!-- 列表展示方式 -->
                    <a-radio-group
                        v-if="privateTableConfig.allowFlatten"
                        v-model="flattenType"
                        class="view-list"
                        @change="setTableHeight"
                    >
                        <a-radio value="app">
                            <template #radio="{ checked }">
                                <div :class="['view-item', checked ? 'view-item-active' : '']">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                    >
                                        <rect
                                            width="176"
                                            height="176"
                                            x="48"
                                            y="48"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="32"
                                            rx="20"
                                            ry="20"
                                        />
                                        <rect
                                            width="176"
                                            height="176"
                                            x="288"
                                            y="48"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="32"
                                            rx="20"
                                            ry="20"
                                        />
                                        <rect
                                            width="176"
                                            height="176"
                                            x="48"
                                            y="288"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="32"
                                            rx="20"
                                            ry="20"
                                        />
                                        <rect
                                            width="176"
                                            height="176"
                                            x="288"
                                            y="288"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="32"
                                            rx="20"
                                            ry="20"
                                        />
                                    </svg>
                                </div>
                            </template>
                        </a-radio>
                        <a-radio value="list">
                            <template #radio="{ checked }">
                                <div :class="['view-item', checked ? 'view-item-active' : '']">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M6 6H4v2h2V6zm14 0H8v2h12V6zM4 11h2v2H4v-2zm16 0H8v2h12v-2zM4 16h2v2H4v-2zm16 0H8v2h12v-2z"
                                        />
                                    </svg>
                                </div>
                            </template>
                        </a-radio>
                    </a-radio-group>
                </a-space>
            </div>
        </div>
        <!-- 表格主体 -->
        <div ref="baseTableWrapper" :class="['table']">
            <a-spin :loading="loading">
                <template v-if="!tableConfig.allowFlatten || flattenType === 'list'">
                    <a-table
                        ref="baseTable"
                        v-model:selectedKeys="currentPageSelectedKeys"
                        :data="privateList"
                        :pagination="false"
                        :stripe="true"
                        v-bind="privateTableConfig.arcoProps"
                        @selection-change="onSelectionChange"
                    >
                        <template #columns>
                            <template v-for="(item, column_index) in privateTableConfig?.columns">
                                <!-- 插槽类型 -->
                                <slot v-if="item.type === 'slot'" :name="item.prop"></slot>
                                <a-table-column v-else :key="column_index" v-bind="getColumnConfig(item)">
                                    <template #cell="{ record, rowIndex }">
                                        <!-- 普通列 -->
                                        <template v-if="item.type === 'default'">
                                            <template
                                                v-if="record[item.prop] !== undefined && record[item.prop] !== null"
                                            >
                                                {{
                                                    `${item.leftExtra || ""}${record[item.prop]}${
                                                        item.rightExtra || ""
                                                    }`
                                                }}
                                            </template>
                                            <template v-else> -</template>
                                        </template>
                                        <!-- 自定义列 -->
                                        <template v-if="item.type === 'custom'">
                                            {{ item.callback?.(record, rowIndex) }}
                                        </template>
                                        <!-- 时间列 -->
                                        <template v-if="item.type === 'date'">
                                            <template
                                                v-for="(dItem, dIndex) in getSplitDate(record[item.prop], item)"
                                                :key="dIndex"
                                            >
                                                {{ dItem }}<br />
                                            </template>
                                        </template>
                                        <!-- 字典列 -->
                                        <template v-if="item.type === 'dictionary'">
                                            {{ setDictionaryValue(item.prop, record[item.prop]) }}
                                        </template>
                                        <!-- 状态列 -->
                                        <template v-if="item.type === 'status'">
                                            <a-badge v-bind="item?.handler?.(record) || {}"></a-badge>
                                        </template>
                                        <!-- 链接列 -->
                                        <template v-if="item.type === 'link'">
                                            <a-link @click.stop="item.handler?.(record)">
                                                {{
                                                    record[item.prop]
                                                        ? `${item.leftExtra || ""}${record[item.prop]}${
                                                              item.rightExtra || ""
                                                          }`
                                                        : "-"
                                                }}
                                            </a-link>
                                        </template>
                                        <!-- html列 -->
                                        <template v-if="item.type === 'html'">
                                            <rich-text :content="record[item.prop]"></rich-text>
                                        </template>
                                        <!-- 操作按钮组 -->
                                        <template v-if="item.type === 'btns'">
                                            <column-btns
                                                :btns="item.btns"
                                                :record="record"
                                                :row-index="rowIndex"
                                            ></column-btns>
                                        </template>
                                    </template>
                                </a-table-column>
                            </template>
                        </template>
                    </a-table>
                </template>
                <template v-else>
                    <div
                        :class="[tableConfig.allowFlatten && flattenType === 'app' ? 'app-list' : '']"
                        :style="getAppListStyle"
                    >
                        <a-empty v-if="!privateList.length"></a-empty>
                        <template v-for="(item, index) in privateList">
                            <slot name="slot_item" :row="item" :index="index"> </slot>
                        </template>
                    </div>
                </template>
            </a-spin>
        </div>
        <!-- 表格底部 -->
        <div v-if="enableFooter" class="footer">
            <div class="bat-wrapper">
                <template v-if="enableSelection">
                    <span class="bats-slot">
                        已选
                        <span class="selected-count" @click="showSelectedDialog"
                            >{{ allSelectedKeys.length
                            }}<template v-if="tableConfig.selectLimit">/ {{ tableConfig.selectLimit }}</template>
                            个</span
                        >
                        <a-button v-if="allSelectedKeys.length > 0" type="text" status="danger" @click="clearSelection"
                            >清空</a-button
                        >
                    </span>
                </template>
                <template v-if="batsShow">
                    <a-space>
                        <template v-for="(item, index) in privateTableConfig?.blBtns">
                            <a-button
                                v-if="handleCheckBtnIf(item)"
                                :key="index"
                                :type="item.type || 'primary'"
                                :status="item.status || 'normal'"
                                :disabled="handleCheckBtnDidsable(item) || item.loading || false"
                                :loading="item.loading || false"
                                @click="handleExtraButtonClick(item)"
                                >{{ item.label }}
                                <template v-if="item.icon" #icon> {{ item.icon() }} </template>
                            </a-button>
                        </template>
                    </a-space>
                </template>
            </div>
            <a-pagination
                v-if="privateTableConfig?.arcoProps?.pagination !== false"
                v-model:current="privatePage"
                v-model:pageSize="privateSize"
                :page-size-options="tableConfig.sizeList || [10, 20, 30, 40, 50]"
                :total="total"
                show-total
                show-page-size
                @page-size-change="handleSizeChange"
                @change="handleCurrentChange"
            ></a-pagination>
        </div>

        <!-- 使用抽离的已选项目弹窗组件 -->
        <selected-dialog
            v-model:visible="selectedDialogVisible"
            :columns="privateTableConfig?.columns || []"
            :selected-data="allSelectedData"
            :table-row-key="tableRowKey"
            :dictionary-obj="dictionaryObj"
            @remove="removeSelectedItem"
            @clear="clearSelection"
        />
    </div>
</template>

<script lang="ts" setup>
import { _Btn, _TableColumn, _TableConfig, _TableReq } from "@ap/utils/types";
import { handleCheckBtnIf, handleCheckBtnDidsable } from "./util";
import { dateHelper } from "@ap/utils/dateHelper";
import { cloneDeep, merge } from "lodash-es";
import { ArcoForm } from "@ap/components/ArcoForm";
import { IconRefresh } from "@arco-design/web-vue/es/icon";
import { RichText } from "@ap/components/RichText";
import { ref, computed, watch, useSlots, getCurrentInstance, nextTick, onMounted, onBeforeUnmount } from "vue";
import ColumnBtns from "./components/column-btns/index.vue";
import SelectedDialog from "./components/selected-dialog/index.vue";

defineOptions({
    name: "AroTable"
});

const props = withDefaults(
    defineProps<{
        //筛选框配置
        filterConfig?: any[];
        //筛选框值
        filterData?: { tabsData?: string | number } & Record<string, any>;
        //复选框默认选中数据集合
        defaultSelectionData?: any[];
        //构造请求
        req?: _TableReq;
        //表格配置
        tableConfig: _TableConfig;
        //双向绑定,list数据
        list?: any[];
    }>(),
    {
        filterConfig: undefined,
        filterData: () => ({}),
        defaultSelectionData: () => [],
        req: undefined,
        list: () => []
    }
);

const emits = defineEmits<{
    (e: "update:list", value: any[]): void;
    (e: "export", value: any): void;
    (e: "update:filterData", value: any): void;
    (e: "selectionChange", value: any[]): void;
    (e: "rowClick", value: any): void;
}>();

const privateFilterConfig = computed(() => {
    props.filterConfig?.forEach((item) => {
        if (["input", "inputNumber"].includes(item.inputType) && !item.debounce) {
            item.debounce = 500;
        }
    });
    return props.filterConfig || [];
});

//内部tableConfig配置文件
const privateTableConfig = computed<_TableConfig>(() => {
    const defaultTableConfig: _TableConfig = {
        pageKey: "page",
        sizeKey: "size",
        sizeList: [10, 20, 30, 40, 50],
        size: 20,
        active: undefined,
        rowKey: "rows",
        totalKey: "total",
        allowFlatten: false,
        selectLimit: 0,
        showRefresh: true,
        arcoProps: {
            rowKey: "id"
        }
    };
    if (props.tableConfig.maxHeight) {
        defaultTableConfig.arcoProps = {
            ...defaultTableConfig.arcoProps,
            scroll: {
                ...defaultTableConfig.arcoProps.scroll,
                maxHeight: tableHeight.value
            }
        };
    }
    return merge(cloneDeep(defaultTableConfig), cloneDeep(props.tableConfig));
});

const getAppListStyle = computed<any>(() => {
    if (privateTableConfig.value.maxHeight) {
        return {
            maxHeight: tableHeight.value,
            overflowY: "auto"
        };
    }
    return {};
});

const flattenType = ref<"app" | "list">("app");
//是否结束
const finished = ref(false);
//列表加载状态
const loading = ref(true);
//是否加载失败
const error = ref(false);
//内部list
const privateList = ref<any[]>([]);
//总数据
const total = ref(0);
//当前页
const privatePage = ref(1);
//分页条数
const privateSize = ref(20);
//表格高度
const tableHeight = ref("");
//表格实例
const baseTableWrapper = ref();
const baseTable = ref();

//是否开启多选
const enableSelection = computed(() => {
    return privateTableConfig.value?.arcoProps?.rowSelection?.type === "checkbox";
});

//是否显示footer
const enableFooter = computed(() => {
    return privateTableConfig.value?.arcoProps?.pagination !== false || enableSelection.value;
});

/** 是否显示左下角按钮组 */
const batsShow = computed(() => {
    if (!privateTableConfig.value?.blBtns) {
        return false;
    }
    return privateTableConfig.value.blBtns.length > 0;
});

const slots = useSlots();

const topShow = computed(() => {
    return (
        tabsShow.value || btnsShow.value || slots["tlBtns"] || slots["trBtns"] || privateTableConfig.value.allowFlatten
    );
});

/** 是否显示左上角切卡组 */
const tabsShow = computed(() => {
    if (!privateTableConfig.value?.tlBtns) {
        return false;
    }
    return privateTableConfig.value.tlBtns.length > 0;
});

/** 是否显示右上角按钮组 */
const btnsShow = computed(() => {
    if (privateTableConfig.value.showRefresh) {
        return true;
    }
    if (!privateTableConfig.value?.trBtns) {
        return false;
    }
    return privateTableConfig.value.trBtns.length > 0;
});

/** 生成新的字典对象 */
const dictionaryObj = computed(() => {
    const arr = privateTableConfig.value?.columns?.filter((item: any) => item.type === "dictionary");
    if (!arr) {
        return null;
    }
    let dicMap: Record<string | number, Record<string | number, string | number>> = {};
    for (const item of arr) {
        let tmpMap: Record<string | number, string | number> = {};
        item.dictionary?.forEach((ditem: any) => {
            let valueKey = "value";
            let labelKey = "label";
            if (item.labelKey) {
                labelKey = item.labelKey;
            }
            if (item.valueKey) {
                valueKey = item.valueKey;
            }
            tmpMap[ditem[valueKey]] = ditem[labelKey];
        });
        dicMap[item.prop] = tmpMap;
    }
    return dicMap;
});
const tableRowKey = computed(() => {
    return privateTableConfig.value?.arcoProps?.rowKey || "id";
});
//选中的keys
const selectedKeys = ref<(string | number)[]>([]);
//当前页选中的keys
const currentPageSelectedKeys = ref<(string | number)[]>([]);
//所有页面选中的keys (用于跨页选择)
const allSelectedKeys = ref<(string | number)[]>([]);
//所有页面选中的完整数据
const allSelectedData = ref<any[]>([]);

/** 是否已经应用过默认选择 */
const hasAppliedDefaultSelection = ref(false);

/** 请求参数修改 */
watch(
    [() => props.req, () => props.filterData],
    () => {
        if (loading.value) {
            return;
        }
        listMore("init");
    },
    {
        deep: true
    }
);

// 监听当前页选中keys的变化，同步到全局选中集合
watch(currentPageSelectedKeys, (newVal) => {
    // 先从allSelectedKeys中移除当前页所有可选项
    const currentPageKeys = privateList.value.filter((item) => !item.disabled).map((item) => item[tableRowKey.value]);

    allSelectedKeys.value = allSelectedKeys.value.filter((key) => !currentPageKeys.includes(key));

    // 然后添加当前页新选中的项 - 这里需要去重
    allSelectedKeys.value = Array.from(new Set([...allSelectedKeys.value, ...newVal]));

    // 更新selectedKeys以保持向后兼容
    selectedKeys.value = [...allSelectedKeys.value];
});

// 当加载新页面时，同步当前页面的选中状态
watch(
    privateList,
    () => {
        // 设置当前页选中的keys
        currentPageSelectedKeys.value = privateList.value
            .filter((item) => allSelectedKeys.value.includes(item[tableRowKey.value]))
            .map((item) => item[tableRowKey.value]);
    },
    { deep: true }
);

/** 如果做了双向绑定，则更新双向绑定的数据到实际list中 */
watch(
    () => props.list,
    (newVal) => {
        if (newVal) {
            privateList.value = newVal;
        }
    },
    {
        deep: true
    }
);

/** 重新加载之后，检测复选disabled */
watch(loading, (newVal) => {
    if (!newVal) {
        setTableHeight();
        if (props.defaultSelectionData.length && !hasAppliedDefaultSelection.value) {
            // 使用 tableRowKey 作为唯一标识符进行去重
            const existingKeys = new Set(allSelectedData.value.map((item) => item[tableRowKey.value]));
            const newItems = props.defaultSelectionData.filter((item) => !existingKeys.has(item[tableRowKey.value]));
            allSelectedData.value = [...allSelectedData.value, ...newItems];

            //生成新的allSelectedKeys
            allSelectedKeys.value = Array.from(
                new Set([
                    ...allSelectedKeys.value,
                    ...(props.defaultSelectionData as any[]).map((item) => item[tableRowKey.value])
                ])
            );
            selectedKeys.value = [...allSelectedKeys.value];
            emits("selectionChange", allSelectedData.value);
            hasAppliedDefaultSelection.value = true;
        }
        checkSelectedDisabled();
    }
});

/** 判断是否需要禁用选中行 */
const checkSelectedDisabled = (): void => {
    if (props.tableConfig.disableSelectedRow) {
        privateList.value.forEach((item) => {
            item.disabled = allSelectedKeys.value.includes(item[tableRowKey.value]);
        });
    }
};

// 清空所有选中项
const clearSelection = (): void => {
    allSelectedKeys.value = [];
    selectedKeys.value = [];
    currentPageSelectedKeys.value = [];
    allSelectedData.value = [];
    hasAppliedDefaultSelection.value = false;
    emits("selectionChange", []);
};

/** 获取key */
const vnodeKey = computed(() => {
    return getCurrentInstance()?.vnode.key;
});
/** 双向绑定筛选框数据 */
const privateFilterData = computed({
    get: () => {
        return props.filterData;
    },
    set: (e) => {
        emits("update:filterData", e);
    }
});
type ListType = "init" | "refresh" | "";
//加载逻辑判断
const listMore = async (listType: ListType): Promise<void> => {
    if (!props.req && !props.list) {
        loading.value = false;
        finished.value = true;
        privatePage.value = 2;
        console.warn("当前base-table未传入req方法，请注意");
        return;
    }
    if (vnodeKey.value && privateTableConfig.value.active && vnodeKey.value !== privateTableConfig.value.active) {
        //如果传入了key或者active，则进行匹配校验，非活动状态的base-list组件，拒绝请求
        console.warn(
            `base-table组件当前未激活，请注意传入的key：${String(vnodeKey.value)}和active：${
                privateTableConfig.value.active
            }`
        );
        return;
    }
    if (listType) {
        if (listType === "init") {
            privatePage.value = 1;
        }
        finished.value = false;
    }
    if (!props.req) {
        loading.value = false;
        return;
    }
    try {
        loading.value = true;
        error.value = false;
        const params = { ...props.req?.params };
        if (privateTableConfig.value.pageKey) {
            params[privateTableConfig.value.pageKey] = privatePage.value;
        }
        if (privateTableConfig.value.sizeKey) {
            params[privateTableConfig.value.sizeKey] = privateSize.value;
        }
        const res = await props?.req.fn(params);
        // 仅开启分页的情况才去设置总数
        if (privateTableConfig.value?.arcoProps?.pagination !== false) {
            const totalValue = Number(res[privateTableConfig.value.totalKey || "total"]);
            total.value = Number.isNaN(totalValue) ? 0 : totalValue;
        }
        loading.value = false;
        if (listType === "init") {
            privateList.value = [];
            emits("update:list", []);
        }
        // 传递每次请求的数据到外部,用于数据二次封装和外部循环逻辑
        emits("export", res);
        let _data = res;
        if (privateTableConfig.value.rowKey) {
            const responseKeyArr = privateTableConfig.value.rowKey.split(".");
            responseKeyArr.forEach((item) => {
                if (_data[item] === undefined) {
                    throw new Error(`row-key：${privateTableConfig.value.rowKey}不存在，请检查`);
                }
                _data = _data[item];
            });
        }
        if (!Array.isArray(_data)) {
            throw new Error(`base-table获取数据非数组，请检查返回结果或设置row-key`);
        }
        privateList.value = _data;
        emits("update:list", _data);
        if (_data.length < privateSize.value) {
            finished.value = true;
        }
        if (listType === "") {
            baseTable.value?.$el?.querySelector?.(".arco-table-body")?.scrollTo(0, 0);
        }
    } catch (e) {
        const str = String(e);
        if (str.indexOf("当前请求已取消") !== -1 || str.indexOf("请求过快，已拦截") !== -1) {
            console.warn("当前请求已取消或请求过快，已拦截", str);
            return;
        }
        console.error(`获取列表数据失败:`, e);
        finished.value = false;
        loading.value = false;
        error.value = true;
    }
};

/** 加载条数切换 */
const handleSizeChange = (size: number): void => {
    privateSize.value = size;
    listMore("");
};

/** 当前页切换 */
const handleCurrentChange = (page: number): void => {
    privatePage.value = page;
    listMore("");
};

/** 扩展按钮事件，右上角，左下角 */
const handleExtraButtonClick = (btn: _Btn): void => {
    btn.handler?.(btn);
};

// 声明 ResizeObserver 变量
const tableResizeObserver = ref<ResizeObserver | null>(null);

/** 动态设置表格高度 */
const setTableHeight = (): void => {
    nextTick(() => {
        if (!baseTableWrapper.value) {
            return;
        }
        const maxHeight = privateTableConfig.value.maxHeight;
        if (!maxHeight) {
            return;
        }

        if (maxHeight === "auto") {
            // 创建一个新的用于观察高度变化的方法
            const updateHeight = () => {
                const table = baseTableWrapper.value;
                const footerHeight = enableFooter.value ? 65 : 0;
                const parentNode = document.getElementsByClassName("frame-view-content")?.[0];
                let paddingBottom = 0;
                let marginBottom = 0;

                if (parentNode) {
                    const paddingBottomStr = window
                        .getComputedStyle(parentNode, null)
                        .getPropertyValue("padding-bottom");
                    const marginBottomStr = window.getComputedStyle(parentNode, null).getPropertyValue("margin-bottom");

                    if (paddingBottomStr) {
                        paddingBottom = parseFloat(paddingBottomStr.replace("px", ""));
                    }
                    if (marginBottomStr) {
                        marginBottom = parseFloat(marginBottomStr.replace("px", ""));
                    }
                }

                // 计算表格容器到视口顶部的距离
                const rect = table.getBoundingClientRect();
                tableHeight.value =
                    window.innerHeight - rect.top - footerHeight - paddingBottom - marginBottom - 2 + "px";
            };

            // 初次计算高度
            updateHeight();

            // 注册 ResizeObserver 监听元素大小变化
            if (!tableResizeObserver.value) {
                tableResizeObserver.value = new ResizeObserver(updateHeight);
                tableResizeObserver.value.observe(baseTableWrapper.value);

                // 同时监听父元素变化
                const parentNode = document.getElementsByClassName("frame-view-content")?.[0];
                if (parentNode) {
                    tableResizeObserver.value.observe(parentNode);
                }
            }
        } else if (typeof maxHeight === "number") {
            tableHeight.value = maxHeight + "px";
        } else if (typeof maxHeight === "string") {
            tableHeight.value = maxHeight;
        } else {
            console.error("maxHeight类型错误:", maxHeight);
        }
    });
};

/** 设置字典显示 */
const setDictionaryValue = (prop: string, value: string | number): string | number => {
    if (!dictionaryObj.value) {
        return "";
    }
    return dictionaryObj.value[prop][value];
};

function onSelectionChange(selectedRowKeys: (string | number)[]) {
    // 获取当前页选中的数据
    const currentPageSelectionData = privateList.value.filter((item) =>
        selectedRowKeys.includes(item[tableRowKey.value])
    );

    // 处理当前页数据，从全局中移除当前页所有可选项对应的数据
    const currentPageKeys = privateList.value.filter((item) => !item.disabled).map((item) => item[tableRowKey.value]);
    allSelectedData.value = allSelectedData.value.filter((item) => !currentPageKeys.includes(item[tableRowKey.value]));

    // 添加当前页新选中的数据到全局数据集合
    allSelectedData.value = [...allSelectedData.value, ...currentPageSelectionData];

    // 发送所有页面选中的完整数据
    emits("selectionChange", allSelectedData.value);
}

/**暴露主动刷新事件 */
const refresh = (listType?: ListType): void => {
    // 重置当前页选中状态，但保留所有选中项
    currentPageSelectedKeys.value = [];
    listMore(listType ?? "refresh");
};

// 重置所有选择
const resetSelection = (): void => {
    allSelectedKeys.value = [];
    selectedKeys.value = [];
    currentPageSelectedKeys.value = [];
    allSelectedData.value = [];
    hasAppliedDefaultSelection.value = false;
};

//获取列配置
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

//获取分割后的日期
function getSplitDate(value: string | number, item?: any) {
    const v = dateHelper.formatDate(value, item.format);
    const split = item?.split;
    if (!split) {
        return [v];
    }
    return v.split(split);
}

function onRefresh() {
    if (privateTableConfig.value.refreshFn) {
        privateTableConfig.value.refreshFn();
    } else {
        refresh();
    }
}

// 弹窗可见性控制
const selectedDialogVisible = ref(false);

// 显示已选项目弹窗
const showSelectedDialog = () => {
    if (allSelectedKeys.value.length > 0) {
        selectedDialogVisible.value = true;
    }
};

// 删除单个选中项目
const removeSelectedItem = (item: any) => {
    const key = item[tableRowKey.value];

    // 从已选keys和数据中移除
    allSelectedKeys.value = allSelectedKeys.value.filter((k) => k !== key);
    allSelectedData.value = allSelectedData.value.filter((d) => d[tableRowKey.value] !== key);

    // 如果当前页包含此项，从当前页选中集合中也移除
    currentPageSelectedKeys.value = currentPageSelectedKeys.value.filter((k) => k !== key);

    // 同步到selectedKeys以保持向后兼容
    selectedKeys.value = [...allSelectedKeys.value];

    // 通知外部选择变化
    emits("selectionChange", allSelectedData.value);

    // 如果选中项全部清空，关闭弹窗
    if (allSelectedKeys.value.length === 0) {
        selectedDialogVisible.value = false;
    }
};

defineExpose({
    refresh,
    baseTable,
    resetSelection,
    selectedKeys: allSelectedKeys,
    selectedData: allSelectedData
});

onMounted(() => {
    if (privateTableConfig.value.size) {
        privateSize.value = privateTableConfig.value.size;
    }
    setTableHeight();

    if (props.list?.length && props.req) {
        console.warn("存在req请求时候，将过滤双向绑定的初始值，请在请求后进行处理");
    }
    if (props.list?.length && !props.req) {
        console.warn("不存在req请求，将直接进行双向绑定的初始值");
        privateList.value = props.list;
    }
    allSelectedKeys.value = [];
    selectedKeys.value = [];
    currentPageSelectedKeys.value = [];
    allSelectedData.value = [];
    listMore("init");
});
onBeforeUnmount(() => {
    // 清理 ResizeObserver
    if (tableResizeObserver.value) {
        tableResizeObserver.value.disconnect();
        tableResizeObserver.value = null;
    }
});
</script>
<style lang="scss" scoped>
.efe-arco-table {
    display: flex;
    flex-direction: column;
    .filter {
        border-bottom: 1px solid var(--color-neutral-3);
        margin-bottom: 20px;
    }
    .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        .tabs {
            user-select: none;
            flex: 1;
            :deep(.arco-form-item) {
                margin-bottom: 0;
            }
            .tabs-count {
                color: #f56c6c;
            }
        }
    }
    .table {
        flex: 1;
        :deep(.arco-badge-status-text) {
            font-size: 14px;
        }
        :deep(.arco-spin) {
            width: 100%;
        }
    }

    .app-list {
        display: flex;
        flex-wrap: wrap;

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

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 0 7px;
        height: 50px;
        background-color: var(--color-bg-4);
        margin-top: 15px;
        .bat-wrapper {
            display: flex;
            align-items: center;
            .bat-checkbox {
                margin-right: 10px;
            }
            .bats-slot {
                margin-right: 10px;
                color: var(--color-text-2);
                .selected-count {
                    color: rgb(var(--primary-6));
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
}
.view-list {
    :deep(.arco-radio) {
        margin-right: 0;
        padding-left: 0;
    }
    .view-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: 1px solid var(--color-neutral-3);
        svg {
            width: 22px;
            height: 22px;
            vertical-align: -0.15rem;
            color: #888888;
        }
    }
    .view-item-active {
        border: 1px solid rgb(var(--primary-6));
        svg {
            color: rgb(var(--primary-6));
        }
    }
}
.column-btns {
    :deep(.arco-space-item) {
        position: relative;
        &:not(:last-child)::after {
            position: absolute;
            content: "";
            right: -4px;
            width: 1px;
            height: 15px;
            background-color: var(--color-neutral-3);
        }
    }
}
</style>
