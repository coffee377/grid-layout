#! /usr/bin/env node
const dts = require('dts-helper');
const { Babel } = require('build-toolkit');

const compilerOptions = { isTS: true, isReact: true };

// 1. esm
const esm = new Babel({ ...compilerOptions, dest: 'esm' });
esm.hook.options.tap('esm', opts => {
  opts
    .preset('env')
    .tap(options => ({ ...options, modules: false }))
    .end();
  opts.comments(false).end();
});

esm.run().catch(err => {
  console.log(err);
  process.exit(1);
});

// 2. cjs
const cjs = new Babel({ ...compilerOptions, dest: 'lib' });
cjs.hook.options.tap('cjs', opts => {
  opts
    .preset('env')
    .tap(options => ({ ...options, modules: 'cjs' }))
    .end();
  opts.comments(false).end();
});
cjs.run().catch(err => {
  console.log(err);
  process.exit(1);
});

// 4. dts
dts.emit({ outDir: 'types', outFile: false, modulePrefix: true }).catch(err => {
  if (err) {
    console.log(err);
  }
  process.exit(1);
});
