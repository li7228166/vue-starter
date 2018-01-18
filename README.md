### 项目特征：
- 支持Babel编译（体验下一代 JavaScript 写代码的酷爽，解析JSX，ES6，stage-0，以及ES7的提案修饰器@）
- 支持LESS预处理器
- 实现组件级热更新
- 实现代码的热替换，浏览器实时刷新查看效果
- 分离业务功能代码和公共依赖代码
- 单独分离CSS样式文件
- 支持图片、图标字体等资源的编译
- 支持文件MD5戳，解决文件缓存问题
- 支持一键部署项目到服务器
- 支持HappyPack多线程编译

### 项目说明：

没有预置vue全家桶，可根据项目需要自行install，公共依赖代码会按照package.json的dependencies配置，提取到dll目录的vender.[hash:8].js  <br />项目根目录下的config.json文件可配置本地web服务的host、远程部署服务器以及ajax跨域服务器的host、post<br/>(注：yarn install 会自动编译vender依赖到dll目录，或没有自动运行，可使用yarn run dll手动进行编译)

### 项目开始

```
$ git clone https://github.com/li7228166/vue-starter.git
$ cd vue-starter
$ yarn install
```

### 预置命令
#### 开发
```
$ yarn start
```
启动开发模式

#### 开发(多线程)
```
$ yarn start:with_happypack
```
已多线程的模式启动


#### 开发(开启ajax接口反向代理，跨域利器)
```
$ yarn start:proxy
```
**注：需要先配置下你的根目录下的config.json**
```json
{
  "proxy": {
    "host": "xxx.xxx.xxx.xxx",
    "port": "xxxx"
  }
}
```
浏览器会自动打开 [http://localhost:3000](http://localhost:3000) (默认)   <br />本地服务会自动代理/api/开头的请求到proxy设置的服务器   <br />越来越多的前端开发采取前后端分离的单页应用，ajax跨域是个让人头痛的问题（chrome在PC上可以设置跨域，但是，问题来了，你在手机上真没进行测试？？，那么就用该命令吧）

#### 开发(同时重新编译第三方依赖)
```
$ yarn start:dll
```

#### build
```
$ yarn run build
```

生成待部署文件到dist目录

#### 发布
```
$ yarn run release
```

生成待部署文件到dist目录，并打开浏览器 [http://localhost:8080](http://localhost:8080) ，在本地预览待部署的项目


#### 部署
```
$ yarn run deploy
```
**注：需要先配置下你的根目录下的config.json**
```json
{
  "ssh": {
    "host": "xx.xx.xx.xx",  //服务器IP
    "username": "xxx",      //用户名
    "password": "xxx",      //登录密码
    "port": "xxx",          //端口
    "remotePath": "/xx/xx"  //上传到服务器的哪个目录
  }
}
```
在生成待部署文件到dist目录，并直接部署到指定服务器

#### 编译依赖
```
$ yarn run dll
```
默认将按照package.json的dependencies配置进行打包，如有需要可手动修改scripts/webpack.config.dll.js
```
entry: {
    vendor: [
        ...Object.keys(packageConfig.dependencies)
    ]
}
```