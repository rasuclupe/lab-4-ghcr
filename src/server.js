const http = require('http');
const { render } = require('./app');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  const { status, body } = render(pathname);
  const contentType = pathname === '/health' ? 'application/json' : 'text/html';
  res.writeHead(status, { 'Content-Type': contentType });
  res.end(body);
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
