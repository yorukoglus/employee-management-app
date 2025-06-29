import {fixture, expect, html} from '@open-wc/testing';
import sinon from 'sinon';
import '../pages/components/toast/toast.js';

suite('toast-message', () => {
  let element;

  setup(async () => {
    element = await fixture(html`<toast-message></toast-message>`);
  });

  test('renders with default properties', () => {
    expect(element.message).to.equal('');
    expect(element.type).to.equal('info');
    expect(element.show).to.be.false;
  });

  test('shows toast when showToast is called', () => {
    element.showToast('Test message', 'success');

    expect(element.message).to.equal('Test message');
    expect(element.type).to.equal('success');
    expect(element.show).to.be.true;
  });

  test('hides toast when hide is called', () => {
    element.showToast('Test message');
    element.hide();

    expect(element.show).to.be.false;
  });

  test('auto-hides after 5 seconds', async () => {
    const clock = sinon.useFakeTimers();

    element.showToast('Test message');
    expect(element.show).to.be.true;

    // Wait for component to update and auto-hide to start
    await element.updateComplete;
    clock.tick(100); // Wait for the 100ms delay in showToast

    clock.tick(5000);
    await element.updateComplete;

    expect(element.show).to.be.false;

    clock.restore();
  });

  test('clears timeout when hide is called', () => {
    const clock = sinon.useFakeTimers();

    element.showToast('Test message');
    element.hide();

    clock.tick(5000);

    // Should not auto-hide since we manually hid it
    expect(element.show).to.be.false;

    clock.restore();
  });

  test('returns correct icon for different types', () => {
    element.type = 'success';
    expect(element._getIcon()).to.equal('✓');

    element.type = 'error';
    expect(element._getIcon()).to.equal('✕');

    element.type = 'info';
    expect(element._getIcon()).to.equal('ℹ');
  });

  test('returns correct CSS class for different types', () => {
    element.type = 'success';
    expect(element._getTypeClass()).to.equal('success');

    element.type = 'error';
    expect(element._getTypeClass()).to.equal('error');

    element.type = 'info';
    expect(element._getTypeClass()).to.equal('info');
  });

  test('renders nothing when show is false', async () => {
    element.show = false;
    await element.updateComplete;

    const toastElement = element.shadowRoot.querySelector('.toast');
    expect(toastElement).to.be.null;
  });

  test('renders toast when show is true', async () => {
    element.showToast('Test message', 'success');
    await element.updateComplete;

    const toastElement = element.shadowRoot.querySelector('.toast');
    expect(toastElement).to.not.be.null;
    expect(toastElement.classList.contains('show')).to.be.true;
    expect(toastElement.classList.contains('success')).to.be.true;
  });

  test('handles close button click', async () => {
    element.showToast('Test message');
    await element.updateComplete;

    const closeButton = element.shadowRoot.querySelector('.toast-close');
    closeButton.click();

    expect(element.show).to.be.false;
  });
});
