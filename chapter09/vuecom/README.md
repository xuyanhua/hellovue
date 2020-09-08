# 单文件组件与vue-loader

> [单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)
> [vue-loader](https://vue-loader.vuejs.org/zh/)

需要安装的模块

```base
npm install webpack --save-dev
npm install webpack-cli --save-dev
npm install webpack-dev-server --save-dev
npm install css-loader --save-dev
npm install style-loader --save-dev

npm install --save vue
npm install --save-dev vue-loader
npm install --save-dev vue-style-loader
npm install --save-dev vue-template-compiler
npm install --save-dev vue-hot-reload-api
npm install --save-dev babel
npm install --save-dev babel-loader
npm install --save-dev babel-core
npm install --save-dev babel-core
npm install --save-dev babel-plugin-transform-runtime
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-runtime
```

webpack.config.js配置

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')

module.exports = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin()
    ]
}
```

babel配置文件
新建.babelrc

```json
{
    "presets": ["es2015"],
    "plugins": ["transform-runtime"],
    "comments": false
}
```

新建app.vue

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello world!",
    };
  },
};
</script>

<style scoped>
.example {
  color: #f60;
  font-size: 200px;
}
</style>
```

main.js中引用

```js
import Vue from 'vue'
import App from './app.vue'
new Vue({
    el: '#app',
    render: h => h(App)
})
```

注意：此处css没有应用上（待解决）。

支持图片、字体等文件

```bash
npm i -D url-loader
npm i -D file-loader
```
