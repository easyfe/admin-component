<template>
    <form-item>
        <div class="upload-pic" :class="indepClass">
            <div class="pic-box">
                <div class="pic">
                    <a-image
                        v-if="modelValue"
                        class="pic-image"
                        show-loader
                        fit="contain"
                        :preview="false"
                        :src="modelValue"
                    ></a-image>
                    <div v-if="!modelValue" class="img-seat upload" @click="showUpload">+</div>
                    <div v-if="modelValue" class="label" @click="showUpload">更换图片</div>
                    <img
                        v-if="modelValue && remove"
                        class="close-icon"
                        src="./close-icon@2x.png"
                        alt=""
                        @click="removeIcon"
                    />
                </div>
            </div>
        </div>
    </form-item>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import FormItem from "../form-item/index.vue";

defineOptions({
    name: "Upload"
});

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    limit: {
        type: Number,
        default: 1
    },
    remove: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    independent: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits<{
    (e: "update:modelValue", value: any): void;
    (e: "confirm", value: string): void;
    (e: "remove"): void;
}>();
const fileMangerVisiable = ref(false);
const onFileConfirm = (list: any): void => {
    emits("update:modelValue", list[0].filePath);
    emits("confirm", list[0].filePath);
};

const indepClass = computed(() => {
    if (props.independent) {
        return "base-upload-indep";
    }
    return "";
});

const showUpload = (): void => {
    if (props.disabled) return;
    fileMangerVisiable.value = true;
};

const removeIcon = (): void => {
    if (props.disabled) return;
    emits("update:modelValue", "");
    emits("remove");
};
</script>

<style lang="less" scoped>
.base-upload-indep {
    :deep(.arco-form-item-label-col) {
        padding-right: 0;
    }
}
.upload-pic {
    display: flex;
    flex-shrink: 0;

    .title {
        font-size: 14px;
        color: #999999;
        line-height: 20px;
    }

    .pic-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .pic {
            width: 64px;
            height: 64px;
            position: relative;

            .pic-image {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 40px;
                width: 64px;
                height: 64px;
                background-color: #f5f6fa;
                border-radius: 3px;
                :deep(.arco-image-img) {
                    width: 64px;
                    height: 64px;
                }
                :deep(.arco-image-loader-spin-text) {
                    font-size: 12px;
                }
            }

            .label {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 20px;
                line-height: 20px;
                text-align: center;
                background: rgba(0, 0, 0, 0.5);
                color: #fff;
                font-size: 12px;
                z-index: 2;
                border-bottom-left-radius: 3px;
                border-bottom-right-radius: 3px;
                cursor: pointer;
            }

            .close-icon {
                width: 16px;
                height: 16px;
                position: absolute;
                top: -8px;
                right: -8px;
                cursor: pointer;
            }

            .img-seat {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                bottom: 0;
                border: 1px dashed #c0ccda;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #c0ccda;
                cursor: pointer;

                &:hover {
                    border-color: #1890ff;
                    color: #1890ff;
                }
            }
        }
    }
}
</style>
