const Config = require('webpack-chain');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = path;
const config = new Config();

let NODE_ENV = process.env.NODE_ENV || 'development';
NODE_ENV = NODE_ENV.trim();

const devMode = NODE_ENV !== 'production';
config.context(path.resolve(process.cwd()));

// 1.开发环境
config.mode(NODE_ENV);

// 2.入口配置
config.entry('main').add('./src/index').end();

// 3.输出配置
config.output.path(resolve(__dirname, 'dist')).filename('[name].js');

if (devMode) {
  config
    .devtool('inline-source-map')
    .devServer // .publicPath('')
    .port(9000)
    .hot(true)
    .open(true)
    .noInfo(true)
    .contentBase([path.resolve('public'), path.join(__dirname, 'dist')])
    .compress(true)
    .proxy([
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      {
        context: ['/predict/result'],
        target: 'http://localhost:80',
        changeOrigin: true,
      },
    ])
    .end();
}

// umd 配置
// config.output.library('CssGridLayout')
// .globalObject('this')
// .libraryTarget('umd')
// .auxiliaryComment({
//   root: 'Root',
//   commonjs: 'CommonJS',
//   commonjs2: 'CommonJS2',
//   amd: 'AMD',
// });

// 4. loader 配置
const { DEFAULT_BABEL_OPTIONS: babelOptions } = require('build-toolkit');

babelOptions.tap((c) => ({ ...c, isTS: true, isReact: true, isAntd: true, modules: false }));

const babelOpts = babelOptions.toConfig();
console.log(babelOptions.toString());

config.module
  .rule('compile')
  .test(/\.[tj]sx?$/)
  .include.add(/src/)
  .end()
  .exclude.add(/node_modules/)
  .end()
  .use('babel')
  .loader('babel-loader')
  .options(babelOpts)
  .end()
  .end();

// css
config.module
  .rule('css')
  .test(/\.css$/i)
  .use('style-loader')
  .when(
    devMode,
    (use) => {
      use
        .loader('style-loader')
        .options({})
        .tap((options) => options);
    },
    (use) => {
      use
        .loader('mini-css-extract-plugin/dist/loader')
        .options({})
        .tap((options) => options);
    },
  )
  .end()
  .before('style-loader')
  .use('css-loader')
  .loader('css-loader')
  .options({ modules: false, importLoaders: 1 })
  .tap((options) => options)
  .end()
  .before('css-loader')
  .use('postcss-loader')
  .loader('postcss-loader')
  .options({});

// less
const cssRule = config.module.rules.get('css').values();

// config.module.

config.module
  .rule('less')
  .test(/\.less$/i)
  .use('style-loader')
  .when(
    devMode,
    (use) => {
      use
        .loader('style-loader')
        .options({})
        .tap((options) => options);
    },
    (use) => {
      use
        .loader('mini-css-extract-plugin/dist/loader')
        .options({})
        .tap((options) => options);
    },
  )
  .end()
  .before('style-loader')
  .use('css-loader')
  .loader('css-loader')
  .options({ modules: false, importLoaders: 2 })
  .tap((options) => options)
  .end()
  .before('css-loader')
  .use('postcss-loader')
  .loader('postcss-loader')
  .options({
    plugins: (loader) => [
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-preset-env')({}),
      require('cssnano')({
        preset: ['default', {}],
      }),
    ],
  })
  .end()
  .before('postcss-loader')
  .use('less-loader')
  .loader('less-loader')
  .options({ javascriptEnabled: true })
  .tap((options) => options)
  .end();

const lessRule = config.module.rules.get('less');
// 修改配置
// config.module.rules
//   .get('css')
//   .uses.get('css-loader')
//   .tap(options => ({ ...options, modules: false }));
// console.log(config.module.rules);
// 5.插件配置
config.plugin('CleanWebpackPlugin').use(CleanWebpackPlugin, [{}]).end();
config
  .plugin('HtmlWebpackPlugin ')
  .when(
    devMode,
    (plugin) => {
      plugin.use(HtmlWebpackPlugin, [
        {
          title: '开发环境',
          template: 'public/index.html',
          favicon: 'public/favicon.ico',
        },
      ]);
    },
    (plugin) => {
      plugin.use(HtmlWebpackPlugin, [
        {
          title: '主页',
          template: 'public/index.html',
          favicon: 'public/favicon.ico',
        },
      ]);
    },
  )
  .end();
config
  .plugin('CssExtractPlugin')
  .use(CssExtractPlugin, [{ filename: 'css/[name].css', chunkFilename: '[id].css' }])
  .end();
// 开发环境
if (devMode) {
  config.plugin('NamedModulesPlugin').use(webpack.NamedModulesPlugin).end();
  config.plugin('HotModuleReplacementPlugin').use(webpack.HotModuleReplacementPlugin).end();
}
// 生成环境
else {
  config
    .plugin('CopyPlugin')
    .use(CopyPlugin, [[{ from: 'public' }], { ignore: [], copyUnmodified: true }])
    .end();
}
// config.resolve.mainFields.add('module').add('main').end();

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.less', '.sass', '.json'];
extensions.forEach((ext) => {
  config.resolve.extensions.add(ext).end();
});

config.externals({
  // react: 'react',
  // antd: 'antd',
  // 'react-dom': 'react-dom',
});

module.exports = config.toConfig();
