#! /usr/bin/env node

const yargs = require('yargs')
const Server = require('../src/app')
const argvOb = yargs
.usage('hms [option]')
.option('p', {
    alias: 'port',
    describe: '端口号',
    default: 8080
})
.option('h', {
    alias: 'hostname',
    describe: '主机名',
    default: '127.0.0.1'
})
.option('d', {
    alias: 'root',
    describe: 'server root dir',
    default: process.cwd()
})
.version()
.alias('v', 'version')
.help()
.argv;


const staticServer = new Server(argvOb)
staticServer.start()