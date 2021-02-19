const http = require('http')
const chalk = require('chalk') 
const fs = require('fs')
const path = require('path')
const defaultConfig = require('./config/default')
const serverHandler = require('./serverHandler')
const openBrowser = require('./openBrowser')

class Server {
    constructor(argsConfig = {}){
        this.config = Object.assign({}, defaultConfig, argsConfig)
    }

    start(){
        const httpServer = http.createServer((req, res) => {
            serverHandler(req, res, this.config)
        });
        const { hostname, port } = this.config;

        httpServer.listen(port, hostname, () => {
            const url = `http://${hostname}:${port}`
            const stdoutContent = `server is running at ${url}`;
            console.info(chalk.green(stdoutContent));
            openBrowser(url)
        })
    }
}

module.exports = Server;
