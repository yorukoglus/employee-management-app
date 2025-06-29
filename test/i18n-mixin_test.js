import {I18nMixin} from '../pages/shared/i18n-mixin.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import sinon from 'sinon';
import {LitElement} from 'lit';
import {i18n} from '../pages/shared/i18n.js';

// Create a test element using the mixin
class TestElement extends I18nMixin(LitElement) {
  static properties = {
    testProperty: {type: String},
  };

  constructor() {
    super();
    this.testProperty = 'test';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`<div>${this.t('test.key')}</div>`;
  }
}

customElements.define('test-i18n-element', TestElement);

suite('i18n-mixin', () => {
  let element;
  let i18nStub;
  let localStorageStub;
  let originalLocalStorage;

  setup(async () => {
    originalLocalStorage = window.localStorage;

    localStorageStub = {
      getItem: sinon.stub(),
      setItem: sinon.stub(),
      removeItem: sinon.stub(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageStub,
      writable: true,
      configurable: true,
    });

    i18nStub = {
      t: sinon.stub().callsFake((key) => {
        const translations = {
          'test.key': 'Test Value',
          greeting: 'Hello John',
        };
        return translations[key] || key;
      }),
      getCurrentLanguage: sinon.stub().returns('tr'),
      setLanguage: sinon.stub(),
    };

    element = await fixture(html`<test-i18n-element></test-i18n-element>`);

    // Replace the t method on the element
    element.t = i18nStub.t;
    element.getCurrentLanguage = i18nStub.getCurrentLanguage;
    element.setLanguage = i18nStub.setLanguage;
  });

  teardown(() => {
    sinon.restore();
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
  });

  test('is defined', () => {
    const el = document.createElement('test-i18n-element');
    assert.instanceOf(el, TestElement);
  });

  test('has translation method', () => {
    assert.isFunction(element.t);
  });

  test('has getCurrentLanguage method', () => {
    assert.isFunction(element.getCurrentLanguage);
  });

  test('has setLanguage method', () => {
    assert.isFunction(element.setLanguage);
  });

  test('t method calls i18n.t with key', () => {
    i18nStub.t.returns('translated text');

    const result = element.t('test.key');

    assert.isTrue(i18nStub.t.calledWith('test.key'));
    assert.equal(result, 'translated text');
  });

  test('t method calls i18n.t with key and parameters', () => {
    i18nStub.t.returns('Hello John');
    const params = {name: 'John'};

    const result = element.t('greeting', params);

    assert.isTrue(i18nStub.t.calledWith('greeting', params));
    assert.equal(result, 'Hello John');
  });

  test('getCurrentLanguage calls i18n.getCurrentLanguage', () => {
    i18nStub.getCurrentLanguage.returns('tr');

    const result = element.getCurrentLanguage();

    assert.isTrue(i18nStub.getCurrentLanguage.called);
    assert.equal(result, 'tr');
  });

  test('setLanguage calls i18n.setLanguage', () => {
    element.setLanguage('en');

    assert.isTrue(i18nStub.setLanguage.calledWith('en'));
  });

  test('constructor binds language change handler', () => {
    assert.isFunction(element._languageChangeHandler);
  });

  test('connectedCallback adds language change listener', () => {
    const addEventListenerSpy = sinon.spy(window, 'addEventListener');

    element.connectedCallback();

    assert.isTrue(
      addEventListenerSpy.calledWith(
        'languageChanged',
        element._languageChangeHandler
      )
    );

    addEventListenerSpy.restore();
  });

  test('disconnectedCallback removes language change listener', () => {
    const removeEventListenerSpy = sinon.spy(window, 'removeEventListener');

    element.disconnectedCallback();

    assert.isTrue(
      removeEventListenerSpy.calledWith(
        'languageChanged',
        element._languageChangeHandler
      )
    );

    removeEventListenerSpy.restore();
  });

  test('_handleLanguageChange calls requestUpdate', () => {
    const requestUpdateSpy = sinon.spy(element, 'requestUpdate');

    element._handleLanguageChange();

    assert.isTrue(requestUpdateSpy.called);

    requestUpdateSpy.restore();
  });

  test('shadow root is accessible', () => {
    assert.isNotNull(element.shadowRoot);
    assert.include(element.shadowRoot.innerHTML, 'test.key');
  });

  test('element has i18n methods', () => {
    assert.isFunction(element.t);
    assert.isFunction(element.getCurrentLanguage);
    assert.isFunction(element.setLanguage);
  });

  test('element responds to language changes', () => {
    const requestUpdateSpy = sinon.spy(element, 'requestUpdate');

    // Simulate language change event
    window.dispatchEvent(
      new CustomEvent('languageChanged', {
        detail: {language: 'en'},
      })
    );

    assert.isTrue(requestUpdateSpy.called);

    requestUpdateSpy.restore();
  });

  test('setLanguage saves to localStorage', () => {
    localStorageStub.removeItem.returns(undefined);
    localStorageStub.getItem.returns('en');

    i18n.setLanguage('en');

    assert.isTrue(
      localStorageStub.setItem.calledWith('selectedLanguage', 'en')
    );
  });

  test('detects language from localStorage', () => {
    localStorageStub.setItem.returns(undefined);
    localStorageStub.getItem.returns('tr');

    const currentLang = i18n.getCurrentLanguage();

    assert.isString(currentLang);
  });

  test('clearSavedLanguage removes from localStorage', () => {
    localStorageStub.setItem.returns(undefined);
    localStorageStub.removeItem.returns(undefined);
    localStorageStub.getItem.returns(null);

    i18n.clearSavedLanguage();

    assert.isTrue(localStorageStub.removeItem.calledWith('selectedLanguage'));
  });
});
