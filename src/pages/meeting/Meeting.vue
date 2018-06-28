<template>
    <div id="Meeting">
        <mt-navbar v-model="selected" :fixed="true" class="line-b">
            <mt-tab-item id="1">会议详情</mt-tab-item>
            <mt-tab-item id="2">签到记录</mt-tab-item>
            <mt-tab-item id="3">就餐记录</mt-tab-item>
        </mt-navbar>
        <div class="content">
            <transition name="slide-left" appear> 
                <router-view class="slide-left-el"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    // import { Navbar, TabItem } from 'mint-ui';
    export default {
        data() {
            return {
                conference_no: this.$route.params.conference_no,
                selected: this.$route.meta.tabIndex,
                route:{
                    '1':'/meeting/detail/',
                    '2':'/meeting/signrecord/',
                    '3':'/meeting/mealrecord/',
                }
            }
        },
        components: {
            mtNavbar: Navbar,
            mtTabItem: TabItem,
        },
        watch:{
            selected: function(newIndex,oldIndex){
                this.$router.push({path:this.route[newIndex] + this.conference_no})
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/styles/meeting/meeting.less');
</style>