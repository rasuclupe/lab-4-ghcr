// Lógica separada del servidor para poder testearla sin abrir puertos.
const VERSION = process.env.APP_VERSION || 'dev';

function render(pathname) {
  if (pathname === '/health') {
    return { status: 200, body: JSON.stringify({ status: 'ok', version: VERSION }) };
  }
  if (pathname === '/') {
    return {
      status: 200,
      body: `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">` +
            `<title>Demo M4</title></head><body>` +
            `<h1>App de contenedores — Módulo 4</h1>` +
            `<p>Versión desplegada: <strong>${VERSION}</strong></p>` +
            `</body></html>`,
    };
  }
  return { status: 404, body: 'Not Found' };
}

module.exports = { render, VERSION };
