
# webpack

## 1.介绍

> 各种格式的文件，比如typescript、less、jpg，以及.vue格式的文件，通过特定的加载器（Loader）编译后，最终统一生成为.js、.css、.png等静态资源文件。在webpack的世界里，一张图片、一个css甚至一个字体都称为模块（Module），彼此存在依赖关系，webpack就是来处理模块间依赖关系的，并把它们打包。

主要链接

* [webpack中文官网](https://webpack.js.org/)
* [webpack中文文档](https://www.webpackjs.com/concepts/)

### 1.1. es6导出导入语法

```js
//config.js
var Config = {
    version:'1.0.0'
};
export {Config}
```

或

```js
//config.js
export var Config={
    version:'1.0.0'
}
```

其他类型（如函数、数组、常量等）也可以导出，比如导出一个函数：

```js
add.js
export function add(a,b){
    return a + b;
}
```

```js
//main.js
import {Config} from './config.js'
import {add} from './add.js'

console.log(Config)
console.log(add(1,2))
```

模块名称也可以由使用者指定，则导出导入为：

```js
//config.js
export default {
    version:'1.0.0'
}
```

```js
//add.js
export default function(a,b){
    return a+b;
}
```

```js
//main.js
import conf from './config.js'
import Add from './add.js'

console.log(conf)
console.log(Add(1,2))
```

如果使用了npm安装了一些库，在webpack中可以直接导入

```js
    import Vue from 'vue'
    imporot $ from 'jquery'
```

更多语法参考：
[https://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/module](https://es6.ruanyifeng.com/?search=import&x=0&y=0#docs/module)

## 2.webpack基本配置

### 2.1. 用npm init初始化项目

```bash
xuyanhua@MacBook-Pro demo % npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (demo) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/xuyanhua/FeProject/hellovue/chapter09/demo/package.json:

{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) yes
```

### 2.2 局部安装webpack

```bash
npm install webpack --save-dev
```

其中--save-dev会作为开发依赖来安装webpack。安装成功后，会在package.json中多一项配置

```json
"devDependencies": {
    "webpack": "^4.44.1"
}
```

在项目目录下会生成node_modules目录

### 2.3. 安装webpack-dev-server

它可以在开发环境中提供很多服务，如启动一个服务器，热更新、接口代理等

```bash
npm install webpack-dev-server --save-dev
```

安装成功后，会在package.json中多一项依赖

```json
"devDependencies": {
    "webpack": "^4.44.1",
    "webpack-dev-server": "^3.11.0"
}
```

### 2.4. 配置

webpack的核心配置文件，在工程目录下创建一个package.config.js文件，内容为：

```json
// package.config.js
var config = {};
module.exports = config;
```

在package.json的scripts里增加一个快速启动webpack-dev-server服务的脚本：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --host localhost --port 8888 --open --config webpack.config.js  "
},
```

### 2.5. 入口与出口配置

入口（Entry）即webpack构建项目的入口起点；  
出口（Output）即编译后的文件存储位置和文件名。  

```js
// webpack.config.js
var path = require('path')
var config = {
    entry: {
        main: './main'//main.js作为编译的入口文件
    },
    output: {
        path: path.join(__dirname, './dist'),//用来存放打包后文件的输出目录
        publicPath: '/dist/',//指定资源文件引用的目录,如果存储在cdn上可以写cdn的网址
        filename: 'main.js'//指定输出的文件名
    }
    // 如上引用时即可以使用{path}{filename}即/dist/main.js引入
}
module.exports = config;
```

分别创建index.html和main.js  
main.js输入：  

```js
document.getElementById('app').innerHTML = 'Hello world'
```

启动项目：

```bash
npm run dev
```

### 2.6 加载器

在webpack的世界里，每个文件都是一个模块，比如.css、.js、.html、.jpg、.less等。对于不同的模块，需要不同的加载器（Loader）来处理，而加载器就是webpack最重要的功能。通过安装不同的加载器可以对各种后缀名的文件进行处理。比如要写css样式，就要用到style-loader和css-loader，下面是安装方法：

```bash
npm install css-loader --save-dev
npm install style-loader --save-dev
```

安装后，在webpack.config.js文件里配置Loader，增加对.css文件的处理

```js
var config = {
    ...
    module: {
        rules: [
            {
                test: /\.css$/,//当遇到.css结尾的文件时
                use: [
                    'style-loader',//再通过style-loader转换，最后打包
                    'css-loader'//先通过css-loader加载器转换
                ]
            }
        ]
    }
}
```

新建style.css文件

```css
#app{
    font-size:24px;
    color:#f50;
}
```

并在main.js中引入

``` js
import './style.css'
```

重新启动 `npm run dev` 即可看到效果
在网页上点击查看，发现在页面上创建了一个style标签引入了样式。可见已经编译到main.js中了。

### 2.7 插件

如果样式都编译到main.js中可能导致main.js过大，在这里可利用一个插件，把css文件都保存在一个main.css文件中。

安装

```bash
npm install extract-text-webpack-plugin --save-dev
```

文件中介绍的在webpack4中暂不可用
