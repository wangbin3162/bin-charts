## 介绍

仿照vue-echarts组件进行echarts的包裹，主要用于解决默认主题问题及响应options配置，并提供若干封装函数用于转换函数

## 安装

### CDN 安装

通过[unpkg.com/bin-charts](https://unpkg.com/bin-charts/) 可以看到 bin-charts
最新版本的资源，也可以切换版本选择需要的资源，在页面上引入 js 和 css
文件即可开始使用：

```
<!-- import Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/bin-charts@0.1.0/lib/styles/index.css">
<!-- import bin-charts -->
<script src="https://unpkg.com/bin-charts@0.1.0/lib/bin-charts.min.js"></script>
```
    
`@0.1.0` 表示版本号，我们建议锁定版本号来保证代码的稳定性

### npm 安装

推荐使用npm安装，它能更好地和[webpack](https://webpack.js.org/)打包工具配合使用。而且可以更好的和
es6配合使用。并且支持按需引入

```shell
npm i bin-charts -S
# or 
yarn add bin-charts
```

如果您了解node.js、npm安装，并希望配合webpack使用，请阅读下一节：[快速上手](/#/start)。

## 引入

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import CodeEditor from 'chart';
import 'chart/lib/style/index.css';
import App from './App.vue';

Vue.use(CodeEditor);

new Vue({
  el: '#app',
  render: h => h(App)
});
```


