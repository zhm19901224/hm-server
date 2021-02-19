const { createGzip, createDeflate }  = require('zlib')

module.exports = (readStream, req, res) => {
    const acceptEncoding = req.headers['accept-encoding']
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return readStream.pipe(res)
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')       
        return readStream.pipe(createGzip())        // 响应数据包，流入到压缩器
    } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        return readStream.pipe(createDeflate())
    }
}