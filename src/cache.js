const { maxAge }  = require('./config/default')

const refreshRes = (stats, res) => {
    res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000)).toUTCString())
    res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    res.setHeader('Last-Modified', stats.mtime.toUTCString())
    res.setHeader('ETag', `${stats.size}-${stats.mtime}`)
}

module.exports = function isNeedFresh(stats, req, res){
    refreshRes(stats, res)
    const lastModifiedSince = req.headers['if-modified-since']
    const ifNoneMatch = req.headers['if-none-match']

    // 第一次请求，服务端还没有设置缓存，请求头不会有缓存信息
    if (!lastModifiedSince && !ifNoneMatch) {
        return false
    }

    if (lastModifiedSince && lastModifiedSince !== res.getHeader('Last-Modified')) {
        return false
    }

    if (ifNoneMatch && ifNoneMatch !== res.getHeader('Etag')) {
        return false
    }
    return true
}