const aaa = 42;
const foo = require('./foo');

export default async function () {
  await this.source('src/*.js').target('dist');
};

export async function first () {
  await this.clear('dist');
  return await this.start('second', {val: aaa});
}

export async function second(o) {
  return `${foo()}: ${o ? o.val : aaa}`;
}
