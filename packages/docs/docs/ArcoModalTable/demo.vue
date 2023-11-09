<template>
    <div>
        <a-space>
            <a-button @click="onOpen(1)">组件打开表格</a-button>
            <a-button @click="onOpen(2)">默认选中</a-button>
            <a-button @click="onOpen(3)">函数打开表格</a-button>
        </a-space>
        <a-row>
            {{ tableData }}
        </a-row>
        <ArcoModalTable
            v-model:visible="visible"
            :modal-config="modalConfig"
            :default-selected="selectionKeys"
            :table-config="{
                tableConfig: getConfig,
                filterData: filterData,
                filterConfig: filterConfig,
                req: getData
            }"
            @ok="handleOk"
        ></ArcoModalTable>
    </div>
</template>
<script lang="ts" setup>
import { testList } from "@/apis/common";
import { ArcoModalTable, ArcoModalTableShow, formHelper, tableHelper } from "@easyfe/admin-component";

const visible = ref(false);
const tableData = ref();
const selectionKeys = ref<string[] | number[]>([]);

const filterData = ref({
    test: "测试文案",
    tabsData: "1"
});

const getData = computed(() => {
    return {
        fn: testList,
        params: {
            t1: "测试",
            ...filterData.value
        }
    };
});

const filterConfig = computed(() => {
    return [
        formHelper.input("测试", "test", {
            span: 8
        }),
        formHelper.input("测试2", "test2", {
            span: 8
        }),
        formHelper.datePicker("日期", "key10", {
            type: "date",
            span: 8
        })
    ];
});

const getConfig = computed(() => {
    return tableHelper.create({
        disableSelectedRow: true,
        pageKey: "_page",
        sizeKey: "_size",
        rowKey: "",
        allowFlatten: false,
        arcoProps: {
            rowKey: "id",
            bordered: false,
            rowSelection: {
                type: "checkbox",
                showCheckedAll: true
            }
        },
        trBtns: [
            {
                label: "编辑",
                type: "primary"
            },
            {
                label: "删除",
                status: "danger"
            }
        ],
        tlBtns: [
            {
                label: "全部",
                value: "0"
            },
            {
                label: "已发布",
                value: "1"
            },
            {
                label: "草稿箱",
                value: "2"
            }
        ],
        blBtns: [
            {
                label: "新增",
                type: "primary"
            },
            {
                label: "删除",
                status: "danger"
            }
        ],
        columns: [
            tableHelper.default("用户ID", "id", {
                width: 100
            }),
            tableHelper.default("标题", "title"),
            tableHelper.default("内容", "body"),
            tableHelper.btns(
                "操作",
                [
                    {
                        label: "编辑"
                    },
                    {
                        label: "删除",
                        status: "danger"
                    }
                ],
                {
                    width: 150
                }
            )
        ]
    });
});

const modalConfig = computed(() => {
    return {
        title: "测试",
        width: "70%"
    };
});

function sleep(v: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, v);
    });
}

async function handleOk(e: any[]) {
    await sleep(1000);
    tableData.value = e;
}

function onOpen(type: number) {
    if (type === 1) {
        visible.value = true;
        selectionKeys.value = [];
    }
    if (type === 2) {
        visible.value = true;
        selectionKeys.value = tableData.value?.map((item: any) => item.id);
    }
    if (type === 3) {
        ArcoModalTableShow({
            modalConfig: modalConfig.value,
            defaultSelected: tableData.value?.map((item: any) => item.id),
            tableConfig: {
                tableConfig: getConfig.value,
                filterConfig: filterConfig.value,
                filterData: filterData.value,
                req: getData.value
            },
            ok: handleOk
        });
    }
}
</script>
