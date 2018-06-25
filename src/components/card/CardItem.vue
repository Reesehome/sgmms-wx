<template>
    <div>
        <p>
            <i v-if="icon" :class="icon"></i>
            <span v-if="label">{{label}}</span>
            <span class="card_content_data" v-if="value">{{value}}</span>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'card-item',
        props: {
            icon: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            value: {
                default: ''
            }
        },
        methods: {
        },
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/styles/common/style.less');
</style>