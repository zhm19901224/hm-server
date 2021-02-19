const fs = require('fs')
const chalk = require('chalk') 
const path = require('path')
const promisify = require('util').promisify;
const mime = require('mime')
// 方便Error Calback First方式处理异步
const betterPromisify = (fn) => {
    return function(...args) {
        return new Promise((resolve, reject) => {
            promisify(fn)(...args)
            .then((res) => {
                resolve([null, res])
            })
            .catch((err) => {
                resolve([err])
            })
        })
        
    }
}
// 异常处理
const errHandler = (err) => {
    console.error(chalk.red(err))
    return false
}
/// 根据文件资源路径，获取response的Content-Type
const getContentType = (filePath) => {
    let exc = path.extname(filePath);
    return mime.getType(exc);
}
const fsStat = betterPromisify(fs.stat);
const fsReadDir = betterPromisify(fs.readdir);
const fsReadFile = betterPromisify(fs.readFile);

module.exports = {
    betterPromisify,
    fsStat,
    fsReadDir,
    fsReadFile,
    errHandler,
    getContentType
}    