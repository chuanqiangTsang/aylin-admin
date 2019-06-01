import regexps from './regexp';
export default {
    validateUserName(rule, value, callback){
        if(value === '') {
            callback(new Error('请输入用户名'));
        } else {
            const reg = regexps.username;
            if(!reg.test(value)){
            callback(new Error('用户名只能字母数字下划线'));
            }
        }
        callback();
    }
}