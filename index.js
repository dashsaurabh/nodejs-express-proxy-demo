const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 3000;
const HOST = "localhost";

const API_URL = "https://jsonplaceholder.typicode.com";

app.get("/status", (req, res, next) => {
    res.send('This is a proxy service');
});

const proxyOptions = {
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api/posts`]: '/posts',
    },
}

const proxy = createProxyMiddleware(proxyOptions);

// app.get('/', (req, res, next) => {
//     if (req.headers.authorization) {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// });

app.use('/api/posts', proxy)

app.listen(PORT, HOST, () => {
    console.log(`Proxy Started at ${HOST}:${PORT}`)
});