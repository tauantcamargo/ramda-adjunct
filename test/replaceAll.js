import { assert } from 'chai';

import * as RA from '../src';
import { replaceAllPolyfill, replaceAllInvoker } from '../src/replaceAll';

describe('replaceAll', function() {
  it('should replace all matches', function() {
    const value = 'ab cd ab cd ab cd';
    const actual = RA.replaceAll('ab', 'ef', value);
    const expected = 'ef cd ef cd ef cd';

    assert.strictEqual(actual, expected);
  });

  context('given empty string', function() {
    specify('should return original value', function() {
      assert.strictEqual(RA.replaceAll('a', 'c', ''), '');
    });
  });

  it('should support boxing wrappers', function() {
    const value = new String('ab cd ab cd ab cd');
    const searchValue = new String('ab');
    const replaceValue = new String('ef');
    const actual = RA.replaceAll(searchValue, replaceValue, value);
    const expected = 'ef cd ef cd ef cd';

    assert.strictEqual(actual, expected);
  });

  it('should replace in very big strings', function() {
    const bigString = 'ab cd'.repeat(10000);
    const expected = 'ab ef'.repeat(10000);
    const actual = RA.replaceAll('cd', 'ef', bigString);

    assert.strictEqual(actual, expected);
  });

  context('given searchValue is a non-global RegExp', function() {
    specify('should throw Error', function() {
      assert.throws(() => RA.replaceAll(/a/, 'c', 'abc'), TypeError);
    });
  });

  it('should be curried', function() {
    assert.strictEqual(RA.replaceAll('a', 'c', 'aba'), 'cbc');
    assert.strictEqual(RA.replaceAll('a')('c', 'aba'), 'cbc');
    assert.strictEqual(RA.replaceAll('a', 'c')('aba'), 'cbc');
    assert.strictEqual(RA.replaceAll('a')('c')('aba'), 'cbc');
  });

  context('replaceAllInvoker', function() {
    before(function() {
      if (RA.isNotFunction(String.prototype.replaceAll)) {
        this.skip();
      }
    });

    context('given searchValue is a non-global RegExp', function() {
      specify('should throw Error', function() {
        assert.throws(() => replaceAllInvoker(/a/, 'c', 'abc'), TypeError);
      });
    });

    specify('should support global RegExp searchValue', function() {
      const value = 'xxx';
      const actual = replaceAllInvoker(/x/g, 'v', value);
      const expected = 'vvv';

      assert.strictEqual(actual, expected);
    });

    specify('should support empty searchValue', function() {
      const value = 'xxx';
      const actual = replaceAllInvoker('', '_', value);
      const expected = '_x_x_x_';

      assert.strictEqual(actual, expected);
    });

    specify('should replace all matches', function() {
      const value = 'ab cd ab cd ab cd';
      const actual = replaceAllInvoker('ab', 'ef', value);
      const expected = 'ef cd ef cd ef cd';

      assert.strictEqual(actual, expected);
    });

    context('given empty string', function() {
      specify('should return original value', function() {
        assert.strictEqual(replaceAllInvoker('a', 'c', ''), '');
      });
    });

    specify('should support boxing wrappers', function() {
      const value = new String('ab cd ab cd ab cd');
      const searchValue = new String('ab');
      const replaceValue = new String('ef');
      const actual = replaceAllInvoker(searchValue, replaceValue, value);
      const expected = 'ef cd ef cd ef cd';

      assert.strictEqual(actual, expected);
    });

    specify('should replace in very big strings', function() {
      const bigString = 'ab cd'.repeat(10000);
      const expected = 'ab ef'.repeat(10000);
      const actual = replaceAllInvoker('cd', 'ef', bigString);

      assert.strictEqual(actual, expected);
    });

    specify('should be curried', function() {
      assert.strictEqual(replaceAllInvoker('a', 'c', 'aba'), 'cbc');
      assert.strictEqual(replaceAllInvoker('a')('c', 'aba'), 'cbc');
      assert.strictEqual(replaceAllInvoker('a', 'c')('aba'), 'cbc');
      assert.strictEqual(replaceAllInvoker('a')('c')('aba'), 'cbc');
    });
  });

  context('replaceAllPolyfill', function() {
    context('given searchValue is a non-global RegExp', function() {
      specify('should throw Error', function() {
        assert.throws(() => replaceAllPolyfill(/a/, 'c', 'abc'), TypeError);
      });
    });

    specify('should support global RegExp searchValue', function() {
      const value = 'xxx';
      const actual = replaceAllPolyfill(/x/g, 'v', value);
      const expected = 'vvv';

      assert.strictEqual(actual, expected);
    });

    specify('should support empty searchValue', function() {
      const value = 'xxx';
      const actual = replaceAllPolyfill('', '_', value);
      const expected = '_x_x_x_';

      assert.strictEqual(actual, expected);
    });

    specify('should replace all matches', function() {
      const value = 'ab cd ab cd ab cd';
      const actual = replaceAllPolyfill('ab', 'ef', value);
      const expected = 'ef cd ef cd ef cd';

      assert.strictEqual(actual, expected);
    });

    context('given empty string', function() {
      specify('should return original value', function() {
        assert.strictEqual(replaceAllPolyfill('a', 'c', ''), '');
      });
    });

    specify('should support boxing wrappers', function() {
      const value = new String('ab cd ab cd ab cd');
      const searchValue = new String('ab');
      const replaceValue = new String('ef');
      const actual = replaceAllPolyfill(searchValue, replaceValue, value);
      const expected = 'ef cd ef cd ef cd';

      assert.strictEqual(actual, expected);
    });

    specify('should replace in very big strings', function() {
      const bigString = 'ab cd'.repeat(10000);
      const expected = 'ab ef'.repeat(10000);
      const actual = replaceAllPolyfill('cd', 'ef', bigString);

      assert.strictEqual(actual, expected);
    });

    specify('should be curried', function() {
      assert.strictEqual(replaceAllPolyfill('a', 'c', 'aba'), 'cbc');
      assert.strictEqual(replaceAllPolyfill('a')('c', 'aba'), 'cbc');
      assert.strictEqual(replaceAllPolyfill('a', 'c')('aba'), 'cbc');
      assert.strictEqual(replaceAllPolyfill('a')('c')('aba'), 'cbc');
    });
  });
});