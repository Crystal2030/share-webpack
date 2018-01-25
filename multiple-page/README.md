## 这是一个标题。
>
> 1. cnpm i webpack --save-dev
> 2. cnpm i sass-loader node-sass --save-dev  [因为sass-loader依赖于node-sass，所以还要安装node-sass]
> 3. cnpm i css-loader style-loader --save-dev
>    + css-loader使你能够使用类似@import 和 url(…)的方法实现 require()的功能；
>    + style-loader将所有的计算后的样式加入页面中；
> 4. cnpm i vue vue-loader vue-router vue-template-compiler --save-dev
> 5. cnpm i babel-loader babel-core babel-preset-env babel-polyfill --save-dev [参考文档](https://segmentfault.com/a/1190000008159877)
     + babel-core: babel-core仅仅提供分析AST语法树的功能，不会进行任何代码的编译。
     + babel-preset-env:babel-preset-es2015，babel-preset-2016，babel-preset-2017，babel-preset-latest各种preset的问题就是: 它们都太”重”了, 即包含了过多在某些情况下不需要的功能. 比如, 现代的浏览器大多支持ES6的generator, 但是如果你使用babel-preset-es2015, 它会将generator函数编译为复杂的ES5代码, 这是没有必要的。但使用babel-preset-env, 我们可以声明环境, 然后该preset就会只编译包含我们所声明环境缺少的特性的代码，因此也是比较推荐的方式。
     + babel-polyfill: 转码新增 api，模拟 es6 环境
> 6.  cnpm i url-loader --save-dev
     + url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。1.文件大小小于limit参数，url-loader将会把文件转为DataURL；2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。因此我们只需要安装url-loader即可。
> 7. cnpm i html-webpack-plugin extract-text-webpack-plugin --save-dev
> 8. cnpm i express opn webpack-dev-middleware webpack-hot-middleware connect-history-api-fallback --save-dev



