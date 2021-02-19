module.exports = {
    root: process.cwd(),                 // 用户在命令行执行脚本的文件夹
    hostname: '127.0.0.1',
    port: 8080,
    comp: /\.(html|js|css|md|text)/,     // 支持压缩的文件扩展名
    cache: {
        maxAge: 600,                     // 10分钟
    }
}