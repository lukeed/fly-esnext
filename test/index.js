'use strict';

const read = require('fs').readFileSync;
const join = require('path').join;
const test = require('tape').test;
const co = require('bluebird').coroutine;
const fn = require('../');

const file = join(__dirname, 'fixtures', 'flyfile.js');
const data = read(file, 'utf8');

const hasYield = f => /yield/i.test(f.toString());
const isGenerator = f => f.constructor.name === 'GeneratorFunction';

test('fly-esnext', co(function * (t) {
	t.plan(25);

	t.equal(typeof fn, 'function', 'export a function');

	const out = fn(file, data);

	t.equal(typeof out, 'object', 'return an object');
	t.equal(Object.keys(out).length, 5, 'exports all tasks');

	let func;
	['default', 'foo', 'bar', 'baz', 'bat'].forEach(k => {
		func = out[k];
		t.true(func !== undefined, `exports.${k} is defined`);
		t.equal(typeof func, 'function', `exports.${k} is a function`);
		t.true(isGenerator(func), `rewrite exports.${k} as a generator function`);
	});

	// specifics
	t.true(hasYield(out.foo), '`foo` task has `yield`');
	t.true(hasYield(out.default), '`default` task has `yield`');
	t.true(/function\* \(o\)/.test(out.bar.toString()), 'keeps one parameter');
	t.true(/function\* \(one, two\)/.test(out.baz.toString()), 'keeps two parameters (xo)');
	t.true(/function\* \(one, two\)/.test(out.bat.toString()), 'keeps two parameters (standard)');

	const val1 = yield co(out.bar)();
	t.equal(val1, 'hello: 42', 'handle `require()` & embedded values');

	const val2 = yield co(out.baz)('foo', 'bar');
	t.deepEqual(val2, {one: 'foo', two: 'bar'}, 'accepts & handles multiple parameters');
}));
