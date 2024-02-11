import { Concurrency } from 'github-workflow-ts-schema';
import { describe, expect, test } from 'vitest';
import { ObjectToCamel, ObjectToDash } from '../../src/vendor/ts-case-convert';

describe('ObjectToDash', () => {
  const c: Concurrency = {
    group: 'a',
    'cancel-in-progress': true,
  };

  test('should convert object keys to dash case and vice versa', () => {
    type Test = ObjectToCamel<Concurrency>;

    type Return = ObjectToDash<Test>;

    const result: Return = {
      group: 'a',
      'cancel-in-progress': true,
    };

    expect(result).toEqual(c);
  });
});
