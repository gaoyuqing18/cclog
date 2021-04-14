import util from './util';

const axios = util.ajax;

const http = (methods, url, data) => {
    if (methods === 'get') {
        return axios.get(url, { params: data });
    } else if (methods === 'post') {
        return axios.post(url, data);
    }
};

// 获取所有文章分类
export const getAllCategories = () => http('get', '/getAllCategories');

// 获取文章内容
export const getArticle = data => http('post', '/getArticle', data);

// 更新所有文章
export const updateAllArticle = data => http('post', '/updateAllArticle', data);

// 添加文章
export const addArticle = data => http('post', '/addArticle', data);

// 文章软删除
export const editArticle = data => http('post', '/editArticle', data);

// 文章删除
export const delArticle = data => http('post', '/delArticle', data);

// 添加分类
export const addCategory = data => http('post', '/addCategory', data);

// 修改分类
export const editCategory = data => http('post', '/editCategory', data);

// 新用户注册
export const register = data => http('post', '/userRegist', data);

// 用户登录
export const login = data => http('post', '/login', data);

// 修改用户信息
export const editUserInfo = data => http('post', '/changeUser', data);

// 上传文件url
export const uploadUrl = util.ajaxUrl + '/upload';


// 获取课程章节列表
export const getAllChapters = (courseId) => http('get', `/exercise/common/${courseId}/courseManager/retrieveCourse`);
// 修改章节
export const editChaters = (teacherId, courseId, data) => http('post', `/exercise/teacher/${teacherId}/${courseId}/courseManager/updateChapter`, data);
// 删除章节
export const delChaters = (teacherId, courseId, data) => http('post', `/exercise/teacher/${teacherId}/${courseId}/courseManager/deleteChapter`, data);
// 添加章节
export const addChaters = (teacherId, courseId, data) => http('post', `/exercise/teacher/${teacherId}/${courseId}/courseManager/addChapter`, data);

// 人员管理
// 查询上课的所有学生 （教师/助教）
export const getallStudents = ( courseId) => http('get', `/exercise/common/${courseId}/allStudents`);


// 创建课程
export const addCourse = (teacherId, data) => http('post', `/exercise/teacher/${teacherId}/courseManager/addCourse`, data);
// 获取课程列表
export const getAllCourse = (teacherId) => http('get', `/exercise/teacher/${teacherId}/retrieveCourses`);

