'use strict';
var gulp = require('gulp'),
    config = require('./config.json'),
    ssh = require('gulp-ssh'),
    gulpSSH = new ssh({
        ignoreErrors: false,
        sshConfig: config.ssh
    });

gulp.task('default', function () {
    console.log('当前只有一个功能，配合webpack实现deploy')
});
gulp.task('upload', function () {
    return gulp
        .src('./dist/**')
        .pipe(gulpSSH.dest(config.ssh.remotePath))
});
