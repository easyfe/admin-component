<template>
    <div class="form-extra">
        <p class="tips">{{ props.tips }}</p>
    </div>
</template>
<script lang="ts" setup>
defineOptions({
    name: "FormExtra"
});
const props = withDefaults(
    defineProps<{
        tips: string;
    }>(),
    {
        tips: ""
    }
);
</script>
<style lang="less" scoped>
.form-extra {
    width: 100%;
    text-align: left;
    .tips {
        width: 100%;
        font-size: 12px;
        color: #c0c4cc;
        text-align: left;
        margin-top: 4px;
    }
}
</style>
