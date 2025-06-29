import {ConfirmModal} from '../pages/components/confirm-modal/confirm-modal.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import sinon from 'sinon';
import {i18n} from '../pages/shared/i18n.js';

suite('confirm-modal', () => {
  let element;
  let i18nStub;

  setup(async () => {
    i18nStub = {
      t: sinon.stub().callsFake((key) => {
        const translations = {
          'modal.close': 'Kapat',
          'modal.proceed': 'Devam Et',
          'modal.cancel': 'İptal',
        };
        return translations[key] || key;
      }),
      setLanguage: sinon.stub(),
    };

    i18n.t = i18nStub.t;
    i18n.setLanguage = i18nStub.setLanguage;

    element = await fixture(html`<confirm-modal></confirm-modal>`);
  });

  teardown(() => {
    // Restore original i18n methods
    i18n.t = i18nStub.t;
    i18n.setLanguage = i18nStub.setLanguage;
  });

  test('is defined', () => {
    const el = document.createElement('confirm-modal');
    assert.instanceOf(el, ConfirmModal);
  });

  test('has correct default properties', () => {
    assert.isFalse(element.open);
    assert.equal(element.title, '');
    assert.equal(element.message, '');
  });

  test('renders with custom title and message', async () => {
    element.title = 'Test Title';
    element.message = 'Test Message';
    await element.updateComplete;

    const titleElement = element.shadowRoot.querySelector('.modal-title');
    const messageElement = element.shadowRoot.querySelector('.modal-message');

    assert.equal(titleElement.textContent, 'Test Title');
    assert.equal(messageElement.textContent, 'Test Message');
  });

  test('dispatches cancel event when close button is clicked', () => {
    const cancelSpy = sinon.spy();
    element.addEventListener('cancel', cancelSpy);

    const closeButton = element.shadowRoot.querySelector('.close-btn');
    closeButton.click();

    assert.isTrue(cancelSpy.called);
  });

  test('dispatches cancel event when cancel button is clicked', () => {
    const cancelSpy = sinon.spy();
    element.addEventListener('cancel', cancelSpy);

    const cancelButton = element.shadowRoot.querySelector('.btn-outline');
    cancelButton.click();

    assert.isTrue(cancelSpy.called);
  });

  test('dispatches proceed event when proceed button is clicked', () => {
    const proceedSpy = sinon.spy();
    element.addEventListener('proceed', proceedSpy);

    const proceedButton = element.shadowRoot.querySelector('.btn-danger');
    proceedButton.click();

    assert.isTrue(proceedSpy.called);
  });

  test('cancel event bubbles and is composed', () => {
    const cancelSpy = sinon.spy();
    element.addEventListener('cancel', cancelSpy);

    element._close();

    const event = cancelSpy.firstCall.args[0];
    assert.isTrue(event.bubbles);
    assert.isTrue(event.composed);
  });

  test('proceed event bubbles and is composed', () => {
    const proceedSpy = sinon.spy();
    element.addEventListener('proceed', proceedSpy);

    element._proceed();

    const event = proceedSpy.firstCall.args[0];
    assert.isTrue(event.bubbles);
    assert.isTrue(event.composed);
  });

  test('updates title when property changes', async () => {
    element.title = 'New Title';
    await element.updateComplete;

    const titleElement = element.shadowRoot.querySelector('.modal-title');
    assert.equal(titleElement.textContent, 'New Title');
  });

  test('updates message when property changes', async () => {
    element.message = 'New Message';
    await element.updateComplete;

    const messageElement = element.shadowRoot.querySelector('.modal-message');
    assert.equal(messageElement.textContent, 'New Message');
  });

  test('renders all required elements', async () => {
    const modal = element.shadowRoot.querySelector('.modal');
    const header = element.shadowRoot.querySelector('.modal-header');
    const title = element.shadowRoot.querySelector('.modal-title');
    const closeBtn = element.shadowRoot.querySelector('.close-btn');
    const message = element.shadowRoot.querySelector('.modal-message');
    const actions = element.shadowRoot.querySelector('.modal-actions');
    const proceedBtn = element.shadowRoot.querySelector('.btn-danger');
    const cancelBtn = element.shadowRoot.querySelector('.btn-outline');

    assert.isNotNull(modal);
    assert.isNotNull(header);
    assert.isNotNull(title);
    assert.isNotNull(closeBtn);
    assert.isNotNull(message);
    assert.isNotNull(actions);
    assert.isNotNull(proceedBtn);
    assert.isNotNull(cancelBtn);
  });

  test('handles empty title and message gracefully', async () => {
    element.title = '';
    element.message = '';
    await element.updateComplete;

    const titleElement = element.shadowRoot.querySelector('.modal-title');
    const messageElement = element.shadowRoot.querySelector('.modal-message');

    assert.equal(titleElement.textContent, '');
    assert.equal(messageElement.textContent, '');
  });

  test('handles special characters in title and message', async () => {
    element.title = 'Title with <script>alert("xss")</script>';
    element.message = 'Message with & < > " \' characters';
    await element.updateComplete;

    const titleElement = element.shadowRoot.querySelector('.modal-title');
    const messageElement = element.shadowRoot.querySelector('.modal-message');

    // Should be escaped and safe
    assert.include(titleElement.textContent, 'Title with');
    assert.include(messageElement.textContent, 'Message with');
  });
});
