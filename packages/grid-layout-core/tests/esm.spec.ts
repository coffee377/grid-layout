import { cssCodeText, domCodeText } from 'grid-layout-core';
import demo from './demo';

test('dom code', () => {
  const code = domCodeText(demo, false, true);
  expect(code).toMatchSnapshot();
});

test('css code', () => {
  const code = cssCodeText(demo, true, {});
  expect(code).toMatchSnapshot();
});
