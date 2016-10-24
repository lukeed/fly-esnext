<div align="center">
	<a href="http://github.com/flyjs/fly">
		<img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
	</a>
</div>

> Allow for ES6 and ES7 support throughout a Fly environment.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
<!-- [![][travis-badge]][travis-link] -->

## Install

```a
npm install -D fly-esnext
```

## Usage

That's it!

All you have to do is install and save `fly-esnext` to your `package.json` and you can use or write **flyfiles** and **fly-plugins** with ES6 or ES7 syntax!

> **Note:** This will NOT compile your ES6 files into ES5. You must download and setup a [fly-babel](https://github.com/bucaran/fly-babel) task for that.

### Example

Flyfile:

```js
export default async function () {
  await this.source('src/*.js')
  	// ...
    .target('dist');
}

export async function lint() {
  await this.source('src/*.js')
  	// ...
    .target('dist');
}
```

Plugin:

```js
const compiler = require('something');

export default function () {
	this.filter('plugin', (data, opts) => {
		// .. whatever logic
	});
}
```

## License

MIT © [Luke Edwards](https://lukeed.com)

[contributors]: https://github.com/lukeed/fly-esnext/graphs/contributors
[releases]:     https://github.com/lukeed/fly-esnext/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-esnext
[npm-ver-link]: https://img.shields.io/npm/v/fly-esnext.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-esnext.svg?style=flat-square
[travis-link]:  https://travis-ci.org/lukeed/fly-esnext
[travis-badge]: http://img.shields.io/travis/lukeed/fly-esnext.svg?style=flat-square
