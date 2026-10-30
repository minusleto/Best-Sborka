#!/usr/bin/env node
// Собирает ID предметов/блоков/жидкостей, которые регистрируют startup_scripts KubeJS.
// Скрипты выполняются в песочнице с заглушками, поэтому ID из циклов
// (metal + '_plate', Object.keys(...).forEach) тоже попадают в список.
// Вывод: строки вида "item kubejs:iron_plate" (в stdout), ошибки анализа (в stderr, код 1).
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'kubejs', 'startup_scripts');
const found = new Set();
const problems = [];

// Заглушка, у которой любое свойство и любой вызов возвращают её же.
function chain() {
  const fn = function () {};
  const p = new Proxy(fn, {
    get(_t, k) {
      if (k === Symbol.toPrimitive) return () => '';
      if (k === Symbol.iterator) return function* () {};
      if (k === 'then') return undefined;
      return p;
    },
    apply() { return p; },
    construct() { return p; },
  });
  return p;
}

function eventFor(type) {
  const stub = chain();
  return new Proxy({}, {
    get(_t, k) {
      if (k === 'create' || k === 'createCustom') {
        return (id) => {
          if (typeof id === 'string') found.add(type + ' ' + (id.includes(':') ? id : 'kubejs:' + id));
          return stub;
        };
      }
      return stub;
    },
  });
}

const real = new Set(Object.getOwnPropertyNames(globalThis));
['global', 'console'].forEach((n) => real.delete(n));

function makeScope(file) {
  const base = chain();
  const extra = {
    StartupEvents: { registry: (type, cb) => cb(eventFor(String(type))) },
    onEvent: (name, cb) => {
      const m = /^(item|block|fluid)\.registry$/.exec(String(name));
      if (m) cb(eventFor(m[1]));
    },
    console: { log() {}, info() {}, warn() {}, error() {}, debug() {} },
    global: {},
  };
  return new Proxy(extra, {
    has(_t, k) { return typeof k === 'string' && !(real.has(k) && !(k in extra)); },
    get(t, k) {
      if (k === Symbol.unscopables) return undefined;
      if (k in t) return t[k];
      return base;
    },
  });
}

if (!fs.existsSync(dir)) process.exit(0);
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js')).sort();
for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  try {
    // eslint-disable-next-line no-new-func
    new Function('__scope', 'with (__scope) {\n' + src + '\n}')(makeScope(f));
  } catch (e) {
    problems.push(f + ': ' + e.message);
  }
}
if (problems.length) {
  process.stderr.write('Не удалось проанализировать startup-скрипты:\n  ' + problems.join('\n  ') + '\n');
  process.exit(1);
}
process.stdout.write([...found].sort().join('\n') + (found.size ? '\n' : ''));
