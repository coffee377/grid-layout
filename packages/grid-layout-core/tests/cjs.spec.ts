const core = require('grid-layout-core');
const demo = require('./demo').default;

test('dom code', () => {
  const code = core.domCodeText(demo, true, true);
  expect(code).toMatchSnapshot();
});

test('css code', () => {
  const code = core.cssCodeText(demo, true, {});
  expect(code).toMatchSnapshot();
});
