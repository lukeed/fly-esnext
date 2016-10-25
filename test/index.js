'use strict';

const read = require('fs').readFileSync;
const join = require('path').join;
const test = require('tape').test;
const co = require('bluebird').coroutine;
const fn = require('../');

const file = join(__dirname, 'fixtures', 'flyfile.js');
const data = read(file, 'utf8');

function isYieldable(fn) {
	const str = fn.toString();
	return /function*/.test(str) && /yield/.test(str);
}

test('fly-esnext', co(function * (t) {
	t.equal(typeof fn, 'function', 'export a function');

	const out = fn(file, data);
	t.equal(typeof out, 'object', 'return an object');
	t.equal(Object.keys(out).length, 3, 'preserve all task names');
	t.equal(typeof out.default, 'function', 'preserve tasks as functions');

	t.true(isYieldable(out.default), 'rewrite `default` task');
	t.true(isYieldable(out.first), 'rewrite `first` task');
	t.true(/function\* \(o\)/.test(out.second.toString()), 'retain `second` task parameter');

	const val = yield co(out.second)();
	t.equal(val, 'hello: 42', 'handle `require()` & embedded values');

	t.end();
}));
