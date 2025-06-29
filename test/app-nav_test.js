import {AppNav} from '../pages/app-nav/app-nav.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import sinon from 'sinon';
import {i18n} from '../pages/shared/i18n.js';

suite('app-nav', () => {
  let element;

  setup(async () => {
    i18n.setLanguage('tr');
    element = await fixture(html`<app-nav></app-nav>`);
  });

  test('is defined', () => {
    const el = document.createElement('app-nav');
    assert.instanceOf(el, AppNav);
  });

  test('renders with default structure', () => {
    assert.shadowDom.equal(
      element,
      `
        <nav>
          <div class="logo-area">
            <div class="logo-img">
              <img src="../../assets/logo-small.jpg" alt="logo" />
            </div>
            ING
          </div>
          <button class="mobile-menu-toggle">
          </button>
          <div class="nav-links">
            <a class="active nav-link" href="#">
              Çalışanlar
            </a>
            <a class="nav-link" href="#">
              Yeni Ekle
            </a>
            <div class="language-switcher">
              <button class="lang-btn" title="English">
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="15" fill="#012169"/>
                  <path d="M0 0L20 15M20 0L0 15" stroke="white" stroke-width="2"/>
                  <path d="M0 0L20 15M20 0L0 15" stroke="#C8102E" stroke-width="1"/>
                  <path d="M10 0V15M0 7.5H20" stroke="white" stroke-width="3"/>
                  <path d="M10 0V15M0 7.5H20" stroke="#C8102E" stroke-width="2"/>
                </svg>
              </button>
              <button class="active lang-btn" title="Türkçe">
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="15" fill="#e30a17"/>
                  <path fill="#fff" d="m8.5 7.5 2.7-0.9-1.7 2.3V5.7l1.7 2.3zm0.2 1.6a3 3 0 1 1 0-3.2 2.4 2.4 0 1 0 0 3.2z"/>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      `
    );
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

  test('switches language when language button is clicked', async () => {
    const englishButton = element.shadowRoot.querySelector('[title="English"]');
    const turkishButton = element.shadowRoot.querySelector('[title="Türkçe"]');

    // Click English button
    englishButton.click();
    await element.updateComplete;

    // Check if language changed
    assert.isTrue(englishButton.classList.contains('active'));
    assert.isFalse(turkishButton.classList.contains('active'));
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

  test('renders with correct active navigation link', async () => {
    element.active = 'add';
    await element.updateComplete;

    const addLink = element.shadowRoot.querySelector(
      '.nav-link:nth-of-type(2)'
    );
    assert.isTrue(addLink.classList.contains('active'));
  });

  test('language switcher shows correct active language', async () => {
    // Mock getCurrentLanguage to return 'tr'
    const originalGetCurrentLanguage = element.getCurrentLanguage;
    element.getCurrentLanguage = () => 'tr';

    await element.updateComplete;

    const enButton = element.shadowRoot.querySelector(
      '.lang-btn:first-of-type'
    );
    const trButton = element.shadowRoot.querySelector('.lang-btn:last-of-type');

    assert.isFalse(enButton.classList.contains('active'));
    assert.isTrue(trButton.classList.contains('active'));

    element.getCurrentLanguage = originalGetCurrentLanguage;
  });
});
