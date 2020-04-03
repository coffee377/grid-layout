import { defineConfig, IConfig } from 'umi';

export default defineConfig({
  publicPath: "./",
  // exportStatic: {},
  // base: '/',
  antd: {},
  layout: false,
  plugins: [],
  routes: [{ path: '/', component: '@/pages/index' }],
});
