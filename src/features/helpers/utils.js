let trimReg = /(^\s*)|(\s*$)/g;

export function isEmpty(key){
    if (key === undefined || key === '' || key === null){
        return true;
    }
    if (typeof(key) === 'string') {
        key = key.replace(trimReg, '');
        if (key == '' || key == null || key == 'null' || key == undefined || key == 'undefined') {
            return true
        } else {
            return false
        }
    } else if (typeof(key) === 'undefined') {
        return true;
    } else if (typeof(key) == 'object') {
        for(let i in key){
            return false;
        }
        return true;
    }else if (typeof(key) == 'boolean'){
        return false;
    }
}