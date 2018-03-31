
/**
 * 判断字符串是否不为空
 * @param {string} str 
 */
function isNotEmptyStr(str) {

    return ! (typeof str === 'string' && (str.trim().length === 0 || str === '' || str == null || str === "undefined"))

}



exports.isNotEmptyStr = isNotEmptyStr