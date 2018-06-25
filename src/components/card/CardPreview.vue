<template>
    <transition :name="transition" @before-enter="beforeEnter" :isContinue="isContinue">
        <section class="card line-tb" @click="jumpToDetail">
            <div class="card_head">
                <i v-if="icon" :class="icon" class="col_theme"></i>
                {{title}}
            </div>
            <mark class="card_status line-all" v-if="statText" :class="statColor">{{statText}}</mark>
            <div class="card_content">
                <slot></slot>
            </div>
        </section>
    </transition>
</template>

<script>
    export default {
        name: 'card-preview',
        props: {
            title: {
                type: String,
                default: '默认标题'
            },
            icon: {
                type: String,
                default: ''
            },
            statText: {
                type: String,
                default: ''
            },
            statColor: {
                type: String,
                default: ''
            },
            transition: String,
            delayTime: {
                type: Number,
                default: 0
            },
            // isContinue属性为true，并且delayTime不为0时，才可有逐一过渡效果
            isContinue: {
                type: Boolean,
                default: false
            },
            item: {
                type: Object,
                default: {}
            }
        },
        methods: {
            jumpToDetail() {
                this.$emit('jumpToDetail')
            },
            beforeEnter(el) {
                if (this.isContinue) {
                    el.style.transitionDelay = `${this.delayTime}s`
                }
                this.$emit('beforeEnter')
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/styles/common/style.less');
</style>