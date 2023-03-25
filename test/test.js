
// esm
import count from '../src/count.mjs';
import assert from 'assert';

// commonjs
//const count = require('../src/count.cjs');
//const assert = require('assert');

assert.equal(0, count(null));
assert.equal(0, count(undefined));
assert.equal(0, count(NaN));
assert.equal(1, count(Infinity));
assert.equal(1, count(Symbol('symbol')));
assert.equal(0, count(0));
assert.equal(3, count(3));
assert.equal(145, count(145));
assert.equal(145, count(-145));
assert.equal(10, count('I\'m cwola.'));
assert.equal(10, count('私はcwolaです。'));
assert.equal(1, count(true));
assert.equal(1, count(false));
assert.equal(1, count(() => {}));
assert.equal(8, count(new Uint8Array(8)));

let o = [1, 2, 3];
assert.equal(3, count(o));
o[99] = 100;
assert.equal(100, count(o));

o = {a:1, b:2, c:3};
assert.equal(3, count(o));

class Countable {
    count() {
        return 5;
    }
}
assert.equal(5, count(new Countable));

o = [1, 2, 'I\'m cwola.', new Countable, false, null, undefined];
assert.equal(7, count(o));


// recursive
o = [1, 2, 3, [4, 5, [6, 7]], 8, 9];
assert.equal(6, count(o));
assert.equal(11, count(o, true));

o = {a:1, b:2, c:3, d:{e:5, f:[7, 8]}};
assert.equal(4, count(o));
assert.equal(8, count(o, true));




