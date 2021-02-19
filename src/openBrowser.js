const { exec } = require('child_process')

module.exports = url => {
    if (process.platform === 'darwin') {
        exec(`open ${url}`)
    } else {
        // window 是win32
        exec(`start ${url}`)
    }
}