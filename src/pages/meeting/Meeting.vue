<template>
    <div id="Meeting">
        <!-- <mt-navbar v-model="selected" :fixed="true" class="line-b">
            <mt-tab-item id="1">会议详情</mt-tab-item>
            <mt-tab-item id="2">签到记录</mt-tab-item>
            <mt-tab-item id="3">就餐记录</mt-tab-item>
        </mt-navbar> -->
        <i-tabs :current="tabIndex" color="#f759ab" @change="changeTab">
            <i-tab key="1" title="会议详情"></i-tab>
            <i-tab key="2" title="签到记录"></i-tab>
            <i-tab key="3" title="就餐记录"></i-tab>
        </i-tabs>
        <div class="content">
            <transition name="slide-left" appear> 
                <!-- <router-view class="slide-left-el"></router-view> -->
                <!-- 会议详情 -->
                <div id="meetingDetail" v-if="tabIndex==='1'">
                    <card-preview title="基本信息" icon="iconfont icon-message" v-if="meetingData" :item="meetingData">
                        <div>
                            <i class="iconfont icon-youji"></i>
                            <span>会议名称: {{meetingData.title}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-time"></i>
                            <span>开始时间: {{meetingData.begin_time}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-time"></i>
                            <span>结束时间: {{meetingData.end_time}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-label"></i>
                            <span>会议状态: {{meetingData.status}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-group"></i>
                            <span>会议人数: {{meetingData.total_users}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-coordinates"></i>
                            <span>会议地址: {{meetingData.venue}}</span>
                        </div>
                    </card-preview>
                    <card-preview title="议程安排" icon="iconfont icon-createtask" v-if="meetingData.agendum">
                        <p class="card_content_item" v-html="meetingData.agendum"></p>
                    </card-preview>
                    <card-preview title="注意事项" icon="iconfont icon-prompt" v-if="meetingData.attention">
                        <p class="card_content_item" v-html="meetingData.attention"></p>
                    </card-preview>
                    <card-preview title="会议附件" icon="iconfont icon-fujian" v-if="meetingData.attachments&&meetingData.attachments.length>0">
                        <a v-for="item in meetingData.attachments" :key="item.title" class="card_content_item attachments" :href="item.uri" :download="item.name">{{item.title}}</a>
                    </card-preview>
                </div>
                <!-- 签到记录 -->
                <div id="signrecord" v-if="tabIndex==='2'">
                    <card-preview v-for="item in recordData" :key="item.arrival_time" :title="item.begin_date" icon="iconfont icon-activity" :statText="getStatName(item.attendance_result)" :statColor="item.attendance_result">
                        <card-item icon="iconfont icon-time" label="考勤时间: " :value="item.begin_time">
                            <span class="card_content_data">～{{item.end_time}}</span>
                        </card-item>
                        <card-item icon="iconfont icon-yuding" label="您的签到时间: " :value="item.arrival_time"></card-item>
                    </card-preview>
                </div>
                <!-- 就餐记录 -->
                <div id="mealrecord" v-if="tabIndex==='3'">
                    <card-preview v-for="item in mealRecordData" :key="item.meal_time" :title="item.begin_date" icon="iconfont icon-activity">
                        <card-item icon="iconfont icon-time" label="就餐时间: " :value="item.begin_time">
                            <span class="card_content_data">～{{item.end_time}}</span>
                        </card-item>
                        <card-item icon="iconfont icon-coordinates" label="就餐地点: " :value="item.location"></card-item>
                        <card-item icon="iconfont icon-yuding" label="您的就餐时间: " :value="item.meal_time" v-show="item.meal_time"></card-item>
                        <card-item icon="iconfont icon-wucan" label="就餐状态: " value="已就餐"  v-show="item.meal_time"><i class="iconfont icon-success_fill col_green"></i></card-item>
                        <card-item icon="iconfont icon-wucan" label="就餐状态: " value="未就餐"  v-show="!item.meal_time"><i class="iconfont icon-offline_fill col_red"></i></card-item>
                    </card-preview>
                </div>
            </transition>
        </div>
        <i-toast/>
    </div>
</template>

<script>
    // import { Navbar, TabItem } from 'mint-ui';
    import { getMeetingDetail, getMealRecord, getSignRecord } from '@api/api'
    import { getMeetingStatName, getSignStatName } from '@utils/constants'
    const { $Toast } = require('../../lib/iview/base/index.js');
    export default {
        data() {
            return {
                conference_no: undefined,
                // selected: this.$route.meta.tabIndex,
                mealsuccess: true,
                mealRecordData: null,
                recordData: null,
                tabList: [
                    '会议详情',
                ],
                tabIndex: '1',
                meetingData: {
                    agendum:null,
                    attention:null,
                    attachment:null
                },
                // route:{
                //     '1':'/meeting/detail/',
                //     '2':'/meeting/signrecord/',
                //     '3':'/meeting/mealrecord/',
                // }
            }
        },
        // components: {
        //     mtNavbar: Navbar,
        //     mtTabItem: TabItem,
        // },
        // watch:{
        //     selected: function(newIndex,oldIndex){
        //         this.$router.push({path:this.route[newIndex] + this.conference_no})
        //     }
        // },
        methods:{
            // 获取会议详情
            getMeetingDetail(){
                getMeetingDetail(this.conference_no).then(res=>{
                    this.meetingData = res;
                    this.meetingData.status = getMeetingStatName(this.meetingData.status)
                }).catch(err=>{
                    $Toast({content: err.message})
                })
            },
            // 获取就餐记录
            getMealRecord(){
               // getMealRecord(this.conference_no).then(res=>{
               //     this.mealRecordData = res.content
               // }).catch(err=>{
               //     this.$toast(err.message)
               //})
            },
            // 获取签到记录
            getSignRecord() {
                //getSignRecord(this.conference_no).then(res => {
                //    this.recordData = res.content;
                //}).catch(err=>{
                //    this.$toast(err.message)
                //})
            },
            getStatName(val){
                return getSignStatName(val)
            },
            changeTab(val){
                this.tabIndex = val.target.key
            }
        },
        mounted(){
            this.$route.query.conference_no = 2222
            this.conference_no = this.$route.query.conference_no
            this.getMeetingDetail()
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/styles/meeting/meeting.less');
    @import url('../../assets/styles/meeting/detail.less');
</style>