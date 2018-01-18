/**
 * Created by Julie on 2016/10/18.
 */
const fs = require("fs");
const path = require('path');

exports.vendorUrl = function (type = 'js') {
    let temp = '';
    const files = fs.readdirSync(path.join(__dirname, '..', 'dll'));
    files.forEach(function (val) {
        let exc = new RegExp('^vendor.*.' + type + '$', 'ig');
        if (exc.test(val)) {
            temp = val;
        }
    });
    return temp;
};

/*
 * 获得当前本机IP
 * */
exports.localIp = (function getIPAdress() {
    const interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
})();
