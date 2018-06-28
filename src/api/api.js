import axios from '../utils/intercept.js'
let baseUrl = process.env.BASE_API || 'http://zain.site/sgmms-admin';
let qs = require('qs')

/**
 * 获取短信验证码
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getVerfiyCode = params => {
    return axios.post(`${baseUrl}/api/verificationCode`, qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
};

/**
 * 根据手机号和验证码登录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const loginRequest = params => {
    return axios.post(`${baseUrl}/api/authentication`, qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
};
/**
 * 获取会议列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getMeetingList = params => {
    return axios.get(`${ baseUrl }/api/conference?page=${params.page}&size=${params.size}`);
    // return axios.get(`${ baseUrl }/api/conference`, {params:params})
};
/**
 * 获取会议详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getMeetingDetail = (conference_no) => {
    return axios.get(`${ baseUrl }/api/conference/${conference_no}`);
};
/**
 * 获取签到记录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getSignRecord = (conference_no) => {
    return axios.get(`${ baseUrl }/api/conference/${conference_no}/attendance`);
};
/**
 * 获取就餐记录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const getMealRecord = (conference_no) => {
    return axios.get(`${ baseUrl }/api/conference/${conference_no}/meal`);
};
/**
 * 提交就餐记录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const postMeal = params => {
    return axios.post(`${ baseUrl }/api/conference/${params.conference_no}/meal?meal_id=${params.meal_id}`)
};
/**
 * 提交签到记录
 * @param params
 * @returns {AxiosPromise<any>}
 */
export const postSign = params => {
    return axios.post(`${ baseUrl }/api/conference/${params.conference_no}/attendance?attendance_id=${params.attendance_id}&lat=${params.lat}&lng=${params.lng}&location=${params.location}`)
};