process.env.NODE_ENV = 'development';
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { register, DEFAULT_BABEL_OPTIONS: babelOpts ,BabelOptions} = require('build-toolkit');

babelOpts.tap((config) => ({ ...config, isTS: true }));
register(babelOpts);
const configuration = require('../webpack.chain.config');

const compiler = webpack(configuration);

// compiler.plugin('invalid', function() {
//   console.log('Compiling...');
// });

// compiler.plugin('done', function(stats) {
//   // const messages = formatWebpackMessages(stats.toJson({}, true));
//   // if (!messages.errors.length && !messages.warnings.length) {
//   //   console.log('Compiled successfully!');
//   // }
//   // if (messages.errors.length) {
//   //   console.log('Failed to compile.');
//   //   return;
//   // }
//   // if (messages.warnings.length) {
//   //   console.log('Compiled with warnings.');
//   //   console.log('You may use special comments to disable some warnings.');
//   // }
// });
const c = configuration.devServer;
const devServer = new WebpackDevServer(compiler, {
  ...c,
});

devServer.listen(c.port, c.host, () => {
  // 启动electron
  // childProcess.spawn('npm', ['run', 'electron'], { shell: true, env: process.env, stdio: 'inherit' })
  //   .on('close', code => process.exit(code))
  //   .on('error', spawnError => console.error(spawnError));
});
