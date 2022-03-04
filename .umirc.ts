import { defineConfig } from 'umi';

export default defineConfig({
  title: 'Focus',
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': '#ffe73b',
  },
});
