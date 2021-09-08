const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  console.log('引入代理');
  app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:10086',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/api': '/api'
    }
  }))
}