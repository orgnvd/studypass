var gulp = require('gulp');
var sass = require('gulp-sass');
var httpProxy = require('http-proxy');
var http = require('http');
var fs = require('fs');
var replace = require('gulp-replace-task');
var exec = require("child_process").exec

gulp.task('sass', function () {
    gulp.src('studypass/components/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('studypass/components/'));
    return gulp.watch('studypass/components/**/*.scss', gulp.series('sass'));
});

gulp.task("proxy-server", function () {
    var proxy = httpProxy.createProxyServer({});
    proxy.on('proxyReq', function (proxyReq, req, res, options) {
        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    });

    exec("http-server -a localhost -p 5050 -c-1",{maxBuffer:1024*1024*50}, function (error, out, stdError) {
        console.log('stdout: ' + out);
        console.log('stderr: ' + stdError);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    })

    var server = http.createServer(function (req, res) {
        proxy.web(req, res, {
            target: 'http://127.0.0.1:5050'
        });
    });
    proxy.on('error', function(err, req, res) {
        res.end();
    })
    console.log("listening on port 8000")
    server.listen(8000);
})

gulp.task("populateAppConfig",function (callback) {
    var appLaunchMode = process.env.NODE_ENV || 'development';
    var configFilePath = './studypass/config/config.json'
    var configFileContent =JSON.parse(fs.readFileSync(configFilePath))

    var commonConfigs= populateCommonConfigs(configFileContent);
    var envConfigs = populateEnvConfigs(configFileContent,appLaunchMode);
    var appConfigs = Object.assign(commonConfigs, envConfigs);

    gulp.src('appConfig.js')
        .pipe(replace({
            patterns: [
                {
                    match: /configurations/g,
                    replacement: JSON.stringify(appConfigs, null, 4)
                }
            ]
        })).pipe(gulp.dest('./studypass/config/',{ overwrite: true }))

    /*helper methods*/
    function populateCommonConfigs(content) {
        return content.commonConfigs;
    }

    function populateEnvConfigs(content,mode) {
        return  content[mode];
    }

    callback();
})