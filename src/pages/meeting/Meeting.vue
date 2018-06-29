<template>
    <div id="Meeting">
        <i-tabs :current="tabIndex" color="#0a70da" @change="changeTab">
            <i-tab key="1" title="会议详情"></i-tab>
            <i-tab key="2" title="签到记录"></i-tab>
            <i-tab key="3" title="就餐记录"></i-tab>
        </i-tabs>
        <div class="content">
            <transition name="slide-left" appear> 
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
                        <div>
                            <i class="iconfont icon-time"></i>
                            <span class="card_content_data">考勤时间: {{item.begin_time}}～{{item.end_time}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-yuding"></i>
                            <span class="card_content_data">您的签到时间: {{item.arrival_time}}</span>
                        </div>
                    </card-preview>
                </div>
                <!-- 就餐记录 -->
                <div id="mealrecord" v-if="tabIndex==='3'">
                    <card-preview v-for="(item,index) in mealRecordData" :key="index" :title="item.begin_date" icon="iconfont icon-activity" :item="item">
                        <div>
                            <i class="iconfont icon-time"></i>
                            <span class="card_content_data">就餐时间: {{item.begin_time}}～{{item.end_time}}</span>
                        </div>
                        <div>
                            <i class="iconfont icon-coordinates"></i>
                            <span>就餐地点: {{item.location}}</span>
                        </div>
                        <div v-if="item.meal_time">
                            <i class="iconfont icon-yuding"></i>
                            <span>您的就餐时间: {{item.meal_time}}</span>
                        </div>
                        <div v-if="item.meal_time"> 
                            <i class="iconfont icon-wucan"></i>
                            <span>就餐状态: 已就餐</span>
                            <i class="iconfont icon-success_fill col_green"></i>
                        </div>
                        <div v-if="!item.meal_time"> 
                            <i class="iconfont icon-wucan"></i>
                            <span>就餐状态: 未就餐</span>
                            <i class="iconfont icon-offline_fill col_red"></i>
                        </div>
                    </card-preview>
                </div>
            </transition>
        </div>
        <i-toast/>
    </div>
</template>

<script>
    import { CardPreview } from '@cmpt/card'
    import { CardItem } from '@cmpt/card'
    import { getMeetingDetail, getMealRecord, getSignRecord } from '@api/api'
    import { getMeetingStatName, getSignStatName } from '@utils/constants'
    import { $Toast } from '../../lib/iview/base/index'
    export default {
        data() {
            return {
                conference_no: undefined,
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
                }
            }
        },
        methods:{
            // 获取会议详情
            getMeetingDetail(){
                getMeetingDetail(this.conference_no).then(res=>{
                    this.meetingData = res;
                    this.meetingData.status = getMeetingStatName(this.meetingData.status)
                }).catch(err=>{
                    $Toast({content: '请求失败'})
                })
            },
            // 获取就餐记录
            getMealRecord(){
               getMealRecord(this.conference_no).then(res=>{
                   this.mealRecordData = res.content
               }).catch(err=>{
                   $Toast({content: '请求失败'})
               })
            },
            // 获取签到记录
            getSignRecord() {
                getSignRecord(this.conference_no).then(res => {
                   this.recordData = res.content;
                }).catch(err=>{
                   $Toast({content: '请求失败'})
                })
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
            this.getSignRecord()
            this.getMealRecord()
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/styles/meeting/meeting.less');
    @import url('../../assets/styles/meeting/detail.less');
</style>