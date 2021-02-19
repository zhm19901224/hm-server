
const { betterPromisify, fsStat, fsReadDir, errHandler, getContentType } = require('./utils');
const path = require('path');
const fs = require('fs')
const Handlebars = require("handlebars");
const compress = require('./compress')
const isNeedFresh = require('./cache')
const tplPath = path.join(__dirname, './template.tpl')
const tplHtml = fs.readFileSync(tplPath, 'utf8')

module.exports = async (req, res, config) => {
    // 访问的资源路径等于=脚本执行位置拼接用户访问的路径
    const filePath = path.join(config.root, req.url);
    const [statsErr, stats] = await fsStat(filePath);

    if (statsErr) {
        res.setHeader('Content-Type', 'text/plain')
        res.statusCode = 404;
        res.end(filePath+'is not directory or file, resource not found!')
        return
    }

    if (stats.isFile()) {
        const contentType = getContentType(filePath)
        res.setHeader('Content-Type', contentType)
        if (isNeedFresh(stats, req, res)) {
            res.statusCode = 304;
            res.end()
            return
        }

        res.statusCode = 200;
        let readStream = fs.createReadStream(filePath)
        if (filePath.match(config.comp)){
            // 流入压缩器
            readStream = compress(readStream, req, res)
        }
        
        readStream.pipe(res)
        
    } else if (stats.isDirectory()) {
        let [err, files] = await fsReadDir(filePath)
        if (err) return errHandler(err)
        res.setHeader('Content-Type', 'text/html')
        res.statusCode = 200;
        const html = Handlebars.compile(String(tplHtml))({ 
            dir: path.relative(config.root, filePath), 
            files: files.map(file => ({ file, type: getContentType(file) || 'dir' })),
            title: path.basename(filePath)
        })
        res.end(html)
    }
}