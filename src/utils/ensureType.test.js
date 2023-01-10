import { expect, test } from 'vitest';
import ensureType from './ensureType';

test('UserRepository.index() is working', async () => {
    expect(ensureType('true')).toBe(true);
    expect(ensureType('false')).toBe(false);
    expect(ensureType('10')).toBe(10);
    expect(ensureType('10.20')).toBe(10.2);
    expect(ensureType('Hello World')).toBe('Hello World');
});
