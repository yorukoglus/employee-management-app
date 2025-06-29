import {AppNav} from '../pages/app-nav/app-nav.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import sinon from 'sinon';
import {i18n} from '../pages/shared/i18n.js';

suite('app-nav', () => {
  let element;
  let i18nStub;

  setup(async () => {
    i18nStub = {
      t: sinon.stub().callsFake((key) => {
        const translations = {
          'nav.employees': 'Çalışanlar',
          'nav.add': 'Yeni Ekle',
        };
        return translations[key] || key;
      }),
      setLanguage: sinon.stub(),
      getCurrentLanguage: sinon.stub().returns('tr'),
    };

    i18n.t = i18nStub.t;
    i18n.setLanguage = i18nStub.setLanguage;
    i18n.getCurrentLanguage = i18nStub.getCurrentLanguage;

    element = await fixture(html`<app-nav></app-nav>`);
  });

  teardown(() => {
    i18n.t = i18nStub.t;
    i18n.setLanguage = i18nStub.setLanguage;
    i18n.getCurrentLanguage = i18nStub.getCurrentLanguage;
  });

  test('is defined', () => {
    const el = document.createElement('app-nav');
    assert.instanceOf(el, AppNav);
  });

  test('has correct default properties', () => {
    assert.equal(element.active, 'list');
    assert.isFalse(element._mobileMenuOpen);
  });

  test('dispatches navigate event when navigation link is clicked', async () => {
    const navigateSpy = sinon.spy();
    element.addEventListener('navigate', navigateSpy);

    const listLink = element.shadowRoot.querySelector('.nav-link.active');
    listLink.click();

    assert.isTrue(navigateSpy.called);
    assert.deepEqual(navigateSpy.firstCall.args[0].detail, {page: 'list'});
  });

  test('dispatches navigate event for add page', async () => {
    const navigateSpy = sinon.spy();
    element.addEventListener('navigate', navigateSpy);

    const addLink = element.shadowRoot.querySelector('.nav-link:not(.active)');
    addLink.click();

    assert.isTrue(navigateSpy.called);
    assert.deepEqual(navigateSpy.firstCall.args[0].detail, {page: 'add'});
  });

  test('closes mobile menu when navigating', async () => {
    element._mobileMenuOpen = true;
    await element.updateComplete;

    const listLink = element.shadowRoot.querySelector('.nav-link.active');
    listLink.click();

    assert.isFalse(element._mobileMenuOpen);
  });

  test('toggles mobile menu when toggle button is clicked', async () => {
    const toggleButton = element.shadowRoot.querySelector(
      '.mobile-menu-toggle'
    );

    assert.isFalse(element._mobileMenuOpen);

    toggleButton.click();
    await element.updateComplete;
    assert.isTrue(element._mobileMenuOpen);

    toggleButton.click();
    await element.updateComplete;
    assert.isFalse(element._mobileMenuOpen);
  });

  test('applies mobile-open class when mobile menu is open', async () => {
    element._mobileMenuOpen = true;
    await element.updateComplete;

    const navLinks = element.shadowRoot.querySelector('.nav-links');
    assert.isTrue(navLinks.classList.contains('mobile-open'));
  });

  test('updates active state when active property changes', async () => {
    element.active = 'add';
    await element.updateComplete;

    const listLink = element.shadowRoot.querySelector(
      '.nav-link:first-of-type'
    );
    const addLink = element.shadowRoot.querySelector(
      '.nav-link:nth-of-type(2)'
    );

    assert.isFalse(listLink.classList.contains('active'));
    assert.isTrue(addLink.classList.contains('active'));
  });

  test('navigate event bubbles and is composed', async () => {
    const navigateSpy = sinon.spy();
    element.addEventListener('navigate', navigateSpy);

    const listLink = element.shadowRoot.querySelector('.nav-link.active');
    listLink.click();

    const event = navigateSpy.firstCall.args[0];
    assert.isTrue(event.bubbles);
    assert.isTrue(event.composed);
  });
});
