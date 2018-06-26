<template>
    <!-- <div id="MyList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading.stat" infinite-scroll-distance="10"> -->
    <div id="app">
        <div id="MyList">

            <!-- 骨架屏 -->
            <div class="skeleton" v-if="skeleton">
                <section v-for="item in 3" :key="item.title" class="skeleton_card card">
                    <div class="skeleton_head card_head"></div>
                    <div class="card_content">
                        <p class="skeleton_item"></p>
                        <p class="skeleton_item"></p>
                        <p class="skeleton_item"></p>
                        <p class="skeleton_item"></p>
                    </div>
                </section>
            </div>
            <div v-if="!skeleton">
                <div>
                    <card-preview v-for="(item,index) in dataList" :key="index" @jumpToDetail="jumpToDetail(item)" :statText="getMeetingStatName(item.status)"
                        :item="item" :statColor="item.status" :title="item.title" transition="slide-up" :delayTime="item.delayTime"
                        isContinue>
                        <div>
                            <i class="iconfont icon-time"></i>
                            <span>开始时间: {{item.begin_time}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-time"></i>
                            <span>结束时间: {{item.end_time}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-coordinates"></i>
                            <span>会议地点: {{item.venue}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-group"></i>
                            <span>会议人数: {{item.total_users}}</span>
                        </div>
                    </card-preview>
                    <div>
                        <i-spin custom v-if="loading.stat"></i-spin>
                        <span v-if="!loading.stat" class="loading_msg">—————&nbsp;&nbsp;&nbsp;{{loading.msg}}&nbsp;&nbsp;&nbsp;—————</span>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <i-page :current="pagination" total="5" @change="loadMore" >
                <view slot="prev"> 前 </view>
                <view slot="next"> 后 </view>
            </i-page>
            <i-toast id="toast" />
        </div>
    </div>
</template>

<script>
    import { CardPreview } from '@cmpt/card'
    import { CardItem } from '@cmpt/card'
    import { getMeetingList } from '@api/api'
    import { getMeetingStatName } from '@utils/constants'
    const { $Toast } = require('../../lib/iview/base/index.js');

    export default {
        data() {
            return {
                dataList: [],
                page: 0,
                pagination: 1,
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
        components: {
            CardPreview,
            CardItem,
        },

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
                    $Toast({content: err.message})
                })
            },
            getMeetingStatName(value) {
                return getMeetingStatName(value)
            },
            jumpToDetail(value) {
                this.$router.push({ path: '/pages/meeting/detail/' + value.code })
            },
            loadMore(detail) {
                if (this.refetch) {
                    const type = detail.target.type;
                    this.loading.stat = true;
                    if (this.total_page != this.page + 1) {
                        if (type === 'next') {
                            this.pagination ++
                            this.page ++
                        } else if (type === 'prev') {
                            this.pagination --
                            this.page --
                        }
                        this.getMeetingList();
                    } else {
                        this.refetch = false
                    }
                }
            },
            // 设置每个卡片进场动画延迟间隔为0.3s
            setDelayTime(val = this.dataList) {
                if (Array.isArray(val)) {
                    this.dataList.forEach((item, i) => {
                        item.delayTime = i * 0.3
                    });
                }

            }
        },
        mounted() {
            this.getMeetingList()
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/styles/meeting/mylist.less');
</style>