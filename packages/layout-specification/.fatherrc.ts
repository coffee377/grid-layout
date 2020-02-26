import { IBundleOptions } from 'father-build/src/types';
const config: IBundleOptions = {
  target: 'node',
  cjs: { type: 'babel' },
  disableTypeCheck: true,
};
export default config;
