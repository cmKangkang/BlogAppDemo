// 密码，6-20位字母与数字的组合
export const pwdReg = '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$';
// 账户
export const accReg = '^[0-9A-Za-z]{2,18}$';

// 预览图片基址
export const imagePreviewBaseUrl = '/api/file/preview/';
export const imageDownloadBaseUrl = '/api/file/download/';