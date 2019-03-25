import instance from './hooked-instance'
import axios from 'axios'

// 获取资讯
// export const article = param => { return instance.get(`/controller/article/focusInformationDetail?id=${param.articleId}`) }
export const article = param => {
    return instance.get(`/quotation/app/article/focusInformationDetail?id=${param.articleId}`)
}
// 获取快讯
// export const newsFlash = param => { return instance.get(`/controller/newsFlash/${param.articleId}`) }
export const newsFlash = param => {
    return instance.get(`/quotation/app/newsFlash/${param.articleId}`)
}
// 获取单条招聘信息详情
export const getPreRecruitmentById = param => {
    return instance.get(`/quotation/app/recruitment/getRecruitmentById/?id=${param.id}`)
}

// 获取招聘信息列表
export const getRecruitmentList = param => {
    return instance.post(`/quotation/app/recruitment/getRecruitmentList`, param)
}
// 获取地区
export const getAllProvinceAndCity = param => {
    return instance.get(`/quotation/app/areadata/getAllProvinceAndCity`)
}
// export const getAllProvinceAndCity =params => wxRequest(params, API_BASEURL + '/areadata/getAllProvinceAndCity');
// export const getRecruitmentList =params => wxRequest(params, API_BASEURL + '/recruitment/getRecruitmentList','POST');
// 获取视频详情
export const getLongVideoDetail = param => {
    return instance.get(`/quotation/controller/videoTheme/getVideoThemeInfoById?id=${param.id}&token=${param.token}`)
}
// export const getWxApi = () => { return instance.get(`http://www.qthmedia.com/wiki/index.php?api-wxsharetoken`) }
// export const getWxApi = () => { return instance.post(`http://www.qthmedia.com/wiki/index.20190312.php?api-wxsharetoken`, {withCredentials: false}) }
export const getWxApi = (data) => {
    return axios.create({
        url: 'http://www.qthmedia.com/wiki/index.20190312.php?api-wxsharetoken',
        method: 'post',
        withCredentials: false,
        data: data
    })
}