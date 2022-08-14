import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/article/detail/:id', component: '@/pages/Article' },
    { path: '/article/new/:id?', component: '@/pages/NewArticle' },
  ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    }
  }
});
