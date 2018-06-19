// 签到状态
const signStat = {
    SIGNSTAT_SIGNED: 'Y',
    SIGNSTAT_LATE: 'C',
    SIGNSTAT_UNSIGN: 'W',
}
const signStatName = {
    '已签到': signStat.SIGNSTAT_SIGNED,
    '迟到': signStat.SIGNSTAT_LATE,
    '未签到': signStat.SIGNSTAT_UNSIGN,
}
const getSignStatName = value => {
    for(let i in signStatName){
        if(signStatName[i]==value){
            return i
        }
    }
}
// 会议状态
const meetingStat = {
    MEETINGSTAT_UNSTART: 'UNSTART',
    MEETINGSTAT_STARTED: 'STARTED',
    MEETINGSTAT_ENDED: 'ENDED',
}

const meetingStatName = {
    '未启动': meetingStat.MEETINGSTAT_UNSTART,
    '启动': meetingStat.MEETINGSTAT_STARTED,
    '结束': meetingStat.MEETINGSTAT_ENDED
}
const getMeetingStatName = value => {
    for(let i in meetingStatName){
        if(meetingStatName[i]==value){
            return i
        }
    }
}
export { signStat, meetingStat, getMeetingStatName, getSignStatName }