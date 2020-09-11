const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api/auth/",
    createProxyMiddleware({
      target: "http://localhost:4000",
      //TODO: 컨테이너 내에서 프록시 동작안함
      // target: "http://hotjeju_backend:4000",
      changeOrigin: true,
    })
  );
};