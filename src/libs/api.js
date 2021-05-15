import util from './util';

const axios = util.ajax;

const http = (methods, url, data) => {
    if (methods === 'get') {
        return axios.get(url, { params: data });
    } else if (methods === 'post') {
        return axios.post(url, data);
    }
};

// // 获取所有文章分类
// export const getAllCategories = () => http('get', '/getAllCategories');

// // 获取文章内容
// export const getArticle = data => http('post', '/getArticle', data);

// // 更新所有文章
// export const updateAllArticle = data => http('post', '/updateAllArticle', data);

// // 添加文章
// export const addArticle = data => http('post', '/addArticle', data);

// // 文章软删除
// export const editArticle = data => http('post', '/editArticle', data);

// // 文章删除
// export const delArticle = data => http('post', '/delArticle', data);

// // 添加分类
// export const addCategory = data => http('post', '/addCategory', data);

// // 修改分类
// export const editCategory = data => http('post', '/editCategory', data);


// 新用户注册
export const register = data => http('post', '/userRegist', data);
// 用户登录
export const login = data => http('post', '/login', data);
// 修改用户信息
export const editUserInfo = data => http('post', '/changeUser', data);



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
// 教师查询自己所教授课程
export const getAllCourse = (teacherId) => http('get', `/exercise/teacher/${teacherId}/retrieveCourses`);
// 助教查询自己所管理课程
export const getAllCourseAssis = (assistantId) => http('get', `/exercise/assistant/${assistantId}/retrieveCourses`);
// 学生查询自己所上课程
export const getAllCourseStu = (studentId) => http('get', `/exercise/student/${studentId}/retrieveCourses`);



// 查询上课的所有学生（教师/助教）
export const allStudentAndAssistant = (courseId) => http('get', `/exercise/common/${courseId}/allStudentAndAssistant`);


// 查询章节下所有题目
export const getQuestionByChapter = (courseId, chapterId) => http('get', `/exercise/common/${courseId}/getQuestionByChapter/${chapterId}`);
// 添加题目
export const addQuestion = (userId, courseId, data) => http('post', `/exercise/teacherAndAssistant/${userId}/${courseId}/addQuestion`, data)
// 修改题目
export const updateQuestion = (userId, courseId, data) => http('post', `/exercise/teacherAndAssistant/${userId}/${courseId}/updateQuestion`, data)
// 删除题目
export const deleteQuestion = (userId, courseId, data) => http('post', `/exercise/teacherAndAssistant/${userId}/${courseId}/deleteQuestion`, data)

// 查询某一题目详情
export const getQuestion = (courseId, questionId) => http('get', `/exercise/common/${courseId}/getQuestion/${questionId}`)

// 学生提交题目
export const submitQuestion = (studentId, courseId, data) => http('post', `/exercise/student/${studentId}/${courseId}/submitQuestion`, data)
// 收藏某一题目
export const addCollection = (studentId, courseId, data) => http('post', `/exercise/student/${studentId}/${courseId}/addCollection`, data)
// 对题目有疑惑
export const doubleTimesIncr = (studentId, courseId, questionId) => http('post', `/exercise/student/${studentId}/${courseId}/doubleTimesIncr/${questionId}
`)

// 查看回收站（教师/助教）
export const retrieveRecycleQuestions = (userId, courseId) => http('get', `/exercise/teacherAndAssistant/${userId}/${courseId}/retrieveRecycleQuestions`)
// 还原题目（教师/助教）
export const reductionRecycleQuestions = (userId, courseId, data) => http('post', `/exercise/teacherAndAssistant/${userId}/${courseId}/reductionRecycleQuestions`, data)
// 查询回收站某一题目详细信息
export const retrieveRecycleQuestionDetail = (userId, courseId, questionId) => http('get', `/exercise/teacherAndAssistant/${userId}/${courseId}/retrieveRecycleQuestionDetail/${questionId}`)

// 查询课程下的所有顶级评论
export const retrieveAllComment = (courseId) => http('get', `/exercise/common/${courseId}/retrieveAllComment`)
// 查看某一顶级评论下的所有回复
export const commentDetail = (courseId, commentId) => http('get', `/exercise/common/${courseId}/commentDetail/${commentId}`)
// 添加顶级评论
export const commitComment = (courseId, data) => http('post', `/exercise/common/${courseId}/commitComment`, data)
// 在顶级评论下回复
export const replyComment = (courseId, data) => http('post', `/exercise/common/${courseId}/replyComment`, data)


// 学生申请上课
export const applyForStudent = (courseId) => http('post', `/exercise/common/${courseId}/applyForStudent`)
// 查询所有课程（所有人）
export const retrieveAllCourses = () => http('get', `/exercise/common/retrieveAllCourses`)


// 教师/助教查询某课程上课申请
export const retrieveStudentApply = (userId, courseId) => http('get', `/exercise/teacherAndAssistant/${userId}/${courseId}/retrieveStudentApply`)
// 教师/助教拒绝学生上课申请
export const rejectStuden = (userId, courseId, studentId) => http('post', `/exercise/teacherAndAssistant/${userId}/${courseId}/rejectStudent/${studentId}`)
// 教师/助教通过学生上课申请
export const permitStudent = (userId, courseId, studentId) => http('get', `/exercise/teacherAndAssistant/${userId}/${courseId}/permitStudent/${studentId}`)

