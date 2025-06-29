import {AppMain} from '../pages/app-main/app-main.js';
import {assert} from '@open-wc/testing';
import sinon from 'sinon';

suite('app-main', () => {
  test('is defined', () => {
    const el = document.createElement('app-main');
    assert.instanceOf(el, AppMain);
  });

  test('_getActiveNav returns correct values', () => {
    const element = new AppMain();

    element.currentRoute = '/employees';
    assert.equal(element._getActiveNav(), 'list');

    element.currentRoute = '/employees/add';
    assert.equal(element._getActiveNav(), 'add');

    element.currentRoute = '/employees/edit/123';
    assert.equal(element._getActiveNav(), 'list');

    element.currentRoute = '/unknown';
    assert.equal(element._getActiveNav(), 'list');
  });

  test('constructor sets default properties', () => {
    const el = new AppMain();
    assert.equal(el.currentRoute, '/');
    assert.isNull(el.router);
  });

  test('firstUpdated calls _setupRouter', () => {
    const element = new AppMain();
    const setupRouterSpy = sinon.spy(element, '_setupRouter');

    element.firstUpdated();

    assert.isTrue(setupRouterSpy.called);
  });
});
