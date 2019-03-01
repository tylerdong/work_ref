import instance from './hooked-instance'

// 获取资讯
// export const article = param => { return instance.get(`/controller/article/focusInformationDetail?id=${param.articleId}`) }
export const article = param => { return instance.get(`/quotation/app/article/focusInformationDetail?id=${param.articleId}`) }
// 获取快讯
// export const newsFlash = param => { return instance.get(`/controller/newsFlash/${param.articleId}`) }
export const newsFlash = param => { return instance.get(`/quotation/app/newsFlash/${param.articleId}`) }
// 获取单条招聘信息详情
export const getPreRecruitmentById = param => { return instance.get(`/quotation/app/recruitment/getRecruitmentById/?id=${param.id}`) }