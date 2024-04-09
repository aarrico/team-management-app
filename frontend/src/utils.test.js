import { isEmailValid } from './utils';

describe('isEmailValid', () => {
  test('should reject bad email', () => {
    const badEmail = 'abc@y';
    expect(isEmailValid(badEmail)).not.toBeTruthy();
  });

  test('should accept valid email', () => {
    expect(isEmailValid('ash@pkmn.com')).toBeTruthy();
  });
});
