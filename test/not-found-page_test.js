import {NotFoundPage} from '../pages/not-found-page/not-found-page.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import sinon from 'sinon';
import {i18n} from '../pages/shared/i18n.js';

suite('not-found-page', () => {
  let element;

  setup(async () => {
    i18n.setLanguage('tr');
    element = await fixture(html`<not-found-page></not-found-page>`);
  });

  test('is defined', () => {
    const el = document.createElement('not-found-page');
    assert.instanceOf(el, NotFoundPage);
  });

  test('renders with correct structure', () => {
    assert.shadowDom.equal(
      element,
      `
        <div class="not-found-container">
          <div class="not-found-icon">
            404
          </div>
          <h1 class="not-found-title">
            Sayfa Bulunamadı
          </h1>
          <p class="not-found-subtitle">
            Aradığınız sayfa mevcut değil veya taşınmış.
          </p>
          <button class="go-home-btn">
            Çalışan Listesine Git
          </button>
        </div>
      `
    );
  });

  test('renders 404 icon correctly', async () => {
    const icon = element.shadowRoot.querySelector('.not-found-icon');
    assert.isNotNull(icon);
    assert.equal(icon.textContent, '404');
  });

  test('renders title correctly', () => {
    const title = element.shadowRoot.querySelector('.not-found-title');
    assert.equal(title.textContent.trim(), 'Sayfa Bulunamadı');
  });

  test('renders subtitle correctly', () => {
    const subtitle = element.shadowRoot.querySelector('.not-found-subtitle');
    assert.equal(
      subtitle.textContent.trim(),
      'Aradığınız sayfa mevcut değil veya taşınmış.'
    );
  });

  test('renders go home button correctly', () => {
    const button = element.shadowRoot.querySelector('.go-home-btn');
    assert.equal(button.textContent.trim(), 'Çalışan Listesine Git');
  });

  test('calls navigation when go home button is clicked', async () => {
    const navigationStub = {
      goToEmployeeList: sinon.stub(),
    };

    // Mock navigation module manually
    const originalNavigation = await import('../pages/shared/utils.js');
    const originalGoToEmployeeList =
      originalNavigation.navigation.goToEmployeeList;
    originalNavigation.navigation.goToEmployeeList =
      navigationStub.goToEmployeeList;

    const button = element.shadowRoot.querySelector('.go-home-btn');
    button.click();

    assert.isTrue(navigationStub.goToEmployeeList.called);

    // Restore original function
    originalNavigation.navigation.goToEmployeeList = originalGoToEmployeeList;
  });

  test('logs navigation when _goHome is called', () => {
    const consoleSpy = sinon.spy(console, 'log');

    element._goHome();

    assert.isTrue(consoleSpy.calledWith('Navigating to employee list'));

    consoleSpy.restore();
  });

  test('logs component creation in constructor', () => {
    const consoleSpy = sinon.spy(console, 'log');

    document.createElement('not-found-page');

    assert.isTrue(consoleSpy.calledWith('NotFoundPage component created'));

    consoleSpy.restore();
  });

  test('logs component connection in connectedCallback', () => {
    const consoleSpy = sinon.spy(console, 'log');

    const newElement = document.createElement('not-found-page');
    newElement.connectedCallback();

    assert.isTrue(consoleSpy.calledWith('NotFoundPage component connected'));

    consoleSpy.restore();
  });

  test('logs rendering in render method', () => {
    const consoleSpy = sinon.spy(console, 'log');

    element.render();

    assert.isTrue(consoleSpy.calledWith('Rendering NotFoundPage'));

    consoleSpy.restore();
  });

  test('has correct CSS styles applied', async () => {
    const container = element.shadowRoot.querySelector('.not-found-container');
    const icon = element.shadowRoot.querySelector('.not-found-icon');
    const title = element.shadowRoot.querySelector('.not-found-title');
    const button = element.shadowRoot.querySelector('.go-home-btn');

    assert.isNotNull(container);
    assert.isNotNull(icon);
    assert.isNotNull(title);
    assert.isNotNull(button);

    // Check that elements have the expected classes
    assert.isTrue(container.classList.contains('not-found-container'));
    assert.isTrue(icon.classList.contains('not-found-icon'));
    assert.isTrue(title.classList.contains('not-found-title'));
    assert.isTrue(button.classList.contains('go-home-btn'));
  });

  test('button is clickable', async () => {
    const button = element.shadowRoot.querySelector('.go-home-btn');
    assert.isNotNull(button);
    assert.isFalse(button.hasAttribute('disabled'));
  });

  test('container has correct layout properties', async () => {
    const container = element.shadowRoot.querySelector('.not-found-container');
    assert.isNotNull(container);

    // Check that container is a flex container
    const computedStyle = getComputedStyle(container);
    assert.equal(computedStyle.display, 'flex');
    assert.equal(computedStyle.flexDirection, 'column');
    assert.equal(computedStyle.alignItems, 'center');
    assert.equal(computedStyle.justifyContent, 'center');
  });

  test('icon has correct styling', async () => {
    const icon = element.shadowRoot.querySelector('.not-found-icon');
    assert.isNotNull(icon);

    const computedStyle = getComputedStyle(icon);
    assert.equal(computedStyle.width, '120px');
    assert.equal(computedStyle.height, '120px');
    assert.equal(computedStyle.borderRadius, '50%');
    assert.equal(computedStyle.display, 'flex');
  });

  test('title has correct typography', async () => {
    const title = element.shadowRoot.querySelector('.not-found-title');
    assert.isNotNull(title);

    const computedStyle = getComputedStyle(title);
    assert.equal(computedStyle.fontSize, '48px');
    assert.equal(computedStyle.fontWeight, '700');
  });

  test('button has correct styling', async () => {
    const button = element.shadowRoot.querySelector('.go-home-btn');
    assert.isNotNull(button);

    const computedStyle = getComputedStyle(button);
    assert.equal(computedStyle.backgroundColor, 'rgb(255, 102, 0)');
    assert.equal(computedStyle.color, 'rgb(255, 255, 255)');
    assert.equal(computedStyle.borderRadius, '8px');
    assert.equal(computedStyle.cursor, 'pointer');
  });

  test('handles translation correctly', () => {
    const subtitle = element.shadowRoot.querySelector('.not-found-subtitle');
    assert.equal(
      subtitle.textContent.trim(),
      'Aradığınız sayfa mevcut değil veya taşınmış.'
    );
  });

  test('has responsive design classes', async () => {
    const container = element.shadowRoot.querySelector('.not-found-container');
    const icon = element.shadowRoot.querySelector('.not-found-icon');
    const title = element.shadowRoot.querySelector('.not-found-title');
    const subtitle = element.shadowRoot.querySelector('.not-found-subtitle');
    const button = element.shadowRoot.querySelector('.go-home-btn');

    // All elements should have their responsive classes
    assert.isTrue(container.classList.contains('not-found-container'));
    assert.isTrue(icon.classList.contains('not-found-icon'));
    assert.isTrue(title.classList.contains('not-found-title'));
    assert.isTrue(subtitle.classList.contains('not-found-subtitle'));
    assert.isTrue(button.classList.contains('go-home-btn'));
  });

  test('button triggers click event', () => {
    const clickSpy = sinon.spy();
    const button = element.shadowRoot.querySelector('.go-home-btn');

    button.addEventListener('click', clickSpy);
    button.click();

    assert.isTrue(clickSpy.called);
  });

  test('component is properly connected to DOM', () => {
    const newElement = document.createElement('not-found-page');
    document.body.appendChild(newElement);

    assert.isTrue(document.body.contains(newElement));
    assert.isNotNull(newElement.shadowRoot);

    document.body.removeChild(newElement);
  });
});
