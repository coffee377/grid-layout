process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const { register, DEFAULT_BABEL_OPTIONS: babelOpts } = require('build-toolkit');

// babel 钩子注册
babelOpts.tap((config) => ({ ...config, isTS: true }));
register(babelOpts);

const configuration = require('../webpack.chain.config');

const compiler = webpack(configuration);
// compiler.hook.options.tap('',()=>{})

compiler.run((err, stats) => {
  if (err) {
    console.log('Failed to compile.', [err]);
    process.exit(1);
  }

  if (stats.compilation.errors.length) {
    console.log('Failed to compile.', stats.compilation.errors);
    process.exit(1);
  }

  console.log('build success');
});
