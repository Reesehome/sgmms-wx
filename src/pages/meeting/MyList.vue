<template>
    <!-- <div id="MyList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading.stat" infinite-scroll-distance="10"> -->
        <div>
            hello
        <!-- 骨架屏 -->
        <!-- <div class="skeleton" v-show="skeleton">
            <section v-for="item in 3" class="skeleton_card card">
                <div class="skeleton_head card_head"></div>
                <div class="card_content">
                    <p class="skeleton_item"></p>
                    <p class="skeleton_item"></p>
                    <p class="skeleton_item"></p>
                    <p class="skeleton_item"></p>
                </div>
            </section>
        </div> -->
        <!-- <div v-show="!skeleton"> -->
        <!-- <div>
            <card-preview v-for="item in dataList" :key="item.title" @jumpToDetail="jumpToDetail(item)" :statText="getMeetingStatName(item.status)"
            :statColor="item.status" :title="item.title" transition="slide-up" :delayTime="item.delayTime" isContinue>
                <card-item icon="iconfont icon-time" label="开始时间: " :value="item.begin_time"></card-item>
                <card-item icon="iconfont icon-time" label="结束时间: " :value="item.end_time"></card-item>
                <card-item icon="iconfont icon-coordinates" label="会议地点: " :value="item.venue"></card-item>
                <card-item icon="iconfont icon-group" label="会议人数: " :value="item.total_users"></card-item>
            </card-preview>
            <div>
                <mt-spinner type="triple-bounce" v-show="loading.stat"></mt-spinner>
                <span v-show="!loading.stat" class="loading_msg">—————&nbsp;&nbsp;&nbsp;{{loading.msg}}&nbsp;&nbsp;&nbsp;—————</span>
            </div>
        </div>   -->
    </div> 
</template>

<script>
    // import { Spinner } from 'mint-ui'
    // import { CardPreview, CardItem } from '@cmpt/card'
    // import { getMeetingList } from '@api/api'
    // import { getMeetingStatName } from '@util/constants'

    export default {
        data() {
            return {
                dataList: [],
                page: 0,
                size: 5,
                total_page: 1,
                loading: {
                    stat: false,
                    msg: '暂无数据'
                },
                refetch: true,
                skeleton: true,
            }
        },
        // components: {
        //     CardPreview,
        //     CardItem,
        //     mtSpinner: Spinner,
        // },

        methods: {
            getMeetingList() {
                this.loading = { stat: true, msg: '正在加载' };
                getMeetingList({ page: this.page, size: this.size }).then(res => {
                    this.total_page = res.total_pages
                    if (res.content && (res.content.length <= 0 || res.total_pages == this.page + 1)) {
                        this.loading = { stat: false, msg: '我是有底线的' };
                    }
                    if (this.refetch) {
                        this.dataList = this.dataList.concat(res.content);
                        this.setDelayTime()
                        return;
                    }
                    this.dataList = res.content
                    this.setDelayTime()
                    this.skeleton = false
                }).catch(err => {
                    this.$toast(err.message)
                })
            },
            getMeetingStatName(value) {
                return getMeetingStatName(value)
            },
            jumpToDetail(value) {
                this.$router.push({ path: '/meeting/detail/' + value.code })
            },
            loadMore() {
                if (this.refetch) {
                    this.loading.stat = true;
                    if (this.total_page != this.page + 1) {
                        this.page++;
                        this.getMeetingList();
                    } else {
                        this.refetch = false
                    }
                }
            },
            // 设置每个卡片进场动画延迟间隔为0.3s
            setDelayTime(val = this.dataList) {
                if (Array.isArray(val)) {
                    this.dataList.forEach((item,i) => {
                        item.delayTime = i * 0.3
                    });
                }
                
            }
        },
        mounted() {
            // this.getMeetingList()
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/styles/meeting/mylist.less');
</style>