# fly-esnext [![][travis-badge]][travis-link]

> Allows a `flyfile.js` to be written with new-age ES6 or ES7 syntax.

<!-- <div align="center">
	<a href="http://github.com/flyjs/fly">
		<img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
	</a>
</div> -->

## Install

```
npm install --save-dev fly-esnext
```

**That's it!** :tada: You've now enabled `async`/`await` syntax for your `flyfile.js`!

> **Note:** This will NOT compile your ES6 files into ES5. You must download and setup [fly-babel](https://github.com/flyjs/fly-babel) for that.

## Usage

A `flyfile.js` may also include `require()` statements (not shown).

```js
// flyfile.js

export default async function () {
  await this.source('src/*.js') // etc...
}

export async function lint() {
  await this.source('src/*.js') // etc...
}

export async function styles(obj) {
  await this.source(obj.val || 'src/*.sass') // etc...
}
```

## License

MIT © [Luke Edwards](https://lukeed.com)

[travis-link]:  https://travis-ci.org/lukeed/fly-esnext
[travis-badge]: http://img.shields.io/travis/lukeed/fly-esnext.svg?style=flat-square
