<template>
    <div>
        <arco-table
            v-model:filter-data="filterData"
            :table-config="getConfig"
            :filter-config="filterConfig"
            :req="getData"
            page-key="_page"
            size-key="_size"
            row-key=""
        >
            <template #s1>
                <a-table-column title="这是slot">
                    <template #cell="{ rowIndex, record }"> {{ rowIndex }},{{ record.userId }}</template>
                </a-table-column>
            </template>
        </arco-table>
    </div>
</template>
<script setup lang="ts">
import { ArcoTable, tableHelper, formHelper } from "@easyfe/admin-component";
import { testList } from "@/apis/common";

const filterData = ref({
    test: "测试文案",
    tabsData: "1"
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
        tableProps: {
            rowKey: "id",
            bordered: false,
            rowSelection: {
                type: "checkbox",
                showCheckedAll: true
            }
        },
        bats: [
            {
                label: "编辑",
                type: "primary"
            },
            {
                label: "删除",
                status: "danger"
            }
        ],
        tabs: [
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
        btns: [
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
            tableHelper.slot("s1"),
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
                    width: 200
                }
            )
        ]
    });
});

const getData = computed(() => {
    return {
        fn: testList,
        params: { ...filterData.value }
    };
});
</script>
