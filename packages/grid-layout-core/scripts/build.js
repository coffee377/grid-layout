#! /usr/bin/env node
const webpack = require('webpack');
const dts = require('dts-helper');
const babelCli = require('../../../node_modules/@babel/cli/lib/babel/dir');
const webpackConfig = require('../webpack.config');

// 1. esm
babelCli
  .default({
    cliOptions: { filenames: ['src'], outDir: 'esm', extensions: '.ts' },
    babelOptions: {
      presets: [
        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: false, targets: { node: true } }],
        ['@babel/preset-typescript', {}],
      ],
      plugins: [['@babel/plugin-proposal-class-properties', {}]],
    },
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

// 2. cjs
babelCli
  .default({
    cliOptions: { filenames: ['src'], outDir: 'lib', extensions: '.ts' },
    babelOptions: {
      presets: [
        ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3, modules: 'commonjs', targets: { node: true } }],
        ['@babel/preset-typescript', {}],
      ],
      plugins: [
        // ['./lib/dts', { a: 'a', b: 2 }],
        ['@babel/plugin-proposal-class-properties', {}],
      ],
    },
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });

// 3. umd
const compiler = webpack(webpackConfig);
compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  }
});

// 4. dts
dts.emit({ outDir: 'types', outFile: true, modulePrefix: true }).catch(err => {
  if (err) {
    console.log(err);
  }
});
