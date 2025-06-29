import {AppMain} from '../pages/app-main/app-main.js';
import {assert} from '@open-wc/testing';

suite('app-main', () => {
  test('is defined', () => {
    const el = document.createElement('app-main');
    assert.instanceOf(el, AppMain);
  });
});
