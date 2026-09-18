const test = require('node:test');
const assert = require('node:assert');
const { render } = require('../src/app');

test('/health devuelve 200 y status ok', () => {
  const r = render('/health');
  assert.strictEqual(r.status, 200);
  assert.match(r.body, /"status":"ok"/);
});

test('/ devuelve 200 y HTML', () => {
  const r = render('/');
  assert.strictEqual(r.status, 200);
  assert.match(r.body, /Módulo 4/);
});

test('ruta desconocida devuelve 404', () => {
  const r = render('/nope');
  assert.strictEqual(r.status, 404);
});
